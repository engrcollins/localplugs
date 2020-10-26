import React from "react";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

export default function BusinessDataForm(props) {
  const { values, handleChange } = props;
  const goahead = (e) => {
    e.preventDefault();
    props.nextStep();
  };

  return (
    <div>
      <CustomInput
        labelText='Business Name'
        id='name'
        formControlProps={{
          fullWidth: true,
        }}
        inputProps={{
          type: "text",
          defaultValue: values.BusinessName,
          onChange: handleChange("BusinessName"),
        }}
      />
      <CustomInput
        labelText='Business Website'
        id='name'
        formControlProps={{
          fullWidth: true,
        }}
        inputProps={{
          type: "text",
          defaultValue: values.BusinessWebsite,
          onChange: handleChange("BusinessWebsite"),
        }}
      />
      <CustomInput
        labelText='Business Email'
        id='name'
        formControlProps={{
          fullWidth: true,
        }}
        inputProps={{
          type: "text",
          defaultValue: values.BusinessEmail,
          onChange: handleChange("BusinessEmail"),
        }}
      />
      <CustomInput
        labelText='Business Phone Number'
        id='name'
        formControlProps={{
          fullWidth: true,
        }}
        inputProps={{
          type: "text",
          defaultValue: values.BusinessPhoneNumber,
          onChange: handleChange("BusinessPhoneNumber"),
        }}
      />

      <Button color='info' size='lg' type='submit' onClick={goahead}>
        <ArrowForwardIosIcon />
        Continue
      </Button>
    </div>
  );
}
