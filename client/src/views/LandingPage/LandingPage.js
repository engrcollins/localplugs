import React, { useEffect, useState, useRef, useCallback } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
// nodejs library that concatenates classes
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { searchProduct } from "../../actions/search";
import { setAlert } from "../../actions/alert";
import classNames from "classnames";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import LocationOnIcon from "@material-ui/icons/LocationOn";

// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import { TextField } from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import Button from "components/CustomButtons/Button.js";
import styles from "assets/jss/material-kit-react/views/landingPage.js";

// Sections for this page
import ProductSection from "./Sections/ProductSection.js";
import TeamSection from "./Sections/TeamSection.js";
import WorkSection from "./Sections/WorkSection.js";
import ListWithUs from "./Sections/ListWithUs.js";
import { get } from "request";

const dashboardRoutes = [];

const useStyles = makeStyles(styles);

function LandingPage(props) {
  const classes = useStyles();
  const { ...rest } = props;
  const [address, setAddress] = useState("");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null)
    const [formData, setFormData] = useState({product: ""});

      const onChange = (e) =>
      setFormData({ ...formData, [e.target.name]: e.target.value });
  //You might want to do this in the action file... This is what will generate the Latitude and Longitude for us!
  const handleSelect = async (value) => {
    console.log(value);
    const results = await geocodeByAddress(value);
    const latlong = await getLatLng(results[0]);
    console.log(latlong);
    setAddress(value);
    setLatitude(latlong.lat);
    setLongitude(latlong.lng)
  };
  
  const {product} = formData;
  const onSubmit = async (e) => {
    e.preventDefault();
    props.searchProduct({latitude, longitude, product});
    console.log(`searching for:${product} ...close to: ${address}(${latitude}, ${longitude})`);
  };

  if (!props.loading) {
    return <Redirect to='/search-result' />;
  }

  return (
    <div>
      <Header
        color='transparent'
        routes={dashboardRoutes}
        brand='John Doe Application'
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 400,
          color: "white",
        }}
        {...rest}
      />
      <Parallax filter image={require("assets/img/header.jpg")}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
              <h1 className={classes.title}>
                Welcome to Naija's First location-based business directory
              </h1>
              <h4>No Limits!</h4>
              <br />
            </GridItem>

            <GridItem xs={12} sm={12} md={6}>
            <form className={classes.form} onSubmit={(e) => onSubmit(e)}>
                <CustomInput
                  labelText='Type a product or service to begin search'
                  id='product'
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    type: "text",
                    name: "product",
                    value: product,
                    onChange: (e) => onChange(e),
                  }}
                />
                <PlacesAutocomplete
                  value={address}
                  onChange={setAddress}
                  onSelect={handleSelect}>
                  {({
                    getInputProps,
                    suggestions,
                    getSuggestionItemProps,
                    loading,
                  }) => (
                    <div>
                      <TextField
                        id='location'
                        fullWidth
                        placeholder='Type your address'
                        margin='normal'
                        InputLabelProps={{
                          shrink: true,
                          style: { color: "ffffff" },
                        }}
                        InputProps={{
                          style: {
                            color: "#ffffff",
                          },
                        }}
                        {...getInputProps({ placeholder: "Type your address" })}
                      />
                      <CustomInput
                        labelText='Search Radius'
                        id='name'
                        type='number'
                        formControlProps={{
                          fullWidth: true,
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
                <Button className={classes.button} simple color='primary' size='lg' type='submit'>
                      Search
                    </Button>
              </form>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <ProductSection />
          <ListWithUs />
          <TeamSection />
          <WorkSection />
        </div>
      </div>
      <Footer />
    </div>
  );
}

LandingPage.propTypes = {
  searchProduct: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  loading: state.search.loading,
});
export default connect( 
  mapStateToProps,
  { searchProduct, setAlert }
)(LandingPage);