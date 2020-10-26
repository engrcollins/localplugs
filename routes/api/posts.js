const express = require("express");
const router = express.Router();
const dbConn = require("../../models/dbConn.js");
const SqlString = require("sqlstring");

//@route GET api/items
//@desc GET All Records from table
//@access Public

router.get("/", (req, res) => {
  dbConn.query("select * from user_info", (err, result) => {
    if (err) {
      return res.send(err);
    } else {
      return res.json({
        data: result,
      });
    }
  });
});

module.exports = router;
