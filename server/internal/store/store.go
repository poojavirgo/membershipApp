package store

import (
	"context"
	"errors"
	"time"

	"github.com/britsport/membership-api/internal/model"
	"github.com/jackc/pgx/v5/pgxpool"
)

type Store struct {
	pool *pgxpool.Pool
}

func New(ctx context.Context, databaseURL string) (*Store, error) {
	pool, err := pgxpool.New(ctx, databaseURL)
	if err != nil {
		return nil, err
	}
	ctxPing, cancel := context.WithTimeout(ctx, 5*time.Second)
	defer cancel()
	if err := pool.Ping(ctxPing); err != nil {
		pool.Close()
		return nil, err
	}
	return &Store{pool: pool}, nil
}

func (s *Store) Close() { s.pool.Close() }

func (s *Store) Migrate(ctx context.Context) error {
	_, err := s.pool.Exec(ctx, `
		CREATE TABLE IF NOT EXISTS registrations (
			id             BIGSERIAL PRIMARY KEY,
			form_id        TEXT NOT NULL,
			member_type_id TEXT NOT NULL,
			first_name     TEXT NOT NULL,
			last_name      TEXT NOT NULL,
			email          TEXT NOT NULL,
			phone          TEXT NOT NULL,
			birth_date     DATE NOT NULL,
			created_at     TIMESTAMPTZ NOT NULL DEFAULT now()
		);
	`)
	return err
}

func (s *Store) SaveRegistration(ctx context.Context, r model.Registration) (int64, error) {
	var id int64
	err := s.pool.QueryRow(ctx, `
		INSERT INTO registrations
			(form_id, member_type_id, first_name, last_name, email, phone, birth_date)
		VALUES ($1, $2, $3, $4, $5, $6, $7)
		RETURNING id
	`, r.FormID, r.MemberTypeID, r.FirstName, r.LastName, r.Email, r.Phone, r.BirthDate).Scan(&id)
	if err != nil {
		return 0, err
	}
	return id, nil
}

var ErrNotFound = errors.New("not found")