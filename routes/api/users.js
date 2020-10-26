const express = require("express");
const router = express.Router();
const dbConn = require("../../models/dbConn.js");
const SqlString = require("sqlstring");
const { check, validationResult } = require("express-validator");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");

//@route POST api/items
//@desc POST Record table -- Registration Form
//@access Public

router.post(
  "/",
  [
    check("firstname", "First name is required").not().isEmpty(),
    check("lastname", "Last name is required").not().isEmpty(),
    check("email", "Please enter a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    //const {firstname, lastname, email} = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { firstname, lastname, email, password, gender } = req.body;

    try {
      //See if User Exist
      var check_sql = SqlString.format(
        "select id from user_info where email =?",
        [email]
      );

      const result = await dbConn.query(check_sql);
      if (result[0].length >= 1) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }

      const avatar = gravatar.url(email, { s: "200", r: "pg", d: "mm" });
      const salt = await bcrypt.genSalt(10);
      salt_password = await bcrypt.hash(password, salt);
      var dataload = {
        first_name: firstname,
        last_name: lastname,
        email: email,
        password: salt_password,
        gender: gender,
      };

      var sql = SqlString.format("insert into user_info set ?", dataload);

      const new_id = await dbConn.query(sql);

      const id = new_id[0].insertId;

      //Create default User Image
      var img_dataload = { user_id: id, img_path: avatar };

      var avatar_sql = SqlString.format(
        "insert into profile_image set ? ",
        img_dataload
      );
      const [results, fields] = await dbConn.query(avatar_sql);

      //Return jsonwebtoken
      const payload = {
        user: {
          id: id,
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
