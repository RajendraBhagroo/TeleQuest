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
import Profile from "../components/profile/Profile";
import Login from "../components/authentication/Login";
import Register from "../components/authentication/Register";
import ProfileUpdate from "../components/profile/ProfileUpdate";
import AddExperience from "../components/profile/AddExperience";
import AddEducation from "../components/profile/AddEducation";
import AddCourseTeaching from "../components/profile/AddCourseTeaching";
import AddCourseEnrolledIn from "../components/profile/AddCourseEnrolledIn";
import Stream from "../components/stream/Stream";
import ProfStream from "../components/stream/ProfStream";
import StudentStream from "../components/stream/StudentStream";

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
                <Route path="/" exact default component={Landing} />
                <Route path="/login" exact component={Login} />
                <Route path="/register" exact component={Register} />
                <PrivateRoute path="/profile" exact component={Profile} />
                <PrivateRoute
                  path="/profileUpdate"
                  exact
                  component={ProfileUpdate}
                />
                <PrivateRoute
                  path="/addExperience"
                  exact
                  component={AddExperience}
                />
                <PrivateRoute
                  path="/addEducation"
                  exact
                  component={AddEducation}
                />{" "}
                <PrivateRoute
                  path="/addCourseTeaching"
                  exact
                  component={AddCourseTeaching}
                />
                <PrivateRoute
                  path="/addCourseEnrolledIn"
                  exact
                  component={AddCourseEnrolledIn}
                />
                <PrivateRoute path="/streams" exact component={Stream} />
                <PrivateRoute path="/profStream" exact component={ProfStream} />
                <PrivateRoute path="/studentStream" exact component={StudentStream} />
              </Switch>
            </Layout>
          </React.Fragment>
        </Router>
      </div>
    </Provider>
  );
};

export default App;
