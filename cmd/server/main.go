// Command server runs the Go API (api/index.go's Handler) as a plain local
// HTTP server for development - the same handler Vercel invokes in
// production, just without going through the Vercel CLI.
package main

import (
	"log"
	"net/http"
	"os"

	handler "ihg/api"
)

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "3900"
	}

	log.Printf("Go API listening on :%s", port)
	if err := http.ListenAndServe(":"+port, http.HandlerFunc(handler.Handler)); err != nil {
		log.Fatal(err)
	}
}
