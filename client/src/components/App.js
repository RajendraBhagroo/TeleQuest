import React from "react";
import { Provider } from "react-redux";
import { Router, Route, Switch } from "react-router-dom";

import store from "../redux/store";
import history from "../history";

import Layout from "../components/layout/Layout";
import Landing from "../components/home/Landing";
import About from "../components/home/About";
import Course from "../components/home/Course";
import Mypage from "../components/home/Mypage";
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
                <Route path="/about" exact component={About} />
                <Route path="/course" exact component={Course} />
                <Route path="/mypage" exact component={Mypage} />
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
