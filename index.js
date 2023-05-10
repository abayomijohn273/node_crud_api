const express = require("express");
const bodyparser = require("body-parser");
const sequelize = require("./util/database");
const User = require("./models/User");

const app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
    extended: false
}));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    next();
})

app.get("/", (req, res, next) => {
    res.send("Hello World");
})

app.use("/users", require("./routes/users"));

// error handling
app.use((error, req, res, next) => {
    console.log(error);

    const status = error.statusCode || 500;
    const message = error.message;
    res.status(status).json({
        message
    });
})