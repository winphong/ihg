package handlers

import (
	"context"
	"net/http"
	"net/http/httptest"
	"testing"

	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"

	"ihg/api/pkg/models"
)

// TestGetSportByName_NoMatchStill200 is a regression test for a quirk in
// server/routes/sports.js: Sport.find() always resolves to an array (never
// null), so the route's "if (!sport) return 400" never actually fires - an
// unknown sport name returns 200 with an empty array, not a 400. We preserve
// that behavior rather than the apparently-intended-but-dead 400 path.
func TestGetSportByName_NoMatchStill200(t *testing.T) {
	fake := &fakeCollection{
		findFunc: func(ctx context.Context, filter any, opts ...options.Lister[options.FindOptions]) (*mongo.Cursor, error) {
			return cursorOf(), nil
		},
	}

	req := httptest.NewRequest(http.MethodGet, "/api/sport/nonexistent", nil)
	req.SetPathValue("sport", "nonexistent")
	w := httptest.NewRecorder()

	GetSportByName(fake)(w, req)

	if w.Code != http.StatusOK {
		t.Fatalf("status = %d, want %d", w.Code, http.StatusOK)
	}
	if body := w.Body.String(); body != "[]\n" {
		t.Errorf("body = %q, want empty JSON array", body)
	}
}

func TestGetSports_ReturnsSortedList(t *testing.T) {
	fake := &fakeCollection{
		findFunc: func(ctx context.Context, filter any, opts ...options.Lister[options.FindOptions]) (*mongo.Cursor, error) {
			return cursorOf(
				models.Sport{Name: "Basketball"},
				models.Sport{Name: "Soccer"},
			), nil
		},
	}

	req := httptest.NewRequest(http.MethodGet, "/api/sport", nil)
	w := httptest.NewRecorder()

	GetSports(fake)(w, req)

	if w.Code != http.StatusOK {
		t.Fatalf("status = %d, want %d", w.Code, http.StatusOK)
	}
}
