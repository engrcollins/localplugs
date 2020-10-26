import { GET_PROFILE } from "actions/types";
import { PROFILE_ERROR } from "actions/types";
import { CLEAR_PROFILE } from "actions/types";
import { SET_PROFILE } from "actions/types";
import { SET_PROFILE_ERROR } from "actions/types";
import {
  SET_PROFILE_IMAGE_ERROR,
  GET_PROFILE_IMAGE_ERROR,
} from "actions/types";
import { SET_PROFILE_IMAGE, GET_PROFILE_IMAGE } from "actions/types";

const initialState = {
  profile: null,
  profiles: [],
  loading: true,
  error: {},
  profileImage: null,
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILE:
    case SET_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false,
      };
    case SET_PROFILE_IMAGE:
    case GET_PROFILE_IMAGE:
      return {
        ...state,
        profileImage: payload,
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case CLEAR_PROFILE:
    case SET_PROFILE_ERROR:
      return {
        ...state,
        profile: null,
        loading: false,
      };
    case SET_PROFILE_ERROR:
    case GET_PROFILE_IMAGE_ERROR:
      return {
        profileImage: null,
      };
    default:
      return state;
  }
}
