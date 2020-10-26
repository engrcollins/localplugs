import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import profile from "./profile";
import business from "./business";
import search from "./search";

export default combineReducers({
  alert,
  auth,
  profile,
  business,
  search
});
