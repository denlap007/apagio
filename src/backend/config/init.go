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
