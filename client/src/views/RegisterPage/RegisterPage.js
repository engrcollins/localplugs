import React, { useState } from "react";
import { connect } from "react-redux";
import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";
import { Redirect } from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import People from "@material-ui/icons/People";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";
// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import PropTypes from "prop-types";
import Alert from "views/Alerts/alert.js";

//Import backend apis

import styles from "assets/jss/material-kit-react/views/loginPage.js";

import image from "assets/img/bg7.jpg";

const useStyles = makeStyles(styles);

function RegisterPage(props) {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  const [selectedEnabled, setSelectedEnabled] = React.useState("b");
  const [formData, setFormData] = useState({
    lastname: "",
    firstname: "",
    email: "",
    password: "",
    gender: "",
  });

  const { lastname, firstname, email, password, gender } = formData;
  setTimeout(function() {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  const { ...rest } = props;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      props.setAlert("Password is less than six characters", "warning", 5000);
    } else {
      props.register({ firstname, lastname, email, password, gender });
    }

    console.log("Successfully Registered");
  };

  if (props.isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }
  return (
    <div>
      <Header
        absolute
        color='transparent'
        brand='John Doe Application'
        rightLinks={<HeaderLinks />}
        {...rest}
      />

      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url(" + image + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center",
        }}>
        <div className={classes.container}>
          <GridContainer justify='center'>
            <GridItem xs={12} sm={12} md={4}>
              <Card className={classes[cardAnimaton]}>
                <Alert />
                <form className={classes.form} onSubmit={(e) => onSubmit(e)}>
                  <CardHeader color='primary' className={classes.cardHeader}>
                    <h4>Register</h4>
                    <div className={classes.socialLine}>
                      <Button
                        justIcon
                        href='#pablo'
                        target='_blank'
                        color='transparent'
                        onClick={(e) => e.preventDefault()}>
                        <i className={"fab fa-twitter"} />
                      </Button>
                      <Button
                        justIcon
                        href='#pablo'
                        target='_blank'
                        color='transparent'
                        onClick={(e) => e.preventDefault()}>
                        <i className={"fab fa-facebook"} />
                      </Button>
                      <Button
                        justIcon
                        href='#pablo'
                        target='_blank'
                        color='transparent'
                        onClick={(e) => e.preventDefault()}>
                        <i className={"fab fa-google-plus-g"} />
                      </Button>
                    </div>
                  </CardHeader>
                  <p className={classes.divider}>Or Be Classical</p>
                  <CardBody>
                    <CustomInput
                      labelText='First Name...'
                      id='first'
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "text",
                        name: "firstname",
                        value: firstname,
                        onChange: (e) => onChange(e),
                        endAdornment: (
                          <InputAdornment position='end'>
                            <People className={classes.inputIconsColor} />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <CustomInput
                      labelText='Last Name...'
                      id='last'
                      value={lastname}
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "text",
                        name: "lastname",
                        value: lastname,
                        onChange: (e) => onChange(e),
                        endAdornment: (
                          <InputAdornment position='end'>
                            <People className={classes.inputIconsColor} />
                          </InputAdornment>
                        ),
                      }}
                    />

                    <CustomInput
                      labelText='Email...'
                      id='email'
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "email",
                        name: "email",
                        value: email,
                        onChange: (e) => onChange(e),
                        endAdornment: (
                          <InputAdornment position='end'>
                            <Email className={classes.inputIconsColor} />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <CustomInput
                      labelText='Password'
                      id='pass'
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "password",
                        name: "password",
                        value: password,
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
                    <div className={classes.title}>
                      <h4>Gender</h4>
                    </div>
                    <div
                      className={
                        classes.checkboxAndRadio +
                        " " +
                        classes.checkboxAndRadioHorizontal
                      }></div>
                    <FormControlLabel
                      control={
                        <Radio
                          checked={selectedEnabled === "male"}
                          onChange={() => setSelectedEnabled("male")}
                          value='Male'
                          name='radio button enabled'
                          aria-label='A'
                          icon={
                            <FiberManualRecord
                              className={classes.radioUnchecked}
                            />
                          }
                          checkedIcon={
                            <FiberManualRecord
                              className={classes.radioChecked}
                            />
                          }
                          classes={{
                            checked: classes.radio,
                            root: classes.radioRoot,
                          }}
                        />
                      }
                      classes={{
                        label: classes.label,
                        root: classes.labelRoot,
                      }}
                      label='Male'
                    />
                    <FormControlLabel
                      control={
                        <Radio
                          checked={selectedEnabled === "female"}
                          onChange={() => setSelectedEnabled("female")}
                          value='Female'
                          name='radio button enabled'
                          aria-label='A'
                          icon={
                            <FiberManualRecord
                              className={classes.radioUnchecked}
                            />
                          }
                          checkedIcon={
                            <FiberManualRecord
                              className={classes.radioChecked}
                            />
                          }
                          classes={{
                            checked: classes.radio,
                            root: classes.radioRoot,
                          }}
                        />
                      }
                      classes={{
                        label: classes.label,
                        root: classes.labelRoot,
                      }}
                      label='Female'
                    />
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <Button simple color='primary' size='lg' type='submit'>
                      Get started
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
        <Footer whiteFont />
      </div>
    </div>
  );
}

// class RegisterPage extends Component {
//   constructor(props) {
//     super(props);
//   }

//   render() {
//     return <Registerfunc />;
//   }
// }

RegisterPage.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(
  mapStateToProps,
  { setAlert, register }
)(RegisterPage);
