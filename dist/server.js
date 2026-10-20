"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//Packages are imported here
const express = require("express");
const path = require("path");
//Imports the module from db.js
const connectDB = require("./db");
const Mongoose = require("mongoose");
//Package to allow cookies to be read
const cookieParser = require("cookie-parser");
//Imports the models
const User = require("./api/models/Users");
const Score = require("./api/models/Scores");
//Connects to the databse
connectDB;
//Creates a express driven server
const app = express();
const Port = 3000;
//the server is no hosted locally on the port 3000
app.listen(Port, () => {
    console.log("Server listening on port", Port);
});
//Sets up static files
app.use(express.static(path.join(__dirname, "/public")));
//allows for info transfer between other websites and this api
const cors = require("cors");
app.use(cors({
    origin: "*",
    credentials: true,
}));
//importing a helpful debug libary
const morgan = require("morgan");
app.use(morgan("dev"));
//This converts JSON in the request body into readable JavaScript
app.use(express.json({ extended: false }));
app.use(cookieParser());
//this gives me the access to the code in the routes
const registerPage = require("./api/routes/register");
const gamesPage = require("./api/routes/games");
const profilePage = require("./api/routes/pfp");
const homePage = require("./api/routes/home");
const statsPage = require("./api/routes/stats");
const loginPage = require("./api/routes/login");
const adminPage = require("./api/routes/admin");
//this sends the argument "/smth" to the paticular route's file
app.use("/register", registerPage);
app.use("/login", loginPage);
app.use("/games", gamesPage);
app.use("/pfp", profilePage);
app.use("/home", homePage);
app.use("/stats", statsPage);
app.use("/admin", adminPage);
//if no page is found then an error is thrown in the json
//format saying "Page not found"
app.use((req, res, next) => {
    const error = new Error("Page not found");
    error.status = 404;
    //this next function says the next function must be called which is the other error handler
    next(error);
});
//if there is an error that is from anywhere in the code it will be caught here and
//returned in json format
const errorHandler = ((error, req, res, next) => {
    console.log(error.message);
    res.status(error.status || 500);
    res.json({
        message: error.message,
        state: false,
    });
});
app.use(errorHandler);
