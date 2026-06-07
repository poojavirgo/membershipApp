package main

import (
	"context"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/britsport/membership-api/internal/config"
	"github.com/britsport/membership-api/internal/handler"
	"github.com/britsport/membership-api/internal/store"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
)

func main() {
	cfg := config.Load()
	ctx := context.Background()

	st, err := connectWithRetry(ctx, cfg.DatabaseURL, 10)
	if err != nil {
		log.Fatalf("database: %v", err)
	}
	defer st.Close()

	if err := st.Migrate(ctx); err != nil {
		log.Fatalf("migrate: %v", err)
	}
	log.Println("database ready")

	h := handler.New(st)

	r := chi.NewRouter()
	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)
	r.Use(corsMiddleware)

	r.Get("/healthz", h.Health)
	r.Route("/api", func(api chi.Router) {
		api.Get("/form", h.GetForm)
		api.Post("/registrations", h.SubmitRegistration)
	})

	srv := &http.Server{
		Addr:              ":" + cfg.Port,
		Handler:           r,
		ReadHeaderTimeout: 10 * time.Second,
	}

	go func() {
		log.Printf("listening on :%s", cfg.Port)
		if err := srv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			log.Fatalf("server: %v", err)
		}
	}()

	stop := make(chan os.Signal, 1)
	signal.Notify(stop, syscall.SIGINT, syscall.SIGTERM)
	<-stop

	log.Println("shutting down")
	shutdownCtx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	_ = srv.Shutdown(shutdownCtx)
}

// connectWithRetry waits for the DB to accept connections (it may start
// slightly after the app under docker-compose).
func connectWithRetry(ctx context.Context, url string, attempts int) (*store.Store, error) {
	var lastErr error
	for i := 0; i < attempts; i++ {
		st, err := store.New(ctx, url)
		if err == nil {
			return st, nil
		}
		lastErr = err
		log.Printf("db not ready (attempt %d/%d): %v", i+1, attempts, err)
		time.Sleep(2 * time.Second)
	}
	return nil, lastErr
}

func corsMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusNoContent)
			return
		}
		next.ServeHTTP(w, r)
	})
}