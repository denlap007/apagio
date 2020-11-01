package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/denlap007/apagio/src/backend/config"
)

func handler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Hi there, I love %s!", r.URL.Path[1:])
}

func main() {
	log.Println("Server is running on port ", config.ServerPort)
	http.HandleFunc("/", handler)
	log.Println(http.ListenAndServe(":"+config.ServerPort, nil))
}
