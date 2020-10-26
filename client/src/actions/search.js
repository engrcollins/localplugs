import axios from "axios";
import { setAlert } from "./alert";
import {
  SET_PRODUCT,
  SET_PRODUCT_FAIL,
  GET_BUSINESS_PROFILE,
  BUSINESS_PROFILE_ERROR,
} from "./types";

//Search products from db
export const searchProduct = ({
    latitude,
    longitude,
    product,
  }) => async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };  
    const body = JSON.stringify({ latitude, longitude, product, });
    try {
      console.log(latitude, longitude, product)
      const res = await axios.post("/api/business/search-data", body, config);
      dispatch({ type: SET_PRODUCT, payload: res.data });
      console.log(res.data);
      dispatch(setAlert("Product searched successfully", "success", 5000));
    } catch (error) {
      const errors = error.response.data.errors;
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger", 5000)));
      }
      console.error(error)
      dispatch({
        type: SET_PRODUCT_FAIL,
      });
    }
  };

  export const getBusinessDetails = (id) => async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };  
    const body = JSON.stringify({ id });
    console.log(id);
    try {
      const res = await axios.post("/api/business/view-business", body, config);
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
  