import axios from "axios";
import server from "../../apis/server";
import history from "../../history";

import { GET_ERRORS } from "./types";

// Register User
export const registerUser = userData => dispatch => {
  axios
    .post(`${server}/api/v1/users/register`, userData)
    .then(res => history.push("/login"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
