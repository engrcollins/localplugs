import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  getCurrentProfile,
  setProfileImage,
  getProfileImage,
} from "../../actions/profile";
import PropTypes from "prop-types";
import Spinner from "../spinner/Spinner";
import ImageUploader from "react-images-upload";

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
} from "@material-ui/core";

// @material-ui/icons
import EditIcon from "@material-ui/icons/Edit";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";
import CameraEnhanceIcon from "@material-ui/icons/CameraEnhance";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import PersonPinIcon from "@material-ui/icons/PersonPin";
import DateRangeIcon from "@material-ui/icons/DateRange";
import CallIcon from "@material-ui/icons/Call";

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

function Dashboard({
  getCurrentProfile,
  setProfileImage,
  getProfileImage,
  auth: { user },
  profile: { profile, loading, profileImage },
}) {
  useEffect(() => {
    getCurrentProfile();
    getProfileImage();
  }, [getCurrentProfile]);

  const classes = useStyles();
  //const { ...rest } = props;
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );

  const [openDia, setOpen] = useState({
    editProf: false,
    editImage: false,
  });

  const [pictures, setPictures] = useState("");
  const [imageLoading, setImageLoading] = useState(false);

  const { editProf, editImage } = openDia;

  const [profileVal, setProfileVal] = useState({
    state: "",
    bio: "",
    dob: "",
    country: "",
    phone_number: "",
  });

  const { state, bio, dob, country, phone_number } = profileVal;

  const onDrop = async (picture) => {
    setPictures([...pictures, picture]);
    const data = new FormData();
    data.append("file", picture[0]);
    setImageLoading(true);
    data.append("upload_preset", "vconnect");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/aanexplus/image/upload",
      {
        method: "POST",
        body: data,
      }
    );

    const file = await res.json();
    if (file) {
      console.log(file.secure_url);
      setProfileImage(file.secure_url);
    }
    setImageLoading(false);
  };

  const handleClickOpen = (dialogVal) => {
    if (dialogVal == "editProf") {
      setOpen({ ...openDia, editProf: true });
    } else if (dialogVal == "editImage") {
      setOpen({ ...openDia, editImage: true });
    }
  };

  const handleClose = (name) => {
    if (name == "editProf") {
      setOpen({ ...openDia, editProf: false });
    } else if (name == "editImage") {
      setOpen({ ...openDia, editImage: false });
    }
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

      <Dialog
        open={editProf}
        onClose={() => handleClose("editProf")}
        aria-labelledby='form-dialog-title'>
        <DialogTitle id='form-dialog-title'>Edit Profile</DialogTitle>
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
            defaultValue={profile && profile.state}
            onChange={handleChange}
          />
          <TextField
            autoFocus
            margin='dense'
            id='country'
            name='country'
            label='Enter your country'
            fullWidth
            defaultValue={profile && profile.country}
            onChange={handleChange}
          />
          <TextField
            autoFocus
            margin='dense'
            id='phone_number'
            name='phone_number'
            label='Enter your Phone number'
            fullWidth
            defaultValue={profile && profile.phone_number}
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
            defaultValue={profile && profile.bio}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose("editProf")} color='danger'>
            Cancel
          </Button>
          <Button onClick={handleUpdateProfile} color='warning'>
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      {/* Pictures Setting Dialog */}
      <Dialog
        open={editImage}
        onClose={() => handleClose("editImage")}
        aria-labelledby='form-dialog-title'>
        <DialogTitle id='form-dialog-title'>Edit Profile Image</DialogTitle>
        <DialogContent>
          <DialogContentText>Change your Profile Image</DialogContentText>
          {imageLoading === false ? (
            <ImageUploader
              name='Profile Image'
              withIcon={true}
              onChange={onDrop}
              imgExtension={[".jpg", ".gif", ".png", ".gif", "jpeg"]}
              maxFileSize={5242880}
            />
          ) : (
            <h3>Image Uploading</h3>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose("editImage")} color='danger'>
            Cancel
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
      <Parallax small filter image={profile && profileImage} />
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div>
          {profile !== null ? (
            <>
              <div className={classes.container}>
                <GridContainer justify='center'>
                  <GridItem xs={12} sm={12} md={6}>
                    <div className={classes.profile}>
                      <div>
                        <img
                          src={profile && profileImage}
                          alt='...'
                          className={imageClasses}
                        />
                      </div>
                      <div className={classes.name}>
                        <h3 className={classes.title}>
                          {user && user.first_name} {user && user.last_name} (
                          {user && user.email})
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
                            profile && profile.state + " " + profile.country
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
                          secondary='Location'
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
                          primary={profile && profile.phone_number}
                          secondary='Location'
                        />
                      </ListItem>
                      <Divider variant='inset' component='li' />
                    </List>
                  </GridItem>

                  <GridItem xs={12} sm={12} md={4}>
                    <div className={classes.description}>
                      <h4>{profile.bio} </h4>
                    </div>
                  </GridItem>

                  <GridItem xs={12} sm={12} md={4}>
                    <List component='nav'>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar>
                            <EditIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <Button
                          variant='outlined'
                          color='primary'
                          onClick={() => handleClickOpen("editProf")}>
                          Edit Profile
                        </Button>
                      </ListItem>
                      <Divider variant='inset' component='li' />
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar>
                            <NotificationsActiveIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <Link to='#'>Notification Settings</Link>
                      </ListItem>
                      <Divider variant='inset' component='li' />
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar>
                            <VpnKeyIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <Link to='#'>Password Settings</Link>
                      </ListItem>
                      <Divider variant='inset' component='li' />
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar>
                            <CameraEnhanceIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <Button
                          variant='outlined'
                          color='primary'
                          onClick={() => handleClickOpen("editImage")}>
                          Photos Settings
                        </Button>
                      </ListItem>
                      <Divider variant='inset' component='li' />
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

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  setProfileImage: PropTypes.func.isRequired,
  getProfileImage: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, setProfileImage, getProfileImage }
)(Dashboard);
