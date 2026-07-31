package models

import (
	"time"

	"go.mongodb.org/mongo-driver/v2/bson"
)

// ScheduleHall mirrors the halls sub-document embedded in a Schedule.
type ScheduleHall struct {
	Name         string   `bson:"name" json:"name"`
	ImgUrl       string   `bson:"imgUrl" json:"imgUrl"`
	ColourCode   string   `bson:"colourCode" json:"colourCode"`
	Score        *float64 `bson:"score,omitempty" json:"score,omitempty"`
	Abbreviation string   `bson:"abbreviation" json:"abbreviation"`
}

// Gender enum values allowed on a Schedule, mirroring the Mongoose schema enum.
var ValidGenders = map[string]bool{"Male": true, "Female": true, "Mixed": true}

// Stage enum values allowed on a Schedule, mirroring the Mongoose schema enum.
var ValidStages = map[string]bool{
	"Group A": true, "Group B": true, "Prelims": true,
	"Semi 1": true, "Semi 2": true, "Finals": true,
	"Carnival": true, "Playoffs": true,
}

type Schedule struct {
	ID        bson.ObjectID  `bson:"_id,omitempty" json:"_id,omitempty"`
	Sport     string         `bson:"sport" json:"sport"`
	Halls     []ScheduleHall `bson:"halls" json:"halls"`
	StartTime time.Time      `bson:"startTime" json:"startTime"`
	EndTime   time.Time      `bson:"endTime" json:"endTime"`
	Venue     string         `bson:"venue" json:"venue"`
	Gender    string         `bson:"gender" json:"gender"`
	Stage     string         `bson:"stage" json:"stage"`
}
