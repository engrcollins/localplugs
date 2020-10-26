import React from "react";
import PropTypes from "prop-types";
import { getCurrentProfile } from "../../actions/profile";
import { connect } from "react-redux";
import useStyles from "@material-ui/core";

function EditProfilePage({ profile: { profile, loading } }) {
  return <div></div>;
}

EditProfilePage.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapPropsToState = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapPropsToState)(EditProfilePage);
