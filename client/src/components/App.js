import React from "react";
import { Provider } from "react-redux";
import { Router, Route, Switch } from "react-router-dom";

import jwt_decode from "jwt-decode";
import setAuthToken from "../utils/setAuthToken";
import { setCurrentUser, logoutUser } from "../redux/actions/authActions";

import PrivateRoute from "../components/common/PrivateRoute";
import store from "../redux/store";
import history from "../history";

import Layout from "../components/layout/Layout";
import Landing from "../components/home/Landing";
import About from "../components/home/About";
import Course from "../components/home/Course";
import Profile from "../components/profile/Profile";
import Login from "../components/authentication/Login";
import Register from "../components/authentication/Register";

// Check For JWT Token
if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = "/login";
  }
}

const App = () => {
  return (
    <Provider store={store}>
      <div className="app">
        <Router history={history}>
          <React.Fragment>
            <Layout>
              <Switch>
                <Route path="/" exact component={Landing} />
                <Route path="/about" exact component={About} />
                <Route path="/course" exact component={Course} />
                <PrivateRoute path="/profile" exact component={Profile} />
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
