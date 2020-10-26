const express = require("express");
const router = express.Router();
const dbConn = require("../../models/dbConn.js");
const SqlString = require("sqlstring");
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");

//@route GET api/review/:business_id
//@desc GET profile of a particular company
//@access Public

router.get("/business/:business_id", async (req, res) => {
  try {
    const sql = SqlString.format(
      "select ratings.rating_stars, ratings.comment, user_info.last_name, user_info.first_name from ratings, user_info where ratings.business_id=? and user_info.id = ?",
      [req.params.business_id, req.params.user_id]
    );
    const result = await dbConn.query(sql);

    if (result[0].length < 1) {
      return res.status(400).json({
        errors: [{ msg: "Business does not exist in our directory" }],
      });
    }

    res.json(result[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

module.exports = router;
