package middleware

import (
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/golang-jwt/jwt/v5"
)

func TestRequireAdmin_NoPrivateKeySkipsAuth(t *testing.T) {
	t.Setenv("PRIVATE_KEY", "")

	called := false
	handler := RequireAdmin(func(w http.ResponseWriter, r *http.Request) {
		called = true
	})

	req := httptest.NewRequest(http.MethodGet, "/api/schedule", nil)
	w := httptest.NewRecorder()
	handler(w, req)

	if !called {
		t.Error("expected next handler to run when PRIVATE_KEY is unset, matching server/middleware/admin.js")
	}
}

func TestRequireAdmin_MissingToken(t *testing.T) {
	t.Setenv("PRIVATE_KEY", "secret")

	handler := RequireAdmin(func(w http.ResponseWriter, r *http.Request) {
		t.Fatal("next should not be called without a token")
	})

	req := httptest.NewRequest(http.MethodGet, "/api/schedule", nil)
	w := httptest.NewRecorder()
	handler(w, req)

	if w.Code != http.StatusUnauthorized {
		t.Errorf("status = %d, want %d", w.Code, http.StatusUnauthorized)
	}
}

func TestRequireAdmin_InvalidToken(t *testing.T) {
	t.Setenv("PRIVATE_KEY", "secret")

	handler := RequireAdmin(func(w http.ResponseWriter, r *http.Request) {
		t.Fatal("next should not be called with an invalid token")
	})

	req := httptest.NewRequest(http.MethodGet, "/api/schedule", nil)
	req.Header.Set("x-auth-token", "not-a-real-token")
	w := httptest.NewRecorder()
	handler(w, req)

	if w.Code != http.StatusBadRequest {
		t.Errorf("status = %d, want %d", w.Code, http.StatusBadRequest)
	}
}

func TestRequireAdmin_ValidToken(t *testing.T) {
	t.Setenv("PRIVATE_KEY", "secret")

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{"username": "root"})
	signed, err := token.SignedString([]byte("secret"))
	if err != nil {
		t.Fatal(err)
	}

	called := false
	handler := RequireAdmin(func(w http.ResponseWriter, r *http.Request) {
		called = true
	})

	req := httptest.NewRequest(http.MethodGet, "/api/schedule", nil)
	req.Header.Set("x-auth-token", signed)
	w := httptest.NewRecorder()
	handler(w, req)

	if !called {
		t.Error("expected next handler to run with a valid token")
	}
	if w.Code != http.StatusOK {
		t.Errorf("status = %d, want %d", w.Code, http.StatusOK)
	}
}

func TestRecover_PanicBecomes500(t *testing.T) {
	handler := Recover(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		panic("boom")
	}))

	req := httptest.NewRequest(http.MethodGet, "/api/anything", nil)
	w := httptest.NewRecorder()
	handler.ServeHTTP(w, req)

	if w.Code != http.StatusInternalServerError {
		t.Errorf("status = %d, want %d", w.Code, http.StatusInternalServerError)
	}
	if w.Body.String() != "Something failed.\n" {
		t.Errorf("body = %q, want %q", w.Body.String(), "Something failed.\n")
	}
}
