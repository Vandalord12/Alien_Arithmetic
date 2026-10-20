"use strict";
//Imports
const express = require("express");
const route = express.Router();
const path = require("path");
const { userAuth } = require("../middleware/userAuth");
function jsonResponce(res, text, code, state = true) {
    //Sends a JSON responce to the client
    res.status(code).json({
        message: text,
        state: state,
    });
}
//Sets up an endpoint with the GET method on /home
route.get("/", userAuth, (auth, req, res, next) => {
    if (auth.role === "admin") {
        //If the user is an admin, go to the admin page
        res.sendFile(path.join(__dirname, "/html_pages/admin.html"));
    }
    else {
        res.sendFile(path.join(__dirname, "/html_pages/home.html"));
    }
});
module.exports = route;
