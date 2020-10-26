/*eslint-disable*/
import React, { Fragment } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
// react components for routing our app without refresh
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";
import People from "@material-ui/icons/People";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PersonIcon from "@material-ui/icons/Person";

// @material-ui/icons
import { Apps, CloudDownload } from "@material-ui/icons";

// core components
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";
import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/material-kit-react/components/headerLinksStyle.js";

const useStyles = makeStyles(styles);

function HeaderLinks({ auth: { isAuthenticated, loading }, logout }) {
  const classes = useStyles();
  const authLinks = (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <Link to='/dashboard' color='transparent' className={classes.navLink}>
          <PersonIcon className={classes.icons} /> Dashboard
        </Link>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Link
          to='/business-page'
          color='transparent'
          className={classes.navLink}>
          <PersonIcon className={classes.icons} /> Business Profile
        </Link>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button
          href='#!'
          color='transparent'
          className={classes.navLink}
          onClick={logout}>
          <ExitToAppIcon className={classes.icons} /> Logout
        </Button>
      </ListItem>
    </List>
  );
  const guestLinks = (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <CustomDropdown
          noLiPadding
          buttonText='Components'
          buttonProps={{
            className: classes.navLink,
            color: "transparent",
          }}
          buttonIcon={Apps}
          dropdownList={[
            <Link to='/all-component' className={classes.dropdownLink}>
              All components
            </Link>,
            <a
              href='https://creativetimofficial.github.io/material-kit-react/#/documentation?ref=mkr-navbar'
              target='_blank'
              className={classes.dropdownLink}>
              Documentation
            </a>,
          ]}
        />
      </ListItem>
      <ListItem className={classes.listItem}>
        <Link to='/login-page' color='transparent' className={classes.navLink}>
          <LockOpenIcon className={classes.icons} /> Login
        </Link>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Tooltip
          title='Register Your Account'
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.tooltip }}>
          <Link
            to='/register-page'
            color='transparent'
            className={classes.navLink}>
            <PersonAddIcon className={classes.icons} /> Register
          </Link>
        </Tooltip>
      </ListItem>
    </List>
  );
  return (
    <>{!loading && <div>{isAuthenticated ? authLinks : guestLinks}</div>}</>
  );
}

HeaderLinks.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(
  mapStateToProps,
  { logout }
)(HeaderLinks);
