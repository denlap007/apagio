// Copyright (C) 2020 The Apagio Authors
//
// This file is part of apagio.
//
// apagio is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// apagio is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with apagio.  If not, see <http://www.gnu.org/licenses/>.

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
	// StaticDir path to server assets from
	StaticDir = "./public"
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
