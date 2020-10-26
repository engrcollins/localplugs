import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  getBusinessCategories,
  getBusinessServices,
} from "../../actions/business";
import Button from "components/CustomButtons/Button.js";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

function BusinessDetailInfo(props) {
  const {
    values,
    handleChange,
    businessCategories,
    businessServices,
    handleChangeTwo,
    getBusinessServices,
  } = props;
  const goahead = (e) => {
    e.preventDefault();
    props.nextStep();
  };

  const back = (e) => {
    e.preventDefault();
    props.prevStep();
  };

  return (
    <div>
      <Autocomplete
        id='tags-standard'
        options={businessCategories !== null ? businessCategories : []}
        onChange={(event, newValue) => {
          if (newValue !== null) {
            console.log(newValue.id);
            getBusinessServices(newValue.id);
            handleChangeTwo("BusinessCategory", newValue);
          }
        }}
        getOptionLabel={(option) => option.CategoryName}
        renderInput={(params) => (
          <TextField
            {...params}
            variant='outlined'
            label='Business Category.'
            placeholder='Start Typing'
          />
        )}
      />
      <TextField
        label='Business Description'
        id='BusinessDesc'
        variant='outlined'
        multiline
        onChange={handleChange("BusinessDesc")}
        placeholder='Business Description'
        rowsMax={4}
        fullWidth
        margin='normal'
        InputLabelProps={{
          shrink: true,
        }}
      />

      <Autocomplete
        id='tags-standard'
        multiple
        options={businessServices !== null ? businessServices : []}
        onChange={(event, newValue) => {
          console.log(newValue);
          if (newValue !== null) {
            console.log(newValue);
            handleChangeTwo("serviceDirectoryID", newValue);
          }
        }}
        getOptionLabel={(option) => option.serviceName}
        renderInput={(params) => (
          <TextField
            {...params}
            variant='outlined'
            label='Services Offered'
            placeholder='Start Typing'
          />
        )}
      />
      <Button color='warning' size='lg' type='submit' onClick={back}>
        <ArrowBackIosIcon />
        Go Back
      </Button>
      <Button color='info' size='lg' type='submit' onClick={goahead}>
        <ArrowForwardIosIcon />
        Continue
      </Button>
    </div>
  );
}

BusinessDetailInfo.propTypes = {
  getBusinessCategories: PropTypes.func.isRequired,
  business: PropTypes.object.isRequired,
  businessCategories: PropTypes.array,
  getBusinessServices: PropTypes.func.isRequired,
  businessServices: PropTypes.array,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  business: state.business,
  businessCategories: state.business.businessCategories,
  businessServices: state.business.businessServices,
});

export default connect(
  mapStateToProps,
  { getBusinessCategories, getBusinessServices }
)(BusinessDetailInfo);
