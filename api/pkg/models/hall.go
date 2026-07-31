package models

import "go.mongodb.org/mongo-driver/v2/bson"

type Hall struct {
	ID           bson.ObjectID `bson:"_id,omitempty" json:"_id,omitempty"`
	Name         string        `bson:"name" json:"name"`
	Abbreviation string        `bson:"abbreviation" json:"abbreviation"`
	ImgUrl       string        `bson:"imgUrl" json:"imgUrl"`
	ColourCode   string        `bson:"colourCode" json:"colourCode"`
	MalePoint    float64       `bson:"malePoint" json:"malePoint"`
	FemalePoint  float64       `bson:"femalePoint" json:"femalePoint"`
	TotalPoint   float64       `bson:"totalPoint" json:"totalPoint"`
}

// HallStandingUpdate mirrors the fields the bulk PUT /api/hall endpoint accepts per hall.
type HallStandingUpdate struct {
	ID          bson.ObjectID `bson:"_id" json:"_id"`
	MalePoint   *float64      `bson:"malePoint,omitempty" json:"malePoint,omitempty"`
	FemalePoint *float64      `bson:"femalePoint,omitempty" json:"femalePoint,omitempty"`
	TotalPoint  *float64      `bson:"totalPoint,omitempty" json:"totalPoint,omitempty"`
}
