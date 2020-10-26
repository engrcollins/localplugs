import { REGISTER_BUSINESS } from "../actions/types";
import { GET_BUSINESS_PROFILE } from "../actions/types";
import {
  REGISTER_BUSINESS_FAIL,
  BUSINESS_PROFILE_ERROR,
  GET_BUSINESS_CATEGORIES,
  GET_BUSINESS_CATEGORIES_ERROR,
  GET_BUSINESS_SERVICES,
  GET_BUSINESS_SERVICES_ERROR,
} from "../actions/types";

const initialState = {
  businessProfile: null,
  loading: true,
  error: {},
  register_done: true,
  businessCategories: null,
  businessServices: null,
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_BUSINESS_PROFILE:
      return {
        ...state,
        loading: false,
        businessProfile: payload,
      };
    case REGISTER_BUSINESS:
      return {
        ...state,
        loading: false,
        register_done: false,
        businessProfile: payload,
      };

    case GET_BUSINESS_CATEGORIES:
      return {
        ...state,
        loading: false,
        businessCategories: payload,
      };

    case GET_BUSINESS_SERVICES:
      return {
        ...state,
        loading: false,
        businessServices: payload,
      };

    case REGISTER_BUSINESS_FAIL:
    case BUSINESS_PROFILE_ERROR:
    case GET_BUSINESS_CATEGORIES_ERROR:
    case GET_BUSINESS_SERVICES_ERROR:
      return {
        ...state,
        loading: true,
        businessProfile: null,
      };

    default:
      return state;
  }
};
