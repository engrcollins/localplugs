import axios from "axios";

import {
  GET_BUSINESS_PROFILE,
  REGISTER_BUSINESS,
  REGISTER_BUSINESS_FAIL,
  BUSINESS_PROFILE_ERROR,
  GET_BUSINESS_CATEGORIES,
  GET_BUSINESS_CATEGORIES_ERROR,
  GET_BUSINESS_SERVICES,
  GET_BUSINESS_SERVICES_ERROR,
} from "./types";

import { setAlert } from "./alert";

//Get Business Categories from database
export const getBusinessCategories = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/business/categories");
    dispatch({
      type: GET_BUSINESS_CATEGORIES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_BUSINESS_CATEGORIES_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

//Get Business Services from Database When Category is Set

export const getBusinessServices = (categoryid) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ categoryid });

  try {
    const res = await axios.post("/api/business/services", body, config);
    dispatch({
      type: GET_BUSINESS_SERVICES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_BUSINESS_SERVICES_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

//Get Business profile from database
export const getBusinessProfile = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/business/me");
    dispatch({
      type: GET_BUSINESS_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: BUSINESS_PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

//Register the business in the db
export const registerBusiness = ({
  BusinessName,
  BusinessDesc,
  BusinessConfirmed,
  BusinessCity,
  BusinessState,
  BusinessLocation,
  BusinessWebsite,
  BusinessCategory,
  BusinessEmail,
  BusinessPhoneNumber,
  Country,
  serviceDirectoryID,
}) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({
    BusinessName,
    BusinessDesc,
    BusinessConfirmed,
    BusinessCity,
    BusinessState,
    BusinessLocation,
    BusinessWebsite,
    BusinessCategory,
    BusinessEmail,
    BusinessPhoneNumber,
    Country,
    serviceDirectoryID,
  });

  try {
    const res = await axios.post("/api/business", body, config);
    dispatch({
      type: REGISTER_BUSINESS,
      payload: res.data,
    });
    dispatch(setAlert("Business Registration Successful", "success", 5000));
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger", 5000)));
    }
    dispatch({ type: REGISTER_BUSINESS_FAIL });
  }
};

//Confirm Business to show badges
export const confirmBusiness = () => async (dispatch) => {};
