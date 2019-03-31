import axios from "axios";
import server from "../../apis/server";
import history from "../../history";

import { GET_ERRORS } from "./types";


// Update Profile
export const updateProfile = profileInfo => dispatch => {
    axios
      .post(`${server}/api/v1/profile`, profileInfo)
      .then(res => history.push("/profile"))
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  };
