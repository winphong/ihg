// Package handler is the single Vercel Go serverless entry point for
// everything under /api/*, mirroring the single-Express-app-per-function
// setup this replaces (server/api/index.js + server/startup/routes.js).
package handler

import (
	"net/http"
	"sync"

	"ihg/pkg/db"
	"ihg/pkg/handlers"
	"ihg/pkg/middleware"
)

var (
	mux     http.Handler
	muxOnce sync.Once
)

func buildMux() http.Handler {
	m := http.NewServeMux()

	halls := db.Halls()
	schedules := db.Schedules()
	sports := db.Sports()
	enquiries := db.Enquiries()
	traffics := db.Traffics()
	admins := db.Admins()

	m.HandleFunc("GET /api/halls", handlers.GetHalls(halls))
	m.HandleFunc("POST /api/hall", middleware.RequireAdmin(handlers.CreateHall(halls)))
	m.HandleFunc("PUT /api/hall", middleware.RequireAdmin(handlers.UpdateHalls(halls)))

	m.HandleFunc("GET /api/schedule/upcomingSchedules/{date}", handlers.GetUpcomingSchedules(schedules))
	m.HandleFunc("GET /api/schedule/asc", handlers.GetSchedulesAsc(schedules))
	m.HandleFunc("GET /api/schedule/admin", handlers.GetSchedulesForAdmin(schedules))
	m.HandleFunc("GET /api/schedule/{id}", handlers.GetScheduleByID(schedules))
	m.HandleFunc("GET /api/schedule", handlers.GetSchedulesWithScore(schedules))
	m.HandleFunc("POST /api/schedule", middleware.RequireAdmin(handlers.CreateSchedule(schedules, halls)))
	m.HandleFunc("PUT /api/schedule/updateScore/{id}", middleware.RequireAdmin(handlers.UpdateScheduleScore(schedules)))
	m.HandleFunc("PUT /api/schedule/{id}", middleware.RequireAdmin(handlers.UpdateSchedule(schedules, halls)))
	m.HandleFunc("DELETE /api/schedule/{id}", middleware.RequireAdmin(handlers.DeleteSchedule(schedules)))

	m.HandleFunc("GET /api/sport", handlers.GetSports(sports))
	m.HandleFunc("GET /api/sport/{sport}", handlers.GetSportByName(sports))
	m.HandleFunc("POST /api/sport", middleware.RequireAdmin(handlers.CreateSport(sports)))
	m.HandleFunc("PUT /api/sport/{sport}", middleware.RequireAdmin(handlers.UpdateSportDescription(sports)))

	m.HandleFunc("GET /api/enquiry", handlers.GetEnquiries(enquiries))
	m.HandleFunc("POST /api/enquiry", handlers.CreateEnquiry(enquiries))

	m.HandleFunc("GET /api/traffic", handlers.GetTraffic(traffics))
	m.HandleFunc("PUT /api/traffic", handlers.UpdateTraffic(traffics))

	m.HandleFunc("POST /api/admin", handlers.Login(admins))
	m.HandleFunc("POST /api/admin/register", handlers.Register(admins))

	return middleware.Recover(middleware.CORS(m))
}

// Handler is the Vercel Go runtime entry point for every request under /api/*
// (see the root vercel.json rewrite).
func Handler(w http.ResponseWriter, r *http.Request) {
	muxOnce.Do(func() {
		mux = buildMux()
	})
	mux.ServeHTTP(w, r)
}
