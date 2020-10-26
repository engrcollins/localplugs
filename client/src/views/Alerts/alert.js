import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

//Import Material Icons and Core
import SnackbarContent from "components/Snackbar/SnackbarContent.js";

const Alert = (props) =>
  props.alerts !== null &&
  props.alerts.length > 0 &&
  props.alerts.map((alert) => (
    <div key={alert.id} className={`alert alert-${alert.alertType}`}>
      <SnackbarContent
        message={
          <span>
            <b>{alert.msg}</b>
          </span>
        }
        close
        color={alert.alertType}
        icon='info_outline'></SnackbarContent>
    </div>
  ));

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});
export default connect(mapStateToProps)(Alert);
