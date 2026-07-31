package handlers

import (
	"net/http"
	"strings"

	"go.mongodb.org/mongo-driver/v2/bson"

	"ihg/api/pkg/models"
)

// GetEnquiries mirrors GET /api/enquiry.
func GetEnquiries(enquiries collection) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		ctx := r.Context()
		cur, err := enquiries.Find(ctx, bson.D{})
		if err != nil {
			panic(err)
		}
		result := []models.Enquiry{}
		if err := cur.All(ctx, &result); err != nil {
			panic(err)
		}
		writeJSON(w, http.StatusOK, result)
	}
}

// validateEnquiry mirrors server/model/enquiry.js's Joi schema. Note: the
// original route (server/routes/enquiries.js) forgot to `return` after
// writing the 400, so an invalid submission there falls through and crashes
// on the double res.send. That's a bug, not intended parity - fixed here.
func validateEnquiry(e models.Enquiry) string {
	if strings.TrimSpace(e.Name) == "" {
		return "Name is required!"
	}
	if !strings.Contains(e.Email, "@") || strings.TrimSpace(e.Email) == "" {
		return "Email is required!"
	}
	if strings.TrimSpace(e.Subject) == "" {
		return "Subject is required!"
	}
	if strings.TrimSpace(e.Message) == "" {
		return "Message is required!"
	}
	return ""
}

// CreateEnquiry mirrors POST /api/enquiry.
func CreateEnquiry(enquiries collection) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var enquiry models.Enquiry
		if err := decodeBody(r, &enquiry); err != nil {
			writeText(w, http.StatusBadRequest, "Invalid request body")
			return
		}

		if msg := validateEnquiry(enquiry); msg != "" {
			writeText(w, http.StatusBadRequest, msg)
			return
		}

		enquiry.ID = bson.NewObjectID()
		if _, err := enquiries.InsertOne(r.Context(), enquiry); err != nil {
			panic(err)
		}
		writeJSON(w, http.StatusOK, enquiry)
	}
}
