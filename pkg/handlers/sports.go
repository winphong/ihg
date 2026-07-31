package handlers

import (
	"net/http"

	"go.mongodb.org/mongo-driver/v2/bson"
	"go.mongodb.org/mongo-driver/v2/mongo/options"

	"ihg/pkg/models"
)

// GetSports mirrors GET /api/sport.
func GetSports(sports collection) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		ctx := r.Context()
		cur, err := sports.Find(ctx, bson.D{}, options.Find().SetSort(bson.D{{Key: "name", Value: 1}}))
		if err != nil {
			panic(err)
		}
		result := []models.Sport{}
		if err := cur.All(ctx, &result); err != nil {
			panic(err)
		}
		writeJSON(w, http.StatusOK, result)
	}
}

// GetSportByName mirrors GET /api/sport/:sport. The original always returns
// an (possibly empty) array via Sport.find(), never a 400 - the `if
// (!sport)` check in the JS route is dead code since find() never returns a
// falsy value.
func GetSportByName(sports collection) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		ctx := r.Context()
		cur, err := sports.Find(ctx, bson.D{{Key: "name", Value: r.PathValue("sport")}})
		if err != nil {
			panic(err)
		}
		result := []models.Sport{}
		if err := cur.All(ctx, &result); err != nil {
			panic(err)
		}
		writeJSON(w, http.StatusOK, result)
	}
}

// CreateSport mirrors POST /api/sport (admin-only).
func CreateSport(sports collection) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var sport models.Sport
		if err := decodeBody(r, &sport); err != nil {
			writeText(w, http.StatusBadRequest, "Invalid request body")
			return
		}
		sport.ID = bson.NewObjectID()

		if _, err := sports.InsertOne(r.Context(), sport); err != nil {
			panic(err)
		}
		writeJSON(w, http.StatusOK, sport)
	}
}

// UpdateSportDescription mirrors PUT /api/sport/:sport (admin-only).
func UpdateSportDescription(sports collection) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var body struct {
			Description string `json:"description"`
		}
		if err := decodeBody(r, &body); err != nil {
			writeText(w, http.StatusBadRequest, "Invalid request body")
			return
		}

		sr := sports.FindOneAndUpdate(r.Context(),
			bson.D{{Key: "name", Value: r.PathValue("sport")}},
			bson.D{{Key: "$set", Value: bson.D{{Key: "description", Value: body.Description}}}},
			options.FindOneAndUpdate().SetReturnDocument(options.After))

		var updated models.Sport
		if err := sr.Decode(&updated); err != nil {
			panic(err)
		}
		writeJSON(w, http.StatusOK, updated)
	}
}
