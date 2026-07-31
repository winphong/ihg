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

	"ihg/pkg/models"
)

func TestCreateEnquiry_Validation(t *testing.T) {
	cases := []struct {
		name    string
		body    models.Enquiry
		wantMsg string
	}{
		{"missing name", models.Enquiry{Email: "a@b.com", Subject: "s", Message: "m"}, "Name is required!"},
		{"missing email", models.Enquiry{Name: "n", Subject: "s", Message: "m"}, "Email is required!"},
		{"missing subject", models.Enquiry{Name: "n", Email: "a@b.com", Message: "m"}, "Subject is required!"},
		{"missing message", models.Enquiry{Name: "n", Email: "a@b.com", Subject: "s"}, "Message is required!"},
	}

	for _, c := range cases {
		t.Run(c.name, func(t *testing.T) {
			fake := &fakeCollection{
				insertOneFunc: func(ctx context.Context, document any, opts ...options.Lister[options.InsertOneOptions]) (*mongo.InsertOneResult, error) {
					t.Fatal("InsertOne should not be called for invalid input")
					return nil, nil
				},
			}

			body, _ := json.Marshal(c.body)
			req := httptest.NewRequest(http.MethodPost, "/api/enquiry", bytes.NewReader(body))
			w := httptest.NewRecorder()

			CreateEnquiry(fake)(w, req)

			if w.Code != http.StatusBadRequest {
				t.Fatalf("status = %d, want %d", w.Code, http.StatusBadRequest)
			}
			if got := w.Body.String(); got != c.wantMsg+"\n" {
				t.Errorf("body = %q, want %q", got, c.wantMsg+"\n")
			}
		})
	}
}

func TestCreateEnquiry_ValidInsertsAndEchoesBack(t *testing.T) {
	inserted := false
	fake := &fakeCollection{
		insertOneFunc: func(ctx context.Context, document any, opts ...options.Lister[options.InsertOneOptions]) (*mongo.InsertOneResult, error) {
			inserted = true
			return &mongo.InsertOneResult{}, nil
		},
	}

	valid := models.Enquiry{Name: "n", Email: "a@b.com", Subject: "s", Message: "m"}
	body, _ := json.Marshal(valid)
	req := httptest.NewRequest(http.MethodPost, "/api/enquiry", bytes.NewReader(body))
	w := httptest.NewRecorder()

	CreateEnquiry(fake)(w, req)

	if !inserted {
		t.Fatal("expected InsertOne to be called for valid input")
	}
	if w.Code != http.StatusOK {
		t.Fatalf("status = %d, want %d", w.Code, http.StatusOK)
	}
}
