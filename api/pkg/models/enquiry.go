package models

import "go.mongodb.org/mongo-driver/v2/bson"

type Enquiry struct {
	ID      bson.ObjectID `bson:"_id,omitempty" json:"_id,omitempty"`
	Name    string        `bson:"name" json:"name"`
	Email   string        `bson:"email" json:"email"`
	Subject string        `bson:"subject" json:"subject"`
	Message string        `bson:"message" json:"message"`
}
