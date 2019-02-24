import React from "react";
import { Provider } from "react-redux";
import { Router, Route, Switch } from "react-router-dom";

import store from "../redux/store";
import history from "../history";

import Layout from "../components/layout/Layout";
import Landing from "./Landing";
import Login from "../components/authentication/Login";
import Register from "../components/authentication/Register";

const App = () => {
  return (
    <Provider store={store}>
      <div className="app">
        <Router history={history}>
          <React.Fragment>
            <Layout>
              <Switch>
                <Route path="/" exact component={Landing} />
                <Route path="/login" exact component={Login} />
                <Route path="/register" exact component={Register} />
              </Switch>
            </Layout>
          </React.Fragment>
        </Router>
      </div>
    </Provider>
  );
};

export default App;
