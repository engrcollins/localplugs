const express = require("express");
const path = require("path")
const router = express.Router();
const dbConn = require("../../models/dbConn.js");
const SqlString = require("sqlstring");
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const config = require("config");
const bcrypt = require("bcryptjs");

//@route GET api/items
//@desc GET Current Records from table -- Record Table
//@access Public
/*
router.use(function(req, res) {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});
*/

router.get("/", auth, async (req, res) => {
  try {
    find_sql = SqlString.format(
      "select user_info.first_name, user_info.last_name, user_info.email, user_info.gender, user_info.business_owner from user_info where id =?",
      [req.user.id]
    );
    const [result, fields] = await dbConn.query(find_sql);
    res.json(result[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

//@route POST api/auth
//@desc Authenticate User and Validate Token -- Login Form
//@access Public

router.post(
  "/",
  [
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    //const {firstname, lastname, email} = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      //See if User Exist
      var check_sql = SqlString.format(
        "select * from user_info where email =? ",
        [email]
      );

      const [result, fields] = await dbConn.query(check_sql);
      if (result[0].length < 1) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      const isMatch = await bcrypt.compare(password, result[0].password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      //Return jsonwebtoken
      const payload = {
        user: {
          id: result[0].id,
        },
      };
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
      //res.send("user Route");
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
