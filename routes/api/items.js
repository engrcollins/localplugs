const express = require('express');
const router =  express.Router();
const dbConn = require('../../models/dbConn.js');
const SqlString = require('sqlstring');

//@route GET api/items
//@desc GET All Records from table
//@access Public

router.get('/', (req, res) => {
    dbConn.query("select * from user_info", (err,result) => {
        if(err){
            return res.send(err);
        }
        else{
            return res.json({
                data: result
            })
        }
    })
});

//@route POST api/items
//@desc POST Record table
//@access Public

router.post('/', (req, res) => {
    //const {firstname, lastname, email} = req.body;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;
    console.log(firstname);
    var dataload = {first_name: firstname, last_name: lastname, email: email};
    var sql = SqlString.format('insert into user_info set ?', dataload);
    console.log(req);
    dbConn.query(sql, (err,result) => {
        if(err){
            return res.send(err);
        }
        else{
            return res.json({
                data: result
            })
        }
    })
});

module.exports = router;