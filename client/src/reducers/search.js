import { GET_BUSINESS_PROFILE } from "actions/types";
import { PRODUCT_ERROR } from "actions/types";
import { CLEAR_PRODUCT } from "actions/types";
import { SET_PRODUCT } from "actions/types";
import { SET_PRODUCT_ERROR } from "actions/types";
import { BUSINESS_PROFILE_ERROR } from "actions/types";

  const initialState = {
    //product: null,
    products: null,
    loading: true,
    error: {},
  };

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_BUSINESS_PROFILE:
      return {
        ...state,
        businessProfile: payload,
        loading: false,
      };
    case SET_PRODUCT:
      return {
        ...state,
        products: payload,
        loading: false,
      };

      case PRODUCT_ERROR:
        return {
          ...state,
          error: payload,
          loading: false,
        };

      case CLEAR_PRODUCT:
      case SET_PRODUCT_ERROR:
        return {
          ...state,
          products: null,
          loading: false,
        };

      case BUSINESS_PROFILE_ERROR:
    default:
      return state;
  }
};
