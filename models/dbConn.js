const mysql = require("mysql2/promise");
//heroku addons:create cleardb:ignite --fork=mysql://user:password@myhostname.com/database
//mysql://b832419fca8817:cbb9807c@us-cdbr-east-02.cleardb.com/heroku_e2015944afc2866?reconnect=true

//heroku config:set DATABASE_URL='mysql://b832419fca8817:cbb9807c@us-cdbr-east-02.cleardb.com/heroku_e2015944afc2866?reconnect=true'

const connection = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "heroku_e2015944afc2866",
  waitForConnections: true,
  queueLimit: 0,
});

/*
const connection = mysql.createPool({
  host: "us-cdbr-east-02.cleardb.com",
  user: "b832419fca8817",
  password: "cbb9807c",
  database: "heroku_e2015944afc2866",
  waitForConnections: true,
  queueLimit: 0,
});
*/
module.exports = connection;
