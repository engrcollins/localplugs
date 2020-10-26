import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getBusinessProfile } from "../../actions/business";
import PropTypes from "prop-types";
import Spinner from "../spinner/Spinner";
import { setAlert } from "../../actions/alert";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import {
  TextField,
  Chip,
} from "@material-ui/core";

// @material-ui/icons
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
import profile from "reducers/profile";

const useStyles = makeStyles(styles);

function BusinessSelect(props) {
  const { businessProfile, loading } = props;
  const profile = businessProfile;
  console.log(profile)
  const classes = useStyles();
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
  return profile === undefined ? (
    <div>
      <Spinner />
    </div>
  ) : (
    <div>
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
      {console.log(profile && profile.BusinessName)}
        <div className={classes.container}>
              <GridContainer justify='center'>
                <GridItem xs={12} sm={12} md={6}>
                  <div className={classes.profile}>
                    <div>
                      <img src={pff} alt='...' className={imageClasses} />
                    </div>
                    <div className={classes.name}>
                      <h3 className={classes.title}>
                        {profile && profile.BusinessName } (
                          { profile && profile.BusinessEmail })
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
                          profile.BusinessLocation
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

                  </List>
                </GridItem>
              </GridContainer>
                      </div>
    </div>
    <Footer />
  </div>
  );
}

/*
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
)(BusinessDashboard);*/


BusinessSelect.propTypes = {
  //setAlert: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  businessProfile: state.search.businessProfile,
});

export default connect(
  mapStateToProps,
)(BusinessSelect);