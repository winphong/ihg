// Package handlers ports server/routes/*.js.
package handlers

import (
	"net/http"

	"go.mongodb.org/mongo-driver/v2/bson"
	"go.mongodb.org/mongo-driver/v2/mongo/options"

	"ihg/pkg/models"
)

// GetHalls mirrors GET /api/halls (server/routes/halls.js).
func GetHalls(halls collection) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		ctx := r.Context()
		cur, err := halls.Find(ctx, bson.D{}, options.Find().SetSort(bson.D{{Key: "name", Value: 1}}))
		if err != nil {
			panic(err)
		}
		var result []models.Hall
		if err := cur.All(ctx, &result); err != nil {
			panic(err)
		}
		if result == nil {
			result = []models.Hall{}
		}
		writeJSON(w, http.StatusOK, result)
	}
}

// CreateHall mirrors POST /api/hall (admin-only).
func CreateHall(halls collection) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var hall models.Hall
		if err := decodeBody(r, &hall); err != nil {
			writeText(w, http.StatusBadRequest, "Invalid request body")
			return
		}
		hall.ID = bson.NewObjectID()

		if _, err := halls.InsertOne(r.Context(), hall); err != nil {
			panic(err)
		}
		writeJSON(w, http.StatusOK, hall)
	}
}

// UpdateHalls mirrors PUT /api/hall (admin-only): a bulk update of standings
// for an array of halls, keyed by _id.
func UpdateHalls(halls collection) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var updates []models.HallStandingUpdate
		if err := decodeBody(r, &updates); err != nil {
			writeText(w, http.StatusBadRequest, "Invalid request body")
			return
		}

		ctx := r.Context()
		result := make([]models.Hall, 0, len(updates))
		for _, u := range updates {
			set := bson.M{}
			if u.MalePoint != nil {
				set["malePoint"] = *u.MalePoint
			}
			if u.FemalePoint != nil {
				set["femalePoint"] = *u.FemalePoint
			}
			if u.TotalPoint != nil {
				set["totalPoint"] = *u.TotalPoint
			}

			sr := halls.FindOneAndUpdate(ctx, bson.D{{Key: "_id", Value: u.ID}}, bson.D{{Key: "$set", Value: set}},
				options.FindOneAndUpdate().SetReturnDocument(options.After))
			var updated models.Hall
			if err := sr.Decode(&updated); err != nil {
				continue // mirrors the original's per-item catch(error) => console.log(error)
			}
			result = append(result, updated)
		}

		writeJSON(w, http.StatusOK, result)
	}
}
