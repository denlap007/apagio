// Copyright (C) 2021 The Apagio Authors
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

import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import FallbackLoader from "./components/FallbackLoader";
import Layout from "./layout/Layout";

export default function AppRouter() {
  return (
    <Router>
      <Route
        render={(props) => (
          <Layout route={props}>
            <Suspense fallback={<FallbackLoader />}>
              <Switch>
                <Route
                  exact
                  path="/"
                  component={lazy(() => import("./pages/TestPage"))}
                />
              </Switch>
            </Suspense>
          </Layout>
        )}
      />
    </Router>
  );
}
