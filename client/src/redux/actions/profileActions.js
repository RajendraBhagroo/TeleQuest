import axios from "axios";
import server from "../../apis/server";
import history from "../../history";

import { SET_CURRENT_USER, GET_ERRORS, GET_PROFILE } from "./types";

// Get Current Profile
export const getCurrentProfile = () => dispatch => {
  axios
    .get(`${server}/api/v1/profile`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: {}
      })
    );
};

// Get Profile By Handle
export const getProfileByHandle = handle => dispatch => {
  axios
    .get(`${server}/api/v1/profile/handle/${handle}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: null
      })
    );
};

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

// Add Experience
export const addExperience = experienceInfo => dispatch => {
  axios
    .post(`${server}/api/v1/profile/experience`, experienceInfo)
    .then(res => history.push("/profile"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Add Education
export const addEducation = educationInfo => dispatch => {
  axios
    .post(`${server}/api/v1/profile/education`, educationInfo)
    .then(res => history.push("/profile"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Add Course Enrolled In
// Add Course Teaching

// Delete Education
// Delete Experience
// Delete Course Enrolled In
// Delete Course Teaching

// Delete account & profile
export const deleteAccount = () => dispatch => {
  if (window.confirm("Are you sure? This can NOT be undone!")) {
    axios
      .delete(`${server}/api/v1/profile`)
      .then(res =>
        dispatch({
          type: SET_CURRENT_USER,
          payload: {}
        })
      )
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  }
};
