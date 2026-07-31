package models

import (
	"os"

	"github.com/golang-jwt/jwt/v5"
	"go.mongodb.org/mongo-driver/v2/bson"
)

type Admin struct {
	ID       bson.ObjectID `bson:"_id,omitempty" json:"_id,omitempty"`
	Username string        `bson:"username" json:"username"`
	Password string        `bson:"password" json:"password"`
}

// GenerateAuthToken mirrors Admin.generateAuthToken() in server/model/admin.js:
// an unsigned-expiry HS256 token containing only the username.
func (a Admin) GenerateAuthToken() (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"username": a.Username,
	})
	return token.SignedString([]byte(os.Getenv("PRIVATE_KEY")))
}

func ParseAuthToken(tokenString string) (jwt.MapClaims, error) {
	token, err := jwt.Parse(tokenString, func(t *jwt.Token) (interface{}, error) {
		return []byte(os.Getenv("PRIVATE_KEY")), nil
	}, jwt.WithValidMethods([]string{"HS256"}))
	if err != nil {
		return nil, err
	}
	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok || !token.Valid {
		return nil, jwt.ErrTokenInvalidClaims
	}
	return claims, nil
}
