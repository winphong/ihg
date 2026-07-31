// Package db provides a process-wide Mongo client, reused across warm
// serverless invocations instead of reconnecting on every request.
package db

import (
	"context"
	"log"
	"os"
	"sync"

	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
	"go.mongodb.org/mongo-driver/v2/mongo/readpref"
)

var (
	client   *mongo.Client
	database *mongo.Database
	once     sync.Once
)

// Get returns the shared Mongo database handle, connecting lazily on first
// use and caching the client for the lifetime of the function instance.
func Get() *mongo.Database {
	once.Do(func() {
		uri := os.Getenv("DB_URL")
		if uri == "" {
			log.Fatal("DB_URL environment variable is not set")
		}

		// Pin the Stable API version, per MongoDB Atlas's recommended
		// connection setup - guarantees consistent server behavior across
		// MongoDB version upgrades regardless of driver version.
		serverAPI := options.ServerAPI(options.ServerAPIVersion1)
		opts := options.Client().ApplyURI(uri).SetServerAPIOptions(serverAPI)

		c, err := mongo.Connect(opts)
		if err != nil {
			log.Fatalf("unable to connect to database: %v", err)
		}
		if err := c.Ping(context.Background(), readpref.Primary()); err != nil {
			log.Fatalf("unable to ping database: %v", err)
		}

		dbName := os.Getenv("DB_NAME")
		if dbName == "" {
			dbName = "ihg"
		}

		client = c
		database = c.Database(dbName)
		log.Println("Connected to database...")
	})
	return database
}

func Halls() *mongo.Collection     { return Get().Collection("halls") }
func Schedules() *mongo.Collection { return Get().Collection("schedules") }
func Sports() *mongo.Collection    { return Get().Collection("sports") }
func Enquiries() *mongo.Collection { return Get().Collection("enquiries") }
func Traffics() *mongo.Collection  { return Get().Collection("traffics") }
func Admins() *mongo.Collection    { return Get().Collection("admins") }
