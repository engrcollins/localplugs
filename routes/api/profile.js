const express = require("express");
const router = express.Router();
const dbConn = require("../../models/dbConn.js");
const SqlString = require("sqlstring");
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");

//@route GET api/profile/me
//@desc GET logged user profile from table
//@access Private

router.get("/me", auth, async (req, res) => {
  try {
    const sql = SqlString.format("select * from profile where user_id=?", [
      req.user.id,
    ]);
    const [result, fields] = await dbConn.query(sql);
    console.log(sql, result)

    if (result[0].length < 1) {
      return res
        .status(400)
        .json({ errors: [{ msg: "No Profile for this user" }] });
    }

    res.json(result[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

//@route GET api/profile/image
//@desc GET user image from db
//@access Private

router.get("/image", auth, async (req, res) => {
  try {
    const sql = SqlString.format(
      "select img_path from profile_image where user_id=?",
      [req.user.id]
    );
    const [result, fields] = await dbConn.query(sql);

    if (result[0].length < 1) {
      return res
        .status(400)
        .json({ errors: [{ msg: "No Profile Image for this user" }] });
    }

    res.json(result[0].img_path);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

//@route POST api/profile/image
//@desc POST set image path into db
//@access Private

router.post("/image", auth, async (req, res) => {
  const { imgpath } = req.body;

  try {
    const sql = SqlString.format(
      "UPDATE profile_image set user_id = ?, img_path =? where user_id=?",
      [req.user.id, imgpath, req.user.id]
    );
    const [result, fields] = await dbConn.query(sql);
    res.send("Image Path Update Successfull");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

//@route Post api/profile
//@desc Create or update User Profile
//@access Private

router.post(
  "/",
  [
    auth,
    [
      check("state", "Your State is requred").not().isEmpty(),
      check("phonenumber", "Your Phone number is required").not().isEmpty(),
      check("country", "Please specify your country").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { state, phonenumber, country, bio, date_of_birth } = req.body;

      const sql = SqlString.format(
        "UPDATE profile set state = ?, country =?, phone_number=?, bio=?, dob=?,user_id=?  where user_id = ?",
        [
          state,
          country,
          phonenumber,
          bio,
          date_of_birth,
          req.user.id,
          req.user.id,
        ]
      );
      var dataload = {
        state: state,
        country: country,
        phone_number: phonenumber,
        bio: bio,
        dob: date_of_birth,
        user_id: req.user.id,
      };
      const result = await dbConn.query(sql);
      //Check if the profile already exist, else insert new profile
      if (result[0].affectedRows < 1) {
        const insert_sql = SqlString.format(
          "insert into profile set ?",
          dataload
        );
        const ins_result = await dbConn.query(insert_sql);
        return res.send(ins_result);
      } else {
        res.send(result);
      }

      res.send("Data Updated Successfully");
      console.log();
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

//@route GET api/profile/user/:user_id
//@desc Get User Profile by user ID
//@access Public

router.get("/user/:user_id", async (req, res) => {
  try {
    var sql = SqlString.format(
      "select profile.phone_number, profile.state, profile.country, profile.bio, profile.dob, user_info.email, user_info.last_name, user_info.first_name, user_info.gender from profile, user_info where profile.user_id=? and user_info.id=?",
      [req.params.user_id, req.params.user_id]
    );
    const [result, fields] = await dbConn.query(sql);

    if (result[0].length < 1) {
      return res.status(400).json({ msg: "There is no profile for this user" });
    }

    res.json(result[0]);
  } catch (err) {
    console.error(err.message);
    if (err.kind == "OnjectId") {
      return res.status(400).json({ msg: "There is no profile for this user" });
    }
    res.status(500).send("server error");
  }
});

module.exports = router;
