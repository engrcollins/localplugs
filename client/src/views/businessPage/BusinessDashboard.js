import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getBusinessProfile } from "../../actions/business";
import PropTypes from "prop-types";
import Spinner from "../spinner/Spinner";

// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Chip,
} from "@material-ui/core";

// @material-ui/icons
import EditIcon from "@material-ui/icons/Edit";
import CameraEnhanceIcon from "@material-ui/icons/CameraEnhance";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import PersonPinIcon from "@material-ui/icons/PersonPin";
import DateRangeIcon from "@material-ui/icons/DateRange";
import CallIcon from "@material-ui/icons/Call";
import LanguageIcon from "@material-ui/icons/Language";
import CategoryIcon from "@material-ui/icons/Category";
import DescriptionIcon from "@material-ui/icons/Description";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";

// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import Button from "components/CustomButtons/Button.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";

import pff from "assets/img/faces/christian.jpg";
import styles from "assets/jss/material-kit-react/views/profilePage.js";
import {
  Divider,
  List,
  ListItemAvatar,
  ListItem,
  ListItemText,
  Avatar,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { SentimentSatisfied } from "@material-ui/icons";

const useStyles = makeStyles(styles);

function BusinessDashboard({
  auth: { user },
  business: { businessProfile, loading },
}) {
  const classes = useStyles();
  //const { ...rest } = props;
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );

  const profile = businessProfile !== null ? businessProfile[0] : [];

  const [open, setOpen] = useState(false);

  const [profileVal, setProfileVal] = useState({
    state: "",
    bio: "",
    dob: "",
    country: "",
    phone_number: "",
  });

  const { state, bio, dob, country, phone_number } = profileVal;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setProfileVal({ ...profileVal, [event.target.name]: event.target.value });
    //console.log(profileVal);
  };

  const setdefautlVal = (ere) => {
    setProfileVal({
      ...profileVal,
      state: profile.state,
      bio: profile.bio,
      country: profile.country,
      phone_number: profile.phone_number,
    });
  };

  const handleUpdateProfile = () => {
    if (state == "") {
      setProfileVal({ ...profileVal, state: profile.state });
    }
    if (country == "") {
      setProfileVal({ ...profileVal, country: profile.country });
    }
    if (bio == "") {
      setProfileVal({ ...profileVal, bio: profile.bio });
    }
    if (phone_number == "") {
      setProfileVal({ ...profileVal, phone_number: profile.phone_number });
    }
    if (dob == "") {
      setProfileVal({ ...profileVal, dob: profile.dob });
    }
    alert("123");
  };
  //const navImageClasses = classNames(classes.imgRounded, classes.imgGallery);
  return loading && profile === null ? (
    <Spinner />
  ) : (
    <div>
      {/* Edit Profile Dialog */}
      {console.log(profileVal)}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'>
        <DialogTitle id='form-dialog-title'>Edit Business Profile</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Edit your profile here by changing the form below or leave as is to
            cancel
          </DialogContentText>
          <TextField
            autoFocus
            margin='dense'
            id='state'
            name='state'
            label='Enter your State'
            fullWidth
            defaultValue={profile.state}
            onChange={handleChange}
          />
          <TextField
            autoFocus
            margin='dense'
            id='country'
            name='country'
            label='Enter your country'
            fullWidth
            defaultValue={profile.country}
            onChange={handleChange}
          />
          <TextField
            autoFocus
            margin='dense'
            id='phone_number'
            name='phone_number'
            label='Enter your Phone number'
            fullWidth
            defaultValue={profile.phone_number}
            onChange={handleChange}
          />

          <TextField
            autoFocus
            margin='dense'
            id='bio'
            name='bio'
            label='Enter your Biography'
            fullWidth
            multiline
            defaultValue={profile.bio}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='danger'>
            Cancel
          </Button>
          <Button onClick={handleUpdateProfile} color='warning'>
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      <Header
        color='transparent'
        brand='John Doe Application'
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 200,
          color: "white",
        }}
        //{...rest}
      />
      <Parallax small filter image={require("assets/img/profile-bg.jpg")} />
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div>
          {profile !== null ? (
            <>
              <div className={classes.container}>
                <GridContainer justify='center'>
                  <GridItem xs={12} sm={12} md={6}>
                    <div className={classes.profile}>
                      <div>
                        <img src={pff} alt='...' className={imageClasses} />
                      </div>
                      <div className={classes.name}>
                        <h3 className={classes.title}>
                          {profile && profile.BusinessName} (
                          {profile && profile.BusinessEmail})
                        </h3>

                        <h6>DESIGNER</h6>
                        <Button justIcon link className={classes.margin5}>
                          <i className={"fab fa-twitter"} />
                        </Button>
                        <Button justIcon link className={classes.margin5}>
                          <i className={"fab fa-instagram"} />
                        </Button>
                        <Button justIcon link className={classes.margin5}>
                          <i className={"fab fa-facebook"} />
                        </Button>
                      </div>
                    </div>
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={4}>
                    <List component='nav'>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar>
                            <PersonPinIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            profile &&
                            profile.BusinessLocation +
                              " " +
                              profile.BusinessCity +
                              " " +
                              profile.BusinessState +
                              "State " +
                              profile.Country
                          }
                          secondary='Location'
                        />
                      </ListItem>
                      <Divider variant='inset' component='li' />
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar>
                            <DateRangeIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={profile && profile.dob}
                          secondary='Date of Creation'
                        />
                      </ListItem>
                      <Divider variant='inset' component='li' />
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar>
                            <CallIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={profile && profile.BusinessPhoneNumber}
                          secondary='Cotact Number'
                        />
                      </ListItem>
                      <Divider variant='inset' component='li' />
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar>
                            <LanguageIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={profile && profile.BusinessWebsite}
                          secondary='Website'
                        />
                      </ListItem>
                      <Divider variant='inset' component='li' />
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar>
                            <EditIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <Button
                          variant='outlined'
                          color='primary'
                          onClick={handleClickOpen}>
                          Edit Business Profile
                        </Button>
                        {/* <Link to='/edit-profile'>Edit Profile</Link> */}
                      </ListItem>
                      <Divider variant='inset' component='li' />
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar>
                            <CameraEnhanceIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <Link to='#'>Business Logos</Link>
                      </ListItem>
                      <Divider variant='inset' component='li' />
                    </List>
                  </GridItem>

                  <GridItem xs={12} sm={12} md={8}>
                    <List component='nav'>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar>
                            <CategoryIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={profile && profile.CategoryName}
                          secondary='Business Category'
                        />
                      </ListItem>
                      <Divider variant='inset' component='li' />
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar>
                            <DescriptionIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={profile && profile.BusinessDesc}
                          secondary='Business Description'
                        />
                      </ListItem>
                      <Divider variant='inset' component='li' />
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar>
                            <LocalOfferIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText>
                          {businessProfile.map((key) => (
                            <div
                              key={key.serviceName}
                              style={{ margin: "5px" }}>
                              <Chip
                                clickable
                                color='primary'
                                label={key.serviceName}
                                margin-right='10px'
                              />
                            </div>
                          ))}
                        </ListItemText>
                      </ListItem>
                    </List>
                  </GridItem>
                </GridContainer>
              </div>
            </>
          ) : (
            <>
              <GridContainer justify='center'>
                <GridItem xs={12} sm={12} md={6}>
                  <div className={classes.profile}>
                    <div>
                      <img src={profile} alt='...' className={imageClasses} />
                    </div>
                    <div className={classes.name}>
                      <h3 className={classes.title}>
                        {user && user.first_name} {user && user.last_name}
                      </h3>

                      <h6>DESIGNER</h6>
                      <Button justIcon link className={classes.margin5}>
                        <i className={"fab fa-twitter"} />
                      </Button>
                      <Button justIcon link className={classes.margin5}>
                        <i className={"fab fa-instagram"} />
                      </Button>
                      <Button justIcon link className={classes.margin5}>
                        <i className={"fab fa-facebook"} />
                      </Button>
                    </div>
                    <p>You do not have a Profile, please add some info</p>
                    <Button
                      href='/create-profile'
                      color='transparent'
                      className={classes.navLink}>
                      <PersonAddIcon className={classes.icons} /> Create Profile
                    </Button>
                  </div>
                </GridItem>
              </GridContainer>
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

BusinessDashboard.propTypes = {
  business: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  business: state.business,
});

export default connect(
  mapStateToProps,
  { getBusinessProfile }
)(BusinessDashboard);
