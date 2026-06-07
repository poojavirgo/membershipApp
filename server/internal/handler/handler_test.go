package handler

import (
	"bytes"
	"context"
	"encoding/json"
	"errors"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"

	"github.com/britsport/membership-api/internal/model"
)

type stubStore struct {
	got      model.Registration
	hit      bool
	failWith error
}

func (s *stubStore) SaveRegistration(_ context.Context, r model.Registration) (int64, error) {
	s.hit = true
	s.got = r
	if s.failWith != nil {
		return 0, s.failWith
	}
	return 1, nil
}

func okRegistration() model.Registration {
	return model.Registration{
		FormID:       "B171388180BC457D9887AD92B6CCFC86",
		MemberTypeID: "8FE4113D4E4020E0DCF887803A886981",
		FirstName:    "Ada",
		LastName:     "Lovelace",
		Email:        "ada@example.com",
		Phone:        "+4787654322",
		BirthDate:    "1990-12-10",
	}
}

func postRegistration(t *testing.T, h *Handler, body []byte) *httptest.ResponseRecorder {
	t.Helper()
	req := httptest.NewRequest(http.MethodPost, "/api/registrations", bytes.NewReader(body))
	rec := httptest.NewRecorder()
	h.SubmitRegistration(rec, req)
	return rec
}

func TestGetForm_ReturnsAppendixOne(t *testing.T) {
	h := New(&stubStore{})

	req := httptest.NewRequest(http.MethodGet, "/api/form", nil)
	rec := httptest.NewRecorder()
	h.GetForm(rec, req)

	if rec.Code != http.StatusOK {
		t.Fatalf("GET /api/form: got status %d, want 200", rec.Code)
	}

	var form model.FormDetails
	if err := json.NewDecoder(rec.Body).Decode(&form); err != nil {
		t.Fatalf("could not decode form response: %v", err)
	}
	if form.ClubID != "britsport" {
		t.Errorf("clubId = %q, want britsport", form.ClubID)
	}
	if len(form.MemberTypes) == 0 {
		t.Error("form came back with no member types")
	}
}

func TestSubmitRegistration_HappyPath(t *testing.T) {
	store := &stubStore{}
	h := New(store)

	body, _ := json.Marshal(okRegistration())
	rec := postRegistration(t, h, body)

	if rec.Code != http.StatusCreated {
		t.Fatalf("got %d, want 201 — body: %s", rec.Code, rec.Body.String())
	}
	if !store.hit {
		t.Fatal("handler returned success but never called the store")
	}
	if store.got.Email != "ada@example.com" {
		t.Errorf("store received %+v, email didn't match", store.got)
	}
}

func TestSubmitRegistration_RejectsBadJSON(t *testing.T) {
	store := &stubStore{}
	h := New(store)

	rec := postRegistration(t, h, []byte("{not json"))

	if rec.Code != http.StatusBadRequest {
		t.Errorf("bad JSON should be a 400, got %d", rec.Code)
	}
	if store.hit {
		t.Error("nothing should have been saved")
	}
}

func TestSubmitRegistration_RejectsInvalidData(t *testing.T) {
	store := &stubStore{}
	h := New(store)

	reg := okRegistration()
	reg.Email = "not-an-email" 
	body, _ := json.Marshal(reg)

	rec := postRegistration(t, h, body)

	if rec.Code != http.StatusUnprocessableEntity {
		t.Fatalf("invalid data should be 422, got %d", rec.Code)
	}
	if store.hit {
		t.Error("a registration that failed validation made it to the store")
	}

	var resp struct {
		Errors map[string]string `json:"errors"`
	}
	if err := json.NewDecoder(rec.Body).Decode(&resp); err != nil {
		t.Fatalf("expected an errors object back, got: %v", err)
	}
	if !strings.Contains(strings.ToLower(resp.Errors["email"]), "email") {
		t.Errorf("expected an email error, got %q", resp.Errors["email"])
	}
}

func TestSubmitRegistration_StoreFailureIs500(t *testing.T) {
	store := &stubStore{failWith: errors.New("connection refused")}
	h := New(store)

	body, _ := json.Marshal(okRegistration())
	rec := postRegistration(t, h, body)

	if rec.Code != http.StatusInternalServerError {
		t.Errorf("a DB failure should surface as 500, got %d", rec.Code)
	}
}