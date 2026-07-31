package handlers

import (
	"net/http"
	"strings"

	"go.mongodb.org/mongo-driver/v2/bson"
	"go.mongodb.org/mongo-driver/v2/mongo"
	"golang.org/x/crypto/bcrypt"

	"ihg/pkg/models"
)

// Login mirrors POST /api/admin: returns the raw JWT string as the body
// (not wrapped in JSON), matching the original's res.send(jwt).
func Login(admins collection) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var body struct {
			Username string `json:"username"`
			Password string `json:"password"`
		}
		if err := decodeBody(r, &body); err != nil {
			writeText(w, http.StatusBadRequest, "Invalid request body")
			return
		}
		if strings.TrimSpace(body.Username) == "" {
			writeText(w, http.StatusBadRequest, "Username is required!")
			return
		}
		if strings.TrimSpace(body.Password) == "" {
			writeText(w, http.StatusBadRequest, "Password is required!")
			return
		}

		var admin models.Admin
		err := admins.FindOne(r.Context(), bson.D{{Key: "username", Value: body.Username}}).Decode(&admin)
		if err == mongo.ErrNoDocuments {
			writeText(w, http.StatusBadRequest, "Invalid username or password")
			return
		}
		if err != nil {
			panic(err)
		}

		if bcrypt.CompareHashAndPassword([]byte(admin.Password), []byte(body.Password)) != nil {
			writeText(w, http.StatusBadRequest, "Invalid username or password")
			return
		}

		token, err := admin.GenerateAuthToken()
		if err != nil {
			panic(err)
		}
		writeText(w, http.StatusOK, token)
	}
}

// Register mirrors POST /api/admin/register (no auth guard in the
// original - an operational/setup endpoint, not called from the frontend).
func Register(admins collection) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var admin models.Admin
		if err := decodeBody(r, &admin); err != nil {
			writeText(w, http.StatusBadRequest, "Invalid request body")
			return
		}

		hash, err := bcrypt.GenerateFromPassword([]byte(admin.Password), 10)
		if err != nil {
			panic(err)
		}
		admin.Password = string(hash)
		admin.ID = bson.NewObjectID()

		if _, err := admins.InsertOne(r.Context(), admin); err != nil {
			panic(err)
		}
		writeJSON(w, http.StatusOK, admin)
	}
}
