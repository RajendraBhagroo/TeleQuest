import axios from "axios";
import server from "../../apis/server";
import history from "../../history";

import {
  SET_CURRENT_USER,
  GET_ERRORS,
  GET_PROFILE,
  CLEAR_CURRENT_PROFILE,
  PROFILE_LOADING
} from "./types";

// Get Current Profile
export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
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
  dispatch(setProfileLoading());
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

// Clear profile
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};

// Profile loading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
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
export const addCourseEnrolledIn = courseEnrolledInInfo => dispatch => {
  axios
    .post(`${server}/api/v1/profile/courseEnrolledIn`, courseEnrolledInInfo)
    .then(res => history.push("/profile"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Add Course Teaching
export const addCourseTeaching = courseTeachingInfo => dispatch => {
  axios
    .post(`${server}/api/v1/profile/courseTeaching`, courseTeachingInfo)
    .then(res => history.push("/profile"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Delete Experience
export const deleteExperience = id => dispatch => {
  axios
    .delete(`${server}/api/v1/profile/experience/${id}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Delete Education
export const deleteEducation = id => dispatch => {
  axios
    .delete(`${server}/api/v1/profile/education/${id}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Delete Course Enrolled In
export const deleteCourseEnrolledIn = id => dispatch => {
  axios
    .delete(`${server}/api/v1/profile/courseEnrolledIn/${id}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Delete Course Teaching
export const deleteCourseTeaching = id => dispatch => {
  axios
    .delete(`${server}/api/v1/profile/courseTeaching/${id}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

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
