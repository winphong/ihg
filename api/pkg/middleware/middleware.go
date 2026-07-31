// Package middleware ports server/middleware/*.js and server/startup/cors.js.
package middleware

import (
	"context"
	"log"
	"net/http"
	"os"

	"ihg/api/pkg/models"
)

type contextKey string

const ClaimsKey contextKey = "claims"

// RequireAdmin mirrors server/middleware/admin.js: if PRIVATE_KEY isn't set,
// auth is skipped entirely (matches the existing dev-mode escape hatch).
func RequireAdmin(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		if os.Getenv("PRIVATE_KEY") == "" {
			next(w, r)
			return
		}

		token := r.Header.Get("x-auth-token")
		if token == "" {
			http.Error(w, "Access denied. No token provided.", http.StatusUnauthorized)
			return
		}

		claims, err := models.ParseAuthToken(token)
		if err != nil {
			http.Error(w, "Invalid token", http.StatusBadRequest)
			return
		}

		ctx := context.WithValue(r.Context(), ClaimsKey, claims)
		next(w, r.WithContext(ctx))
	}
}

// Recover mirrors server/middleware/error.js: any panic (the Go analog of an
// unhandled rejected promise reaching Express's error handler) becomes a
// generic 500, logged server-side.
func Recover(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		defer func() {
			if err := recover(); err != nil {
				log.Println(err)
				http.Error(w, "Something failed.", http.StatusInternalServerError)
			}
		}()
		next.ServeHTTP(w, r)
	})
}

// CORS mirrors server/startup/cors.js (the permissive `cors()` default).
func CORS(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT")
		w.Header().Set("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, x-auth-token")

		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusNoContent)
			return
		}

		next.ServeHTTP(w, r)
	})
}
