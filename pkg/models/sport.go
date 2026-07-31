package models

import "go.mongodb.org/mongo-driver/v2/bson"

type SportStanding struct {
	Hall     string `bson:"hall" json:"hall"`
	Point    int    `bson:"point" json:"point"`
	Position int    `bson:"position" json:"position"`
}

type Sport struct {
	ID          bson.ObjectID   `bson:"_id,omitempty" json:"_id,omitempty"`
	Name        string          `bson:"name" json:"name"`
	Description string          `bson:"description" json:"description"`
	ImgUrl      string          `bson:"imgUrl" json:"imgUrl"`
	Standings   []SportStanding `bson:"standings" json:"standings"`
}
