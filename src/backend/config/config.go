package config

import (
	"log"

	"github.com/spf13/viper"
)

var (
	// ServerPort port at which the server is listening
	ServerPort = "8080"
	// APIVersion the version of the server api
	APIVersion = "/api/v1.0"
)

func parseConfig() {
	log.Println("Initializing configuration")
	// viper.SetConfigName("config")

	// log.Println("Setting config file paths")
	// viper.AddConfigPath("")
	viper.AutomaticEnv()

	// TODO: enable when config from path will be added
	// err := viper.ReadInConfig()
	// if err != nil {
	// 	log.Println("No configuration file loaded: ", err)
	// }
	// viper.WatchConfig()
	// viper.OnConfigChange(func(e fsnotify.Event) {
	// 	log.Println("Configuration file updated: ", e.Name)
	// })
}
