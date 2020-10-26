import axios from "axios";

import {
  GET_PROFILE,
  PROFILE_ERROR,
  SET_PROFILE,
  SET_PROFILE_ERROR,
  SET_PROFILE_IMAGE,
  GET_PROFILE_IMAGE,
  SET_PROFILE_IMAGE_ERROR,
  GET_PROFILE_IMAGE_ERROR,
} from "./types";
import { setAlert } from "./alert";

//Set Profile Image

export const setProfileImage = (imgpath) => async (dispatch) => {
  const config = { headers: { "Content-Type": "application/json" } };
  const body = JSON.stringify({
    imgpath,
  });

  console.log(imgpath);

  try {
    const res = await axios.post("/api/profile/image", body, config);
    dispatch({ type: SET_PROFILE_IMAGE, payload: imgpath });
  } catch (err) {
    dispatch({
      type: SET_PROFILE_IMAGE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

//Get Current Profile Image
export const getProfileImage = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/profile/image/");
    dispatch({
      type: GET_PROFILE_IMAGE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_PROFILE_IMAGE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

//Get Current users Profile
export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/profile/me");
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

export const profileSet = ({
  state,
  phonenumber,
  country,
  bio,
  date_of_birth,
}) => async (dispatch) => {
  const config = { headers: { "Content-Type": "application/json" } };
  const body = JSON.stringify({
    state,
    phonenumber,
    country,
    bio,
    date_of_birth,
  });
  try {
    const res = axios.post("/api/profile", body, config);
    dispatch({ type: SET_PROFILE, payload: res.data });
    dispatch(setAlert("Profile Setup Successful", "success", 5000));
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger", 5000)));
    }
    dispatch({
      type: SET_PROFILE_ERROR,
    });
  }
};
