const express = require("express");
const bodyParser = require("body-parser");
const path = require("path")
const mysql = require("mysql");
const items = require("./routes/api/items");
const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const auth = require("./routes/api/auth");
const posts = require("./routes/api/posts");
const review = require("./routes/api/review");
const business = require("./routes/api/business");
//const cors = require("cors");

const app = express();

/*
var whitelist = ['http://localhost:3000', 'http://localhost:5000', 'http://desktop-hdv5l9a:3000', 'https://engrcollins.github.io', 'https://localplugs.netlify.app'];
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(cors(corsOptions));
*/
//BodyParser Middleware

app.use(express.json());
app.use(bodyParser.json());

app.use("/api/items", items);
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/auth", auth);
app.use("/api/posts", posts);
app.use("/api/review", review);
app.use("/api/business", business);

app.use(express.static( 'client/build' ));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html')); // relative path
});


const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));