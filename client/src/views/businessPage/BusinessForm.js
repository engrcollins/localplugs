import React, { useState, useEffect } from "react";

import BusinessDataForm from "./BusinessDataForm";
import BusinessLocationForm from "./BusinessLocationForm";
import BusinessDetailInfo from "./BusinessDetailInfo";
import Confirm from "./Confirm";
import Success from "./Success";
import {
  getBusinessProfile,
  getBusinessCategories,
} from "../../actions/business";

//Import Action stuffs
import { registerBusiness } from "../../actions/business";
import { connect } from "react-redux";
import PropTypes, { element } from "prop-types";

function BusinessForm({
  registerBusiness,
  getBusinessCategories,
  businessCategories,
}) {
  useEffect(() => {
    getBusinessCategories();
  }, [getBusinessCategories]);

  const [formData, setFormData] = useState({
    step: 1,
    BusinessName: "",
    BusinessDesc: "",
    BusinessConfirmed: 0,
    BusinessCity: "",
    BusinessState: "",
    BusinessLocation: "",
    BusinessWebsite: "",
    BusinessCategory: "",
    Country: "",
    BusinessEmail: "",
    BusinessPhoneNumber: "",
    productName: "",
    productImage: "",
    productDesc: "",
    serviceDirectoryID: [],
    BusinessCategoryName: "",
    serviceDirectoryNames: [],
  });

  const {
    step,
    BusinessName,
    BusinessDesc,
    BusinessConfirmed,
    BusinessCity,
    BusinessState,
    BusinessLocation,
    BusinessWebsite,
    BusinessCategory,
    BusinessEmail,
    BusinessPhoneNumber,
    Country,
    productName,
    productImage,
    productDesc,
    serviceDirectoryID,
    BusinessCategoryName,
    serviceDirectoryNames,
  } = formData;

  const values = {
    step,
    BusinessName,
    BusinessDesc,
    BusinessConfirmed,
    BusinessCity,
    BusinessState,
    BusinessCategory,
    BusinessLocation,
    BusinessWebsite,
    BusinessEmail,
    BusinessPhoneNumber,
    Country,
    productName,
    productImage,
    productDesc,
    serviceDirectoryID,
    BusinessCategoryName,
    serviceDirectoryNames,
  };

  //Proceed to Next Step
  const nextStep = () => {
    setFormData({ ...formData, step: step + 1 });
  };

  //Go back to Previous Step
  const prevStep = () => {
    setFormData({ ...formData, step: step - 1 });
  };

  //Check form value
  const processForm = () => {
    console.log(values);
  };

  //Handle fields Change

  const handleChange = (input) => (e) => {
    //console.log(input);
    setFormData({ ...formData, [input]: e.target.value });
    console.log(e.target);
  };

  const handleChangeTwo = (formName, value) => {
    console.log(value);
    if (formName == "BusinessCategory") {
      setFormData({
        ...formData,
        [formName]: value.id,
        BusinessCategoryName: value.CategoryName,
      });
      //setFormData({ ...formData, [BusinessCategoryName]: value.id });
    } else if (formName == "serviceDirectoryID") {
      console.log(value);
      const ids = value.map(function(element) {
        return element.id;
      });

      const vals = value.map(function(element) {
        return element.serviceName;
      });

      setFormData({
        ...formData,
        [formName]: ids,
        serviceDirectoryNames: vals,
      });
    } else if (formName === "BusinessLocation") {
      setFormData({
        ...formData,
        [formName]: value,
      });
    }
  };

  switch (step) {
    case 1:
      return (
        <BusinessDataForm
          nextStep={nextStep}
          handleChange={handleChange}
          values={values}
        />
      );
    case 2:
      return (
        <BusinessLocationForm
          nextStep={nextStep}
          prevStep={prevStep}
          handleChange={handleChange}
          values={values}
          handleChangeTwo={handleChangeTwo}
        />
      );
    case 3:
      return (
        <BusinessDetailInfo
          nextStep={nextStep}
          prevStep={prevStep}
          handleChange={handleChange}
          values={values}
          CategoriesData={businessCategories}
          handleChangeTwo={handleChangeTwo}
        />
      );
    case 4:
      return (
        <Confirm
          processForm={processForm}
          prevStep={prevStep}
          values={values}
        />
      );
    case 5:
      return <Success />;
    default:
      return <h1>confused</h1>;
  }
}

BusinessForm.propTypes = {
  auth: PropTypes.object.isRequired,
  registerBusiness: PropTypes.func.isRequired,
  businessCategories: PropTypes.array,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  businessCategories: state.business.businessCategories,
});

export default connect(
  mapStateToProps,
  { registerBusiness, getBusinessCategories }
)(BusinessForm);
