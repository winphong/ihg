package models

import (
	"time"

	"go.mongodb.org/mongo-driver/v2/bson"
)

type Traffic struct {
	ID         bson.ObjectID `bson:"_id,omitempty" json:"_id,omitempty"`
	Type       string        `bson:"type" json:"type"`
	Count      int           `bson:"count" json:"count"`
	AccessDate time.Time     `bson:"accessDate" json:"accessDate"`
}
