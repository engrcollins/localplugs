import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Button from "components/CustomButtons/Button.js";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

//Import Action stuffs
import { registerBusiness } from "../../actions/business";
import Alert from "views/Alerts/alert.js";
import { connect } from "react-redux";
import PropTypes from "prop-types";

function Confirm(props) {
  const { values } = props;

  const goahead = (e) => {
    e.preventDefault();
    props.nextStep();
  };

  const back = (e) => {
    e.preventDefault();
    props.prevStep();
  };

  const loopvalues = Object.keys(values).map((key) =>
    key != "serviceDirectoryID" && key != "BusinessCategory" ? (
      <ListItem key={key}>
        {key}: <ListItemText primary={values[key]} />
      </ListItem>
    ) : (
      ""
    )
  );

  //Process Form
  const processForm = (e) => {
    e.preventDefault();

    props.processForm();
    props.registerBusiness(values);
  };

  return (
    <div>
      <Alert />
      <List>{loopvalues}</List>

      <Button color='warning' size='lg' type='submit' onClick={back}>
        <ArrowBackIosIcon />
        Go Back
      </Button>
      <Button color='info' size='lg' type='submit' onClick={processForm}>
        <ArrowForwardIosIcon />
        Continue
      </Button>
    </div>
  );
}

Confirm.propTypes = {
  auth: PropTypes.object.isRequired,
  registerBusiness: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(
  mapStateToProps,
  { registerBusiness }
)(Confirm);
