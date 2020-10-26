import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getBusinessDetails} from "../../actions/search";
import { setAlert } from "../../actions/alert";
// import { getSearchResult } from '../../actions/search';
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import DirectionsBikeIcon from '@material-ui/icons/DirectionsBike';

// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import InputAdornment from "@material-ui/core/InputAdornment";
import GridItem from "components/Grid/GridItem.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";
import Spinner from "../spinner/Spinner";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Input from '@material-ui/core/Input';
import styles from "assets/jss/material-kit-react/views/landingPageSections/teamStyle.js";
import team1 from "assets/img/faces/avatar.jpg";

import {
  FormControl,
  InputLabel,
  MenuItem,
  Box,
  Select,
  FormHelperText,
} from "@material-ui/core";

const searchresultRoutes = [];
const defaultProps = {
  bgcolor: 'background.paper',
  borderColor: 'text.primary',
  m: -1,
  border: 2,
  style: { width: '99%', height: '99%' },
};
const useStyles = makeStyles(styles);

function SearchResult(props) {
  const {products, loading} = props;
  const [globalCat, setGlobalCat] = useState('');
  const [globalSorter, setGlobalSorter] = useState("");
  const [globalDist, setGlobalDist] = useState(50);
  const [genItems, setGenItems] = useState([]);
  const [catFiltered, setCatFiltered] = useState([]);
  const [displayItems, setDisplayItems] = useState([]);
  var copy = [];

  //Generate initial list with all business profiles
  const generateList = () => {
    if (products !== null){
      var fresh_categories = [];
      var fresh_items = [];
      for (var i = 0; i < products.length; i++) {
        fresh_items.push(products[i]);
      }
        setGenItems(fresh_items);
        setCatFiltered(fresh_items);
        setDisplayItems(fresh_items);
        setGlobalSorter("");
    }
  }
  useEffect(() => {
    generateList();
    }, []
  )

  //Set props to the clicked profile
  const setID = (selectedID) => {
      props.getBusinessDetails(selectedID);
  }

  //Filtering & Sorting
  const handleCatChange = (event) => {
    setGlobalSorter("");
    setGlobalDist(50);
    setGlobalCat(event.target.value);
    let newCat = event.target.value
   if (newCat == 10){
        generateList()
  }else {
      let new_items = [];
      new_items = genItems.filter(item =>
        item["BusinessCategoryID"] == newCat
      );
      setCatFiltered(new_items);
      setDisplayItems(new_items);
    }
  };

  const distFilter = (newDist) =>{
    if (typeof newDist == "number"){
      setGlobalSorter("");
      let new_items = [];
      new_items = catFiltered.filter(item =>{
        return item["Distance"] <= newDist
      });
      setDisplayItems(new_items);
    }
  }
  const handleSliderChange = (event, newValue) => {
    setGlobalDist(newValue);
    distFilter(Number(newValue));  
  };
  const handleDistanceChange = (event) => {
    setGlobalDist(event.target.value === '' ? '' : Number(event.target.value));
    distFilter(Number(event.target.value));
  };
  const handleBlur = () => {
    if (globalDist< 0) {
      setGlobalDist(0);
    } else if (globalDist > 50) {
      setGlobalDist(50);
    }
  };

  const sortBy = (event) => {
    let sorter = event.target.value;
    setGlobalSorter(event.target.value)
    if(sorter == "desc"){
     let new_items = [...displayItems];
      new_items.sort(function(a, b) {
        return b["Distance"] - a["Distance"];
      });
      setDisplayItems(new_items);
    }else{
      let new_items = [...displayItems];
      new_items.sort(function(a, b) {
        return a["Distance"] - b["Distance"];
      });
      setDisplayItems(new_items);
    }
  };
  const classes = useStyles();
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );

  //const navImageClasses = classNames(classes.imgRounded, classes.imgGallery);
  return loading && products === null ? ( 
    <Spinner />
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
        />
        <Parallax filter image={require("assets/img/landing-bg.jpg")} />
        <div className={classes.container}>
        <div className={classes.section}>
        <br />
        <h2 className={classes.title}>Search Result</h2>
        <h5>{displayItems.length} result(s) found</h5>
          <GridContainer>
          <GridItem xs={3} sm={3} md={2} lg={2}>
          <List>
            <ListItem className={classes.listItem}>
            <FormControl variant='outlined' style={{width:'170px'}}>
              <Select
                value={globalCat}
                onChange={handleCatChange}
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
              >
                <MenuItem value="" disabled style={{fontSize:'20px'}}>
                  Category
                </MenuItem>
                <MenuItem value="10" style={{fontSize:'16px'}}>
                  All categories
                </MenuItem>
                {products &&
                  products.map((displayItems, index) =>{
                    if (!copy.includes(displayItems.BusinessCategoryID)){
                      copy.push(displayItems.BusinessCategoryID)
                    return <MenuItem style={{fontSize:'16px'}} value={displayItems.BusinessCategoryID}>{displayItems.CategoryName}</MenuItem>
                    }
                  })
                }
              </Select>
            <FormHelperText>Filter Category</FormHelperText>
          </FormControl>
          </ListItem>
          <ListItem className={classes.listItem}>
          <FormControl variant='outlined' style={{width:'170px'}}>
            <ListItemText primary="Filter Distance(km)" secondary={
              <>
              <DirectionsBikeIcon style={{ display: "inline-block", marginBottom:"-5px", fontSize:"20px" }}/>
                <Slider
                    style={{width:"100px", margin:"2px"}}
                    value={typeof globalDist === 'number' ? globalDist : 0}
                    onChange={handleSliderChange}
                    aria-labelledby="input-slider"
                  />
                <Input
                    style={{width:"40px"}}
                    value={globalDist}
                    onChange={handleDistanceChange}
                    onBlur={handleBlur}
                    inputProps={{
                      step: 5,
                      min: 0,
                      max: 50,
                      type: 'number',
                      'aria-labelledby': 'input-slider',
                    }}
                  />
                  </>
              }
            />
            </FormControl>
          </ListItem>
          <ListItem className={classes.listItem}>
          <FormControl variant='outlined' style={{width:'170px'}}>
            <Select
              value={globalSorter}
              fullWidth
              name='0'
              onChange={sortBy}
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
            >
              <MenuItem value="" disabled>
                Sort by Distance
              </MenuItem>
              <MenuItem value='asc'>Near to Far</MenuItem>
              <MenuItem value='desc'>Far to Near</MenuItem>
            </Select>
            <FormHelperText>Sort Distance</FormHelperText>
          </FormControl>
        </ListItem>
        </List>
          </GridItem>
          <GridItem xs={9} sm={9} md={10} lg={10}>
            <GridContainer>        
            {displayItems &&
              displayItems.map((displayItems, index) => (
                <GridItem xs={12} sm={12} md={4} lg={4}>
                <Card plain >
                <Box borderRadius={22} {...defaultProps}>
                <br />
                  <GridItem xs={12} sm={12} md={6} lg={4} className={classes.itemGrid}>
                    <img src={team1} alt="..." className={imageClasses} />
                  </GridItem>
                    <h4 className={classes.cardTitle}>
                      <Link to={"/business-details"} onClick={(e) =>setID(displayItems.id) }>
                        {displayItems.BusinessName}
                      </Link>
                    <br />
                    <small className={classes.smallTitle}>{displayItems.BusinessLocation}</small>
                    <br />
                    <small className={classes.smallTitle}>{"We are just "+displayItems.Distance +"km from you!"}</small>
                  </h4>
                  <CardBody>
                    <h4 className={classes.description}>{displayItems.BusinessDesc}</h4>
                  </CardBody>
                  <CardFooter className={classes.justifyCenter}>
                    {<Button
                      justIcon
                      color="transparent"
                      className={classes.margin5}
                    >
                      {displayItems.BusinessPhoneNumber}
                    </Button>
                    }
                  </CardFooter>
                  </Box>
                </Card>
                </GridItem>
              ))}
              </GridContainer>
            </GridItem>
          </GridContainer>
      </div>
      </div>
      </div>
    );
  }

  SearchResult.propTypes = {
    getBusinessDetails: PropTypes.func.isRequired,
    setAlert: PropTypes.func.isRequired,
    loading: PropTypes.bool,
  };

 const mapStateToProps = (state) => ({
  products: state.search.products,
  loading: state.search.loading,
});

  export default connect(
    mapStateToProps,
    { getBusinessDetails, setAlert }
  )(SearchResult);