package handlers

import (
	"bytes"
	"context"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"

	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
	"golang.org/x/crypto/bcrypt"

	"ihg/api/pkg/models"
)

func TestLogin(t *testing.T) {
	hash, err := bcrypt.GenerateFromPassword([]byte("correct-password"), bcrypt.DefaultCost)
	if err != nil {
		t.Fatal(err)
	}
	stored := models.Admin{Username: "root", Password: string(hash)}

	fake := &fakeCollection{
		findOneFunc: func(ctx context.Context, filter any, opts ...options.Lister[options.FindOneOptions]) *mongo.SingleResult {
			return singleResultOf(stored, nil)
		},
	}

	cases := []struct {
		name       string
		username   string
		password   string
		wantStatus int
		wantBody   string
	}{
		{"wrong password", "root", "wrong", http.StatusBadRequest, "Invalid username or password\n"},
		{"correct credentials", "root", "correct-password", http.StatusOK, ""},
	}

	for _, c := range cases {
		t.Run(c.name, func(t *testing.T) {
			body, _ := json.Marshal(map[string]string{"username": c.username, "password": c.password})
			req := httptest.NewRequest(http.MethodPost, "/api/admin", bytes.NewReader(body))
			w := httptest.NewRecorder()

			Login(fake)(w, req)

			if w.Code != c.wantStatus {
				t.Fatalf("status = %d, want %d", w.Code, c.wantStatus)
			}
			if c.wantBody != "" && w.Body.String() != c.wantBody {
				t.Errorf("body = %q, want %q", w.Body.String(), c.wantBody)
			}
			if c.wantStatus == http.StatusOK && w.Body.Len() == 0 {
				t.Error("expected a non-empty JWT body on success")
			}
		})
	}
}

func TestLogin_UnknownUsername(t *testing.T) {
	fake := &fakeCollection{
		findOneFunc: func(ctx context.Context, filter any, opts ...options.Lister[options.FindOneOptions]) *mongo.SingleResult {
			return singleResultOf(models.Admin{}, mongo.ErrNoDocuments)
		},
	}

	body, _ := json.Marshal(map[string]string{"username": "nobody", "password": "x"})
	req := httptest.NewRequest(http.MethodPost, "/api/admin", bytes.NewReader(body))
	w := httptest.NewRecorder()

	Login(fake)(w, req)

	if w.Code != http.StatusBadRequest {
		t.Fatalf("status = %d, want %d", w.Code, http.StatusBadRequest)
	}
}
