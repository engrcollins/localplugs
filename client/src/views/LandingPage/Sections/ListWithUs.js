import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

import styles from "assets/jss/material-kit-react/views/landingPageSections/teamStyle.js";

import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Button,
} from "@material-ui/core";

const useStyles = makeStyles(styles);

export default function ListWithUs() {
  const classes = useStyles();
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRounded,
    classes.imgFluid
  );
  return (
    <div className={classes.section}>
      <h2 className={classes.title}>List With Us For Free</h2>
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={6}>
            <div className={classes.profile}>
              <img
                src='https://jennifergriesbach.com/wp-content/uploads/2019/07/photo-1531206715517-5c0ba140b2b8.jpg'
                className={imageClasses}
              />
            </div>
          </GridItem>
          <Divider orientation='vertical' flexItem />
          <GridItem xs={12} sm={12} md={4}>
            <p className={classes.title}>
              <List component='nav'>
                <ListItem>
                  <ListItemText primary='Strengthen Your Business Reputation' />
                </ListItem>
                <ListItem>
                  <ListItemText primary='Increase Your Brand Awareness' />
                </ListItem>
                <ListItem>
                  <ListItemText primary='Amplify Your online Presence' />
                </ListItem>
                <ListItem>
                  <ListItemText primary='Improve Your Visibility' />
                </ListItem>
              </List>
            </p>
            <Button variant='outlined' color='primary'>
              Get Started
            </Button>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
