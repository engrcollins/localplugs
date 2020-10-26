import React, { useState, useEffect } from "react";
import { setAlert } from "../../actions/alert";
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import styles from "assets/jss/material-kit-react/views/profilePage.js";
import Parallax from "components/Parallax/Parallax.js";
import { makeStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import BusinessForm from "./BusinessForm";
import { connect } from "react-redux";
import { getBusinessProfile } from "../../actions/business";
import BusinessDashboard from "./BusinessDashboard";
import PropTypes from "prop-types";

const useStyles = makeStyles(styles);

function Business(props) {
  const classes = useStyles();
  const { getBusinessProfile, businessProfile, loading } = props;
  useEffect(() => {
    getBusinessProfile();
  }, [getBusinessProfile]);
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  const { ...rest } = props;
  return businessProfile === null ? (
    <div>
      {console.log(businessProfile && businessProfile[0])}
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
                <CardHeader color='primary' className={classes.cardHeader}>
                  <h4 justify='center'>Business Profile Missing</h4>
                </CardHeader>
                <CardBody>
                  <BusinessForm />
                </CardBody>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    </div>
  ) : (
    <>
      <BusinessDashboard />
    </>
  );
}

Business.propTypes = {
  getBusinessProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  businessProfile: state.business.businessProfile,
  loading: state.business.loading,
});

export default connect(
  mapStateToProps,
  { getBusinessProfile }
)(Business);
