package handlers

import (
	"net/http"
	"time"

	"go.mongodb.org/mongo-driver/v2/bson"

	"ihg/pkg/models"
)

// GetTraffic mirrors GET /api/traffic.
func GetTraffic(traffics collection) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var traffic models.Traffic
		err := traffics.FindOne(r.Context(), bson.D{{Key: "type", Value: "Access"}}).Decode(&traffic)
		if err != nil {
			// mirrors res.send(null) when Traffic.findOne resolves to null
			writeJSON(w, http.StatusOK, nil)
			return
		}
		writeJSON(w, http.StatusOK, traffic)
	}
}

// UpdateTraffic mirrors PUT /api/traffic: increments the "Access" counter.
// Not admin-gated in the original - it's the public page-view tracker.
func UpdateTraffic(traffics collection) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		ctx := r.Context()
		var traffic models.Traffic
		if err := traffics.FindOne(ctx, bson.D{{Key: "type", Value: "Access"}}).Decode(&traffic); err != nil {
			// mirrors the unhandled TypeError when calling .count++ on null
			panic(err)
		}

		traffic.Count++
		traffic.AccessDate = time.Now().UTC()

		if _, err := traffics.UpdateByID(ctx, traffic.ID,
			bson.D{{Key: "$set", Value: bson.D{
				{Key: "count", Value: traffic.Count},
				{Key: "accessDate", Value: traffic.AccessDate},
			}}}); err != nil {
			panic(err)
		}
		writeJSON(w, http.StatusOK, traffic)
	}
}
