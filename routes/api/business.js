const express = require("express");
const router = express.Router();
const dbConn = require("../../models/dbConn.js");
const SqlString = require("sqlstring");
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");
const gravatar = require("gravatar");
const NodeGeocoder = require("node-geocoder");

//Define basic parameters for geocoder
const options = {
  provider: "google",

  apiKey: "AIzaSyA0n0V1xJaUFP_FtKdtkAjaRSu5opvhCMI",
  formatter: null,
};

const geocoder = NodeGeocoder(options);

//@route GET api/business
//@desc GET  the Business Directory
//@access Private

router.get("/me", auth, async (req, res) => {
  try {
    var sql = SqlString.format(
      "SELECT services.id, business_data.*, serviceDirectory.serviceName, businessCategories.CategoryName FROM services,business_data,businessCategories, serviceDirectory WHERE business_data.user_id= ? AND services.businessID = business_data.id AND services.serviceDirectoryID = serviceDirectory.id AND business_data.BusinessCategoryID = businessCategories.id",
      [req.user.id]
    );
    const [result, fields] = await dbConn.query(sql);

    if (result[0].length < 1) {
      return res
        .status(400)
        .json({ errors: [{ msg: "No Business Profile for this user" }] });
    }

    res.json(result);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server errror");
  }
});

//@route GET api/business/categories
//@desc GET Retrieve All the Categories from Database
//@access Public

router.get("/categories", async (req, res) => {
  try {
    var sql = SqlString.format("Select * from businessCategories");
    const [result, fields] = await dbConn.query(sql);

    res.json(result);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//@route GET api/business/services
//@desc GET Retrieve All the services that match a category from Database
//@access Public

router.post("/services", async (req, res) => {
  const { categoryid } = req.body;
  console.log(categoryid);
  try {
    var sql = SqlString.format(
      "Select * from serviceDirectory where businessCategoriesID = ?",
      [categoryid]
    );
    const [result, fields] = await dbConn.query(sql);
    res.json(result);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//@route POST api/business
//@desc POST Register the Business into Directory
//@access Private

router.post(
  "/",
  [
    auth,
    [
      check("BusinessName", "Please Enter a Business Name").not().isEmpty(),
      check("BusinessCategory", "Please Select a Business Category")
        .not()
        .isEmpty(),
      check("BusinessDesc", "Please Describe your Business").not().isEmpty(),
      check("BusinessCity", "Please Specify your Business City")
        .not()
        .isEmpty(),
      check("BusinessState", "Please Specify your Business City")
        .not()
        .isEmpty(),
      check("BusinessLocation", "Please Specify your Business full Address")
        .not()
        .isEmpty(),
      check("Country", "Please Specify your Business Country").not().isEmpty(),
      check("BusinessEmail", "Please enter your business email")
        .not()
        .isEmpty(),
      check(
        "BusinessPhoneNumber",
        "Please specify your business contact number"
      )
        .not()
        .isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const {
        BusinessName,
        BusinessDesc,
        BusinessCategory,
        BusinessConfirmed,
        BusinessCity,
        BusinessState,
        BusinessLocation,
        BusinessWebsite,
        BusinessEmail,
        BusinessPhoneNumber,
        Country,
        serviceDirectoryID,
      } = req.body;

      var georesult = await geocoder.geocode(BusinessLocation);
      const latitude = georesult[0].latitude;
      const longitude = georesult[0].longitude;

      const update_sql = SqlString.format(
        "UPDATE business_data set user_id=?, BusinessName = ?, BusinessDesc = ?, BusinessCategoryID= ?, BusinessConfirmed = ?, BusinessCity = ?, BusinessState = ?, BusinessLocation = ?, BusinessWebsite = ?, BusinessEmail = ?, BusinessPhoneNumber=?, Country = ?, BusinessLatitude =?, BusinessLongitude=? where user_id=?",
        [
          req.user.id,
          BusinessName,
          BusinessDesc,
          BusinessCategory,
          BusinessConfirmed,
          BusinessCity,
          BusinessState,
          BusinessLocation,
          BusinessWebsite,
          BusinessEmail,
          BusinessPhoneNumber,
          Country,
          latitude,
          longitude,
          req.user.id,
        ]
      );

      var business_dataload = {
        user_id: req.user.id,
        BusinessName: BusinessName,
        BusinessDesc: BusinessDesc,
        BusinessCategoryID: BusinessCategory,
        BusinessConfirmed: BusinessConfirmed,
        BusinessCity: BusinessCity,
        BusinessState: BusinessState,
        BusinessLocation: BusinessLocation,
        BusinessWebsite: BusinessWebsite,
        BusinessEmail: BusinessEmail,
        BusinessPhoneNumber: BusinessPhoneNumber,
        Country: Country,
        BusinessLongitude: longitude,
        BusinessLatitude: latitude,
      };
      var [result, fields] = await dbConn.query(update_sql);

      console.log(result.affectedRows);

      //Check if the Business Info already Exist, if not Insert a new Business Model
      if (result.affectedRows < 1) {
        const insert_business_sql = SqlString.format(
          "insert into business_data set ?",
          business_dataload
        );
        var [result, fields] = await dbConn.query(insert_business_sql);
        var id = result.insertId;
      } else {
        checkIdSQL = SqlString.format(
          "select id from business_data where user_id=?",
          [req.user.id]
        );
        const [result_id, fi] = await dbConn.query(checkIdSQL);
        var id = result_id[0].id;
      }

      //Insert Data into the Product Table -- I am not sure this is necesstry
      // const avatar = gravatar.url(BusinessName, { s: "200", r: "pg", d: "mm" });
      // var sql = SqlString.format(
      //   "UPDATE product set businessDataID=?, productName = ?, productImage=?, productDesc = ?, productImageHeader=?",
      //   [id, productName, avatar, productDesc, avatar]
      // );
      // var [product_result, product_fi] = await dbConn.query(sql);

      // if (product_result.affectedRows < 1) {
      //   var dataload = {
      //     businessDataID: id,
      //     productName: productName,
      //     productImage: avatar,
      //     productDesc: productDesc,
      //     productImageHeader: avatar,
      //   };
      //   sql = SqlString.format("insert into product set ?", dataload);
      //   [product_result, product_fi] = await dbConn.query(sql);
      //   var product_id = product_result.insertId;
      // } else {
      //   sql = SqlString.format(
      //     "select id from product where businessDataID=?",
      //     [id]
      //   );
      //   const [product_id_r, fi_r] = await dbConn.query(sql);
      //   var product_id = product_id_r[0].id;
      // }

      //Insert Data into the Services Table
      serviceDirectoryID.forEach(async (element, index, array) => {
        var dataload = {
          user_id: req.user.id,
          businessID: id,
          serviceDirectoryID: element,
        };

        var sql = SqlString.format(
          "Update services set businessID = ?, serviceDirectoryID = ?, productID = ?, user_id=? where user_id=? and serviceDirectoryID=? and businessID=?",
          [id, element, null, req.user.id, req.user.id, element, id]
        );
        var [result, fields] = await dbConn.query(sql);
        if (result.affectedRows < 1) {
          var sql = SqlString.format("insert into services set ?", dataload);
          var [result, fields] = await dbConn.query(sql);
        }
      });

      //res.send("Success");
    } catch (err) {
      res.status(500).send("Server Error");
    }
  }
);

//distance calculator
const distCalc = (lat1, lon1, lat2, lon2) =>{
  if ((lat1 == lat2) && (lon1 == lon2)) {
    return 0;
  }
  else {
    var radlat1 = Math.PI * lat1/180;
    var radlat2 = Math.PI * lat2/180;
    var theta = lon1-lon2;
    var radtheta = Math.PI * theta/180;
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    dist = dist * 180/Math.PI;
    dist = dist * 60 * 1.1515;
    //if (unit=="K") { dist = dist * 1.609344 }
  //if (unit=="N") { dist = dist * 0.8684 }
  return dist * 1.609344;
  }
};
router.post('/search-data',
  async (req, res) => {
    console.log(typeof req.body); 
    const latitude = req.body.latitude;
    const longitude = req.body.longitude;
    let product = req.body.product;
  try{
    //search for input string and pull id to use in pulling all data
    console.log(product, latitude, longitude);
    product = product.split(" ", 1);
    console.log(product, latitude, longitude);
    find_sql = SqlString.format("SELECT id FROM serviceDirectory WHERE serviceName LIKE ?", [`%${product}%`]);
    const [serviceID, IDfields] = await dbConn.query(find_sql);
    console.log(serviceID);
    let allIDs = serviceID.map(({ id }) => id );

    //pull all data with resulting id(s)
    find_sql = SqlString.format(
      `SELECT services.id, business_data.*, serviceDirectory.serviceName, businessCategories.CategoryName FROM services,business_data,businessCategories, serviceDirectory WHERE serviceDirectory.id IN (${allIDs}) AND services.businessID = business_data.id AND services.serviceDirectoryID = serviceDirectory.id AND business_data.BusinessCategoryID = businessCategories.id`
    );
    const [result, fields] = await dbConn.query(find_sql);
    /*reserve = result.map(obj => ({id: obj.id, user_id: obj.user_id, BusinessName: obj.BusinessName, BusinessCategoryID: obj.BusinessCategoryID, BusinessDesc: obj.BusinessDesc})); */
    if (result.length < 1) {
      return res.status(400).json({ errors: [{ msg: "No Business Profile for this user" }] });
    }
      let new_items = [];
      new_items = result.filter(item =>{
        let distance = distCalc(latitude, longitude, item.BusinessLatitude, item.BusinessLongitude );
        console.log(distance +"km");
        if (distance <= 50){
          item.Distance = distance.toFixed(2);
          return item;
        }
      });
      console.log(new_items);
      filtered_result = new_items;
      res.json(filtered_result);
  }

  catch (err) {
    console.error(err.message);
    res.status(500).send("server errror");
  }
});

  router.post('/view-business', 
  async (req, res) => {
    const id = req.body.id;
  try{
    var sql = SqlString.format(
      "SELECT business_data.*, serviceDirectory.serviceName, businessCategories.CategoryName FROM services,business_data,businessCategories,serviceDirectory WHERE business_data.id= ? AND services.businessID = business_data.id AND services.serviceDirectoryID = serviceDirectory.id AND business_data.BusinessCategoryID = businessCategories.id GROUP BY business_data.id", [id]      
    );
    const [result, fields] = await dbConn.query(sql);

    if (result[0].length < 1) {
      return res
        .status(400)
        .json({ errors: [{ msg: "No Business Profile for this user" }] });
    }
    console.log(result);
    res.json(result[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server errror");
  }
});

module.exports = router;
