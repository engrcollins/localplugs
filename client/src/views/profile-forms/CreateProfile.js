import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setAlert } from "../../actions/alert";
import { profileSet } from "../../actions/profile";
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import styles from "assets/jss/material-kit-react/views/profilePage.js";
import Parallax from "components/Parallax/Parallax.js";
import { makeStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Alert from "views/Alerts/alert.js";
import Card from "components/Card/Card.js";
import Icon from "@material-ui/core/Icon";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import InputAdornment from "@material-ui/core/InputAdornment";
import Email from "@material-ui/icons/Email";
import People from "@material-ui/icons/People";
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";

const useStyles = makeStyles(styles);

const CreateProfile = (props) => {
  const classes = useStyles();
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  const { ...rest } = props;
  const [formData, setFormData] = useState({
    phonenumber: "",
    bio: "",
    state: "",
    country: "",
    date_of_birth: "",
  });

  const { phonenumber, bio, state, country, date_of_birth } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    props.profileSet({ state, phonenumber, country, bio, date_of_birth });
    console.log(formData);
    console.log("Successfully Registered");
  };

  return (
    <div>
      {" "}
      <Header
        absolute
        color='transparent'
        brand='John Doe Application'
        rightLinks={<HeaderLinks />}
        {...rest}
      />
      <Parallax small filter image={require("assets/img/profile-bg.jpg")} />
      <div className={classes.container}>
        <div>
          <GridContainer justify='center'>
            <GridItem xs={12} sm={12} md={6}>
              <Card
                className={classNames(
                  classes.main,
                  classes.mainRaised,
                  classes[cardAnimaton]
                )}>
                <Alert />
                <form className={classes.form} onSubmit={(e) => onSubmit(e)}>
                  <CardHeader color='primary' className={classes.cardHeader}>
                    <h4 justify='center'>Register</h4>
                  </CardHeader>

                  <CardBody>
                    <CustomInput
                      labelText='Biography...'
                      id='first'
                      multiline
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "text",
                        name: "bio",
                        value: bio,
                        onChange: (e) => onChange(e),
                        endAdornment: (
                          <InputAdornment position='end'>
                            <People className={classes.inputIconsColor} />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <CustomInput
                      labelText='Country...'
                      id='last'
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "text",
                        name: "country",
                        value: country,
                        onChange: (e) => onChange(e),
                        endAdornment: (
                          <InputAdornment position='end'>
                            <People className={classes.inputIconsColor} />
                          </InputAdornment>
                        ),
                      }}
                    />

                    <CustomInput
                      labelText='State...'
                      id='email'
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "text",
                        name: "state",
                        value: state,
                        onChange: (e) => onChange(e),
                        endAdornment: (
                          <InputAdornment position='end'>
                            <Email className={classes.inputIconsColor} />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <CustomInput
                      labelText='Date of Birth'
                      id='pass'
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "text",
                        name: "date_of_birth",
                        value: date_of_birth,
                        onChange: (e) => onChange(e),
                        endAdornment: (
                          <InputAdornment position='end'>
                            <Icon className={classes.inputIconsColor}>
                              lock_outline
                            </Icon>
                          </InputAdornment>
                        ),
                        autoComplete: "off",
                      }}
                    />
                    <CustomInput
                      labelText='Phone number (with Country Code)'
                      id='pass'
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "text",
                        name: "phonenumber",
                        value: phonenumber,
                        onChange: (e) => onChange(e),
                        endAdornment: (
                          <InputAdornment position='end'>
                            <Icon className={classes.inputIconsColor}>
                              lock_outline
                            </Icon>
                          </InputAdornment>
                        ),
                        autoComplete: "off",
                      }}
                    />
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <Button simple color='primary' size='lg' type='submit'>
                      Create Profile
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    </div>
  );
};

CreateProfile.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  setAlert: PropTypes.func.isRequired,
  profileSet: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(
  mapStateToProps,
  { setAlert, profileSet }
)(CreateProfile);
