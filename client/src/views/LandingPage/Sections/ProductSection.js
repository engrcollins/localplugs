import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import Chat from "@material-ui/icons/Chat";
import VerifiedUser from "@material-ui/icons/VerifiedUser";
import Fingerprint from "@material-ui/icons/Fingerprint";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

import styles from "assets/jss/material-kit-react/views/landingPageSections/productStyle.js";
import {
  CardContent,
  CardMedia,
  Card,
  Typography,
  Divider,
} from "@material-ui/core";

const useStyles = makeStyles(styles);

export default function ProductSection() {
  const classes = useStyles();
  return (
    <div className={classes.section}>
      <GridContainer justify='center'>
        <GridItem xs={12} sm={12} md={8}>
          <h2 className={classes.title}>Today{"'"}s Popular Products</h2>
          <h5 className={classes.description}>
            This place will have small cards that will display the daily popular
            product.
          </h5>
        </GridItem>
      </GridContainer>
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={3}>
            <Card>
              <CardMedia
                component='img'
                alt='Product image'
                height='240'
                image='https://lh3.googleusercontent.com/DaeHJ1cE8YmvDBsBfBOxacn27nsLy35yHgxW41xMHbQbgmCrEd6GAMYWBY9ucReiZDyh6hHJOFQ6RDFx3ByAX0G40D56DDMsDzlZLQ=w262-l90-sg-rj'
                title='Product name'
              />
              <CardContent>
                <Typography gutterBottom variant='h5' component='h2'>
                  Product Demo 1
                </Typography>
                <Typography variant='body2' color='textSecondary' component='p'>
                  #234,000
                </Typography>
              </CardContent>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={3}>
            <Card>
              <CardMedia
                component='img'
                alt='Product image'
                height='240'
                image='https://www.sony.com/image/900a12699a1cee214f01139c98e08fce?fmt=pjpeg&resMode=bisharp&wid=354'
                title='Product name'
              />
              <CardContent>
                <Typography gutterBottom variant='h5' component='h2'>
                  Product Demo 1
                </Typography>
                <Typography variant='body2' color='textSecondary' component='p'>
                  #18,300
                </Typography>
              </CardContent>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={3}>
            <Card>
              <CardMedia
                component='img'
                alt='Product image'
                height='240'
                image='https://www.hypebeast.com/image/2009/07/huf-converse-product-red-skidgrip-1.jpg'
                title='Product name'
              />
              <CardContent>
                <Typography gutterBottom variant='h5' component='h2'>
                  Product Demo 1
                </Typography>
                <Typography variant='body2' color='textSecondary' component='p'>
                  #16,000
                </Typography>
              </CardContent>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={3}>
            <Card>
              <CardMedia
                component='img'
                alt='Product image'
                height='240'
                image='https://www.kikcorp.com/wp-content/uploads/2019/12/final_kik-scaled-1658x800.jpg'
                title='Product name'
              />
              <CardContent>
                <Typography gutterBottom variant='h5' component='h2'>
                  Product Demo 1
                </Typography>
                <Typography variant='body2' color='textSecondary' component='p'>
                  #34,200
                </Typography>
              </CardContent>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
