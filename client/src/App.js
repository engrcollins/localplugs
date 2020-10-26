import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import store from "./store";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";

// pages for this product
import Components from "views/Components/Components.js";
import LandingPage from "views/LandingPage/LandingPage.js";
import SearchResult from "views/SearchResult/SearchResult.js";
import BusinessSelect from "views/SearchResult/BusinessSelection.js";
import ProfilePage from "views/ProfilePage/ProfilePage.js";
import LoginPage from "views/LoginPage/LoginPage.js";
import RegisterPage from "views/RegisterPage/RegisterPage.js";
import Dashboard from "views/dashboard/Dashboard";
import CreateProfile from "views/profile-forms/CreateProfile";
import PrivateRoute from "views/routing/PrivateRoute";
import Business from "views/businessPage/Business";
import EditProfilePage from "views/ProfilePage/EditProfilePage";

import "assets/scss/material-kit-react.scss?v=1.8.0";
var hist = createBrowserHistory();

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router history={hist}>
        <Switch>
          {/* <Route path='/landing-page' component={LandingPage} /> */}
          <Route path='/profile-page' component={ProfilePage} />
          <Route path='/login-page' component={LoginPage} />
          <Route path='/register-page' component={RegisterPage} />
          <Route path='/search-result' component={SearchResult} />
          <Route path='/business-details' component={BusinessSelect} />
          <Route path='/all-component' component={Components} />
          <PrivateRoute path='/dashboard' component={Dashboard} />
          <PrivateRoute path='/create-profile' component={CreateProfile} />
          <PrivateRoute path='/business-page' component={Business} />
          <PrivateRoute path='/edit-profile' component={EditProfilePage} />
          <Route path='/' component={LandingPage} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
