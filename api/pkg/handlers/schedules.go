package handlers

import (
	"net/http"
	"strings"
	"time"

	"go.mongodb.org/mongo-driver/v2/bson"
	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"

	"ihg/api/pkg/models"
)

// Hardcoded CNY term-break window from the AY19/20 schedule logic in
// server/routes/schedules.js. Preserved verbatim rather than "fixed" -
// this is a migration, not a behavior change.
var (
	cnyStart  = time.Date(2020, time.January, 24, 0, 0, 0, 0, time.UTC)
	cnyEnd    = time.Date(2020, time.January, 28, 0, 0, 0, 0, time.UTC)
	cnyWinLo  = time.Date(2020, time.January, 28, 0, 0, 0, 0, time.UTC)
	cnyWinHi  = time.Date(2020, time.January, 30, 0, 0, 0, 0, time.UTC)
	termLast  = time.Date(2020, time.February, 9, 0, 0, 0, 0, time.UTC)
	termFirst = time.Date(2020, time.January, 6, 0, 0, 0, 0, time.UTC)
)

// parseJSDate parses the string form of a JS `Date` object (its default
// .toString() output, e.g. "Wed Jan 08 2020 00:00:00 GMT+0800 (Singapore
// Standard Time)") the way `new Date(str)` would in Node - this is what the
// frontend sends verbatim as a URL path segment.
func parseJSDate(s string) (time.Time, error) {
	if i := strings.Index(s, " ("); i != -1 {
		s = s[:i]
	}
	s = strings.TrimSpace(s)

	layouts := []string{
		"Mon Jan 2 2006 15:04:05 GMT-0700",
		time.RFC3339,
		time.RFC1123,
		"2 Jan 2006",
		"02 Jan 2006",
	}
	var lastErr error
	for _, layout := range layouts {
		if t, err := time.Parse(layout, s); err == nil {
			return t, nil
		} else {
			lastErr = err
		}
	}
	return time.Time{}, lastErr
}

// GetUpcomingSchedules mirrors GET /api/schedule/upcomingSchedules/:date.
func GetUpcomingSchedules(schedules collection) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		current, err := parseJSDate(r.PathValue("date"))
		if err != nil {
			writeText(w, http.StatusBadRequest, "Invalid date")
			return
		}
		if current.After(termLast) {
			current = termLast
		}
		if current.Before(termFirst) {
			current = termFirst
		}
		next2Days := current.AddDate(0, 0, 2)

		filter := bson.D{{Key: "startTime", Value: bson.D{{Key: "$gte", Value: current}, {Key: "$lt", Value: next2Days}}}}
		if !current.Before(cnyStart) && current.Before(cnyEnd) {
			filter = bson.D{{Key: "startTime", Value: bson.D{{Key: "$gte", Value: cnyWinLo}, {Key: "$lt", Value: cnyWinHi}}}}
		}

		result, err := findSchedules(r, schedules, filter, bson.D{{Key: "startTime", Value: 1}})
		if err != nil {
			panic(err)
		}
		writeJSON(w, http.StatusOK, result)
	}
}

// GetSchedulesAsc mirrors GET /api/schedule/asc.
func GetSchedulesAsc(schedules collection) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		result, err := findSchedules(r, schedules, bson.D{}, bson.D{{Key: "startTime", Value: 1}})
		if err != nil {
			panic(err)
		}
		writeJSON(w, http.StatusOK, result)
	}
}

// GetSchedulesForAdmin mirrors GET /api/schedule/admin.
func GetSchedulesForAdmin(schedules collection) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		result, err := findSchedules(r, schedules, bson.D{}, bson.D{{Key: "startTime", Value: -1}})
		if err != nil {
			panic(err)
		}
		writeJSON(w, http.StatusOK, result)
	}
}

// GetScheduleByID mirrors GET /api/schedule/:id.
func GetScheduleByID(schedules collection) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		id, err := bson.ObjectIDFromHex(r.PathValue("id"))
		if err != nil {
			writeText(w, http.StatusBadRequest, "Schedule not found!")
			return
		}

		var schedule models.Schedule
		err = schedules.FindOne(r.Context(), bson.D{{Key: "_id", Value: id}}).Decode(&schedule)
		if err == mongo.ErrNoDocuments {
			writeText(w, http.StatusBadRequest, "Schedule not found!")
			return
		}
		if err != nil {
			panic(err)
		}
		writeJSON(w, http.StatusOK, schedule)
	}
}

// GetSchedulesWithScore mirrors GET /api/schedule (schedules that have at
// least one hall with a recorded score).
func GetSchedulesWithScore(schedules collection) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		filter := bson.D{{Key: "halls", Value: bson.D{{Key: "$elemMatch", Value: bson.D{{Key: "score", Value: bson.D{{Key: "$gte", Value: 0}}}}}}}}
		result, err := findSchedules(r, schedules, filter, bson.D{{Key: "startTime", Value: -1}})
		if err != nil {
			panic(err)
		}
		writeJSON(w, http.StatusOK, result)
	}
}

func findSchedules(r *http.Request, schedules collection, filter bson.D, sort bson.D) ([]models.Schedule, error) {
	ctx := r.Context()
	cur, err := schedules.Find(ctx, filter, options.Find().SetSort(sort))
	if err != nil {
		return nil, err
	}
	result := []models.Schedule{}
	if err := cur.All(ctx, &result); err != nil {
		return nil, err
	}
	return result, nil
}

// resolveHalls mirrors the Promise.all(...).then(...) hall-lookup dance in
// server/routes/schedules.js: turn an array of hall abbreviations into the
// embedded hall sub-documents, keeping only the fields the schedule stores.
// (The original also tries to carry over a "score" field on update, but Hall
// documents never have one, so that pick is a no-op there too.)
func resolveHalls(r *http.Request, halls collection, abbreviations []string) ([]models.ScheduleHall, error) {
	ctx := r.Context()
	result := make([]models.ScheduleHall, 0, len(abbreviations))
	for _, abbr := range abbreviations {
		var hall models.Hall
		err := halls.FindOne(ctx, bson.D{{Key: "abbreviation", Value: abbr}}).Decode(&hall)
		if err != nil {
			return nil, err
		}
		sh := models.ScheduleHall{
			Name:         hall.Name,
			ImgUrl:       hall.ImgUrl,
			ColourCode:   hall.ColourCode,
			Abbreviation: hall.Abbreviation,
		}
		result = append(result, sh)
	}
	return result, nil
}

// scheduleCreateRequest mirrors the POST/PUT body shape: `halls` arrives as
// an array of hall abbreviations, not full sub-documents.
type scheduleCreateRequest struct {
	Sport     string    `json:"sport"`
	Halls     []string  `json:"halls"`
	StartTime time.Time `json:"startTime"`
	EndTime   time.Time `json:"endTime"`
	Venue     string    `json:"venue"`
	Gender    string    `json:"gender"`
	Stage     string    `json:"stage"`
}

// CreateSchedule mirrors POST /api/schedule (admin-only).
func CreateSchedule(schedules, halls collection) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var req scheduleCreateRequest
		if err := decodeBody(r, &req); err != nil {
			writeText(w, http.StatusBadRequest, "Invalid request body")
			return
		}

		resolvedHalls, err := resolveHalls(r, halls, req.Halls)
		if err != nil {
			writeText(w, http.StatusBadRequest, err.Error())
			return
		}

		schedule := models.Schedule{
			ID:        bson.NewObjectID(),
			Sport:     req.Sport,
			Halls:     resolvedHalls,
			StartTime: req.StartTime,
			EndTime:   req.EndTime,
			Venue:     req.Venue,
			Gender:    req.Gender,
			Stage:     req.Stage,
		}

		if _, err := schedules.InsertOne(r.Context(), schedule); err != nil {
			panic(err)
		}
		writeJSON(w, http.StatusOK, schedule)
	}
}

// UpdateScheduleScore mirrors PUT /api/schedule/updateScore/:id (admin-only).
func UpdateScheduleScore(schedules collection) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		id, err := bson.ObjectIDFromHex(r.PathValue("id"))
		if err != nil {
			writeText(w, http.StatusBadRequest, "Schedule not found!")
			return
		}

		var body struct {
			Halls []models.ScheduleHall `json:"halls"`
		}
		if err := decodeBody(r, &body); err != nil {
			writeText(w, http.StatusBadRequest, "Invalid request body")
			return
		}

		ctx := r.Context()
		var existing models.Schedule
		if err := schedules.FindOne(ctx, bson.D{{Key: "_id", Value: id}}).Decode(&existing); err != nil {
			if err == mongo.ErrNoDocuments {
				writeText(w, http.StatusBadRequest, "Schedule not found!")
				return
			}
			panic(err)
		}

		sr := schedules.FindOneAndUpdate(ctx, bson.D{{Key: "_id", Value: id}},
			bson.D{{Key: "$set", Value: bson.D{{Key: "halls", Value: body.Halls}}}},
			options.FindOneAndUpdate().SetReturnDocument(options.After))
		var updated models.Schedule
		if err := sr.Decode(&updated); err != nil {
			panic(err)
		}
		writeJSON(w, http.StatusOK, updated)
	}
}

// UpdateSchedule mirrors PUT /api/schedule/:id (admin-only).
func UpdateSchedule(schedules, halls collection) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		id, err := bson.ObjectIDFromHex(r.PathValue("id"))
		if err != nil {
			writeText(w, http.StatusBadRequest, "Schedule not found!")
			return
		}

		ctx := r.Context()
		var existing models.Schedule
		if err := schedules.FindOne(ctx, bson.D{{Key: "_id", Value: id}}).Decode(&existing); err != nil {
			if err == mongo.ErrNoDocuments {
				writeText(w, http.StatusBadRequest, "Schedule not found!")
				return
			}
			panic(err)
		}

		var req scheduleCreateRequest
		if err := decodeBody(r, &req); err != nil {
			writeText(w, http.StatusBadRequest, "Invalid request body")
			return
		}

		resolvedHalls, err := resolveHalls(r, halls, req.Halls)
		if err != nil {
			writeText(w, http.StatusInternalServerError, err.Error())
			return
		}

		set := bson.D{
			{Key: "sport", Value: req.Sport},
			{Key: "halls", Value: resolvedHalls},
			{Key: "startTime", Value: req.StartTime},
			{Key: "endTime", Value: req.EndTime},
			{Key: "venue", Value: req.Venue},
			{Key: "gender", Value: req.Gender},
			{Key: "stage", Value: req.Stage},
		}
		sr := schedules.FindOneAndUpdate(ctx, bson.D{{Key: "_id", Value: id}},
			bson.D{{Key: "$set", Value: set}},
			options.FindOneAndUpdate().SetReturnDocument(options.After))
		var updated models.Schedule
		if err := sr.Decode(&updated); err != nil {
			panic(err)
		}
		writeJSON(w, http.StatusOK, updated)
	}
}

// DeleteSchedule mirrors DELETE /api/schedule/:id (admin-only).
func DeleteSchedule(schedules collection) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		id, err := bson.ObjectIDFromHex(r.PathValue("id"))
		if err != nil {
			writeText(w, http.StatusBadRequest, "Schedule not found!")
			return
		}

		ctx := r.Context()
		var existing models.Schedule
		if err := schedules.FindOne(ctx, bson.D{{Key: "_id", Value: id}}).Decode(&existing); err != nil {
			if err == mongo.ErrNoDocuments {
				writeText(w, http.StatusBadRequest, "Schedule not found!")
				return
			}
			panic(err)
		}

		if _, err := schedules.DeleteOne(ctx, bson.D{{Key: "_id", Value: id}}); err != nil {
			panic(err)
		}
		writeJSON(w, http.StatusOK, existing)
	}
}
