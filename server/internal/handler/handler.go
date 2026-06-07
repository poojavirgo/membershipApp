package handler

import (
	"context"
	"encoding/json"
	"log"
	"net/http"

	"github.com/britsport/membership-api/internal/model"
)

type Persister interface {
	SaveRegistration(ctx context.Context, r model.Registration) (int64, error)
}

type Handler struct {
	store Persister
}

func New(store Persister) *Handler {
	return &Handler{store: store}
}

func (h *Handler) GetForm(w http.ResponseWriter, r *http.Request) {
	writeJSON(w, http.StatusOK, formDetails)
}

func (h *Handler) SubmitRegistration(w http.ResponseWriter, r *http.Request) {
	var reg model.Registration
	if err := json.NewDecoder(r.Body).Decode(&reg); err != nil {
		writeError(w, http.StatusBadRequest, "Invalid JSON body.")
		return
	}

	if errs := reg.Validate(validMemberTypeIDs()); len(errs) > 0 {
		writeJSON(w, http.StatusUnprocessableEntity, map[string]any{
			"errors": errs,
		})
		return
	}

	id, err := h.store.SaveRegistration(r.Context(), reg)
	if err != nil {
		log.Printf("save registration: %v", err)
		writeError(w, http.StatusInternalServerError, "Could not save registration.")
		return
	}

	writeJSON(w, http.StatusCreated, map[string]any{
		"id":      id,
		"message": "Registration received.",
	})
}

func (h *Handler) Health(w http.ResponseWriter, r *http.Request) {
	writeJSON(w, http.StatusOK, map[string]string{"status": "ok"})
}

func writeJSON(w http.ResponseWriter, status int, body any) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	if err := json.NewEncoder(w).Encode(body); err != nil {
		log.Printf("encode response: %v", err)
	}
}

func writeError(w http.ResponseWriter, status int, msg string) {
	writeJSON(w, status, map[string]string{"error": msg})
}