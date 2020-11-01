package config

import (
	"log"
	"os"
)

// initialize log output format
func init() {
	log.SetFlags(0)
	log.SetOutput(new(logWriter))
}

// parse and initialize config
func init() {
	Hostname, _ := os.Hostname()
	log.Println("Hostname is", Hostname)

	parseConfig()
}
