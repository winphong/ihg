package handlers

import (
	"context"
	"net/http"
	"net/http/httptest"
	"testing"
	"time"

	"go.mongodb.org/mongo-driver/v2/bson"
	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"

	"ihg/pkg/models"
)

func TestParseJSDate(t *testing.T) {
	cases := []struct {
		name string
		in   string
		want time.Time
	}{
		{
			name: "full JS Date.toString() with timezone parenthetical",
			in:   "Wed Jan 08 2020 00:00:00 GMT+0800 (Singapore Standard Time)",
			want: time.Date(2020, time.January, 8, 0, 0, 0, 0, time.FixedZone("", 8*60*60)),
		},
		{
			name: "RFC3339",
			in:   "2020-01-08T00:00:00Z",
			want: time.Date(2020, time.January, 8, 0, 0, 0, 0, time.UTC),
		},
	}

	for _, c := range cases {
		t.Run(c.name, func(t *testing.T) {
			got, err := parseJSDate(c.in)
			if err != nil {
				t.Fatalf("parseJSDate(%q) error: %v", c.in, err)
			}
			if !got.Equal(c.want) {
				t.Errorf("parseJSDate(%q) = %v, want %v", c.in, got, c.want)
			}
		})
	}
}

// TestGetUpcomingSchedules_DateWindow exercises the clamping and CNY
// special-case logic ported from server/routes/schedules.js verbatim.
func TestGetUpcomingSchedules_DateWindow(t *testing.T) {
	cases := []struct {
		name    string
		date    string
		wantGte time.Time
		wantLt  time.Time
	}{
		{
			name:    "before term start clamps to first day",
			date:    "1 Jan 2020",
			wantGte: termFirst,
			wantLt:  termFirst.AddDate(0, 0, 2),
		},
		{
			name:    "after term end clamps to last day",
			date:    "1 Mar 2020",
			wantGte: termLast,
			wantLt:  termLast.AddDate(0, 0, 2),
		},
		{
			name:    "within CNY window uses the hardcoded break range",
			date:    "25 Jan 2020",
			wantGte: cnyWinLo,
			wantLt:  cnyWinHi,
		},
		{
			name:    "ordinary in-term date uses a plain 2-day window",
			date:    "10 Jan 2020",
			wantGte: time.Date(2020, time.January, 10, 0, 0, 0, 0, time.UTC),
			wantLt:  time.Date(2020, time.January, 12, 0, 0, 0, 0, time.UTC),
		},
	}

	for _, c := range cases {
		t.Run(c.name, func(t *testing.T) {
			var gotFilter bson.D
			fake := &fakeCollection{
				findFunc: func(ctx context.Context, filter any, opts ...options.Lister[options.FindOptions]) (*mongo.Cursor, error) {
					gotFilter = filter.(bson.D)
					return cursorOf(), nil
				},
			}

			req := httptest.NewRequest(http.MethodGet, "/api/schedule/upcomingSchedules/x", nil)
			req.SetPathValue("date", c.date)
			w := httptest.NewRecorder()

			GetUpcomingSchedules(fake)(w, req)

			startTimeFilter := gotFilter[0].Value.(bson.D)
			gte := startTimeFilter[0].Value.(time.Time)
			lt := startTimeFilter[1].Value.(time.Time)

			if !gte.Equal(c.wantGte) {
				t.Errorf("$gte = %v, want %v", gte, c.wantGte)
			}
			if !lt.Equal(c.wantLt) {
				t.Errorf("$lt = %v, want %v", lt, c.wantLt)
			}
		})
	}
}

func TestGetScheduleByID_NotFound(t *testing.T) {
	fake := &fakeCollection{
		findOneFunc: func(ctx context.Context, filter any, opts ...options.Lister[options.FindOneOptions]) *mongo.SingleResult {
			return singleResultOf(models.Schedule{}, mongo.ErrNoDocuments)
		},
	}

	req := httptest.NewRequest(http.MethodGet, "/api/schedule/"+bson.NewObjectID().Hex(), nil)
	req.SetPathValue("id", bson.NewObjectID().Hex())
	w := httptest.NewRecorder()

	GetScheduleByID(fake)(w, req)

	if w.Code != http.StatusBadRequest {
		t.Fatalf("status = %d, want %d", w.Code, http.StatusBadRequest)
	}
	if body := w.Body.String(); body != "Schedule not found!\n" {
		t.Errorf("body = %q, want %q", body, "Schedule not found!\n")
	}
}
