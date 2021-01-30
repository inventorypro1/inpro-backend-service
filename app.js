const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const users = require("./routes/users");
const health = require('./routes/health');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose.connect(db,{ useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB successfully connected"))
    .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);

app.use("/api/users", users);
app.use('/', health);

app.use((err, req, res, next) => {

    if (err.statusCode) {
        res.statusCode = err.statusCode;
        res.json({
            message: err.message
        });
    } else {
        next(err);
    }
})

module.exports = app;