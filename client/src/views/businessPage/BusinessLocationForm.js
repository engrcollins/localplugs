import React, { useEffect, useState } from "react";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import unirest from "unirest";
import PlacesAutocomplete from "react-places-autocomplete";

import {
  FormControl,
  InputLabel,
  MenuItem,
  FormHelperText,
  Select,
  TextField,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(0),
    minWidth: 480,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function BusinessLocationForm(props) {
  const { values, handleChange, handleChangeTwo } = props;
  const [someFormVal, setSomeFormVal] = React.useState({
    country: "",
    busState: "",
    buscity: "",
    authKey: "",
  });
  const [demoVal, setdemoVal] = React.useState({
    statesArray: [],
    cityArray: [],
  });
  const { country, busState, buscity, authKey } = someFormVal;
  const { statesArray, cityArray } = demoVal;
  const classes = useStyles();
  const goahead = (e) => {
    e.preventDefault();
    props.nextStep();
  };

  useEffect(() => {
    getAuthkey();
  }, []);

  const back = (e) => {
    e.preventDefault();
    props.prevStep();
  };

  function getAuthkey() {
    var req = unirest(
      "GET",
      "https://www.universal-tutorial.com/api/getaccesstoken"
    )
      .headers({
        Accept: "application/json",
        "api-token":
          "8jmxJagnFrQijqA31KttUDZN0YJbQs8F7zljmphWTWmaFCBEeeypZ802viI-fXg1Soo",
        "user-email": "aanex2005@gmail.com",
      })
      .then((res) => {
        setSomeFormVal({
          ...someFormVal,
          authKey: res.body.auth_token,
        });
      });
  }

  function getStates(val) {
    if (authKey != "" || authKey !== null || authKey !== undefined) {
      var req = unirest(
        "GET",
        "https://www.universal-tutorial.com/api/states/" + val
      )
        .headers({
          Authorization: "Bearer " + authKey,
          Accept: "application/json",
        })
        .then((res) => {
          setdemoVal({ ...demoVal, statesArray: res.body });
        });
    }
  }

  function getCity(val) {
    if (authKey != "" || authKey !== null || authKey !== undefined) {
      var req = unirest(
        "GET",
        "https://www.universal-tutorial.com/api/cities/" + val
      )
        .headers({
          Authorization: "Bearer " + authKey,
          Accept: "application/json",
        })
        .then((res) => {
          setdemoVal({ ...demoVal, cityArray: res.body });
        });
    }
  }

  const handke = (event) => {
    //console.log(event.target.name);
    if (event.target.name == "country") {
      setSomeFormVal({
        ...someFormVal,
        [event.target.name]: event.target.value,
      });
      getStates(event.target.value);
    } else if (event.target.name == "busState") {
      setSomeFormVal({
        ...someFormVal,
        [event.target.name]: event.target.value,
      });
      getCity(event.target.value);
    } else {
      console.log("here");
      setSomeFormVal({
        ...someFormVal,
        [event.target.name]: event.target.value,
      });
    }
  };

  const handleState = (event) => {
    console.log(event.target.name);
    setSomeFormVal({
      ...someFormVal,
      [event.target.name]: event.target.value,
    });
  };

  const statevalue = statesArray.map((key) => (
    <MenuItem key={key.state_name} value={key.state_name}>
      {key.state_name}
    </MenuItem>
  ));

  const cityvalue = cityArray.map((key) => (
    <MenuItem key={key.city_name} value={key.city_name}>
      {key.city_name}
    </MenuItem>
  ));

  const [address, setAddress] = useState("");

  const handleSelect = async (value) => {
    setAddress(value);
    handleChangeTwo("BusinessLocation", value);
  };

  return (
    <div>
      <PlacesAutocomplete
        value={address}
        onChange={setAddress}
        onSelect={handleSelect}>
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <TextField
              label='Business Address'
              id='BusinessLocation'
              variant='outlined'
              multiline
              onChange={handleChange("BusinessLocation")}
              placeholder='Business Address'
              {...getInputProps({ placeholder: "Business Address" })}
              rowsMax={2}
              fullWidth
              margin='normal'
              InputLabelProps={{
                shrink: true,
              }}
            />
            <div>
              {loading ? <div> ...Loading </div> : null}
              {suggestions.map((suggestion) => {
                const className = suggestion.active
                  ? "suggestion-item--active"
                  : "suggestion-item";
                const style = suggestion.active
                  ? { cursor: "pointer" }
                  : { cursor: "pointer" };
                return (
                  <div
                    key={suggestion.id}
                    {...getSuggestionItemProps(suggestion, {
                      style,
                      className,
                    })}>
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>

      <FormControl variant='outlined' className={classes.formControl}>
        <InputLabel id='demo-simple-select-outlined-label'>Country</InputLabel>
        <Select
          labelId='demo-simple-select-outlined-label'
          id='demo-simple-select-outlined'
          value={country}
          fullWidth
          name='country'
          onChange={handleChange("Country")}
          onClick={handke}
          label='Country'>
          <MenuItem value='Nigeria'>Nigeria</MenuItem>
          <MenuItem value='Ghana'>Ghana</MenuItem>
          <MenuItem value='South Africa'>South Africa</MenuItem>
        </Select>
      </FormControl>
      <br />
      <br />
      <FormControl variant='outlined' className={classes.formControl}>
        <InputLabel id='busState'>State</InputLabel>
        <Select
          labelId='busState'
          id='busState'
          value={busState}
          fullWidth
          name='busState'
          onChange={handleChange("BusinessState")}
          onClick={handke}
          label='State'>
          {statevalue}
        </Select>
      </FormControl>
      <br />
      <br />
      <FormControl variant='outlined' className={classes.formControl}>
        <InputLabel id='buscity'>City</InputLabel>
        <Select
          labelId='buscity'
          id='buscity'
          value={buscity}
          fullWidth
          name='buscity'
          onChange={handleChange("BusinessCity")}
          onClick={handleState}
          label='City'>
          {cityvalue}
        </Select>
      </FormControl>
      <br />
      <br />
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
