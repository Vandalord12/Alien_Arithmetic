"use strict";
//Imports
const express = require("express");
const route = express.Router();
const path = require("path");
const Score = require("../models/Scores");
const User = require("../models/Users");
const { userAuth } = require("../middleware/userAuth");
function jsonResponce(res, text, code, state = true) {
    //Sends a JSON responce to the client
    res.status(code).json({
        message: text,
        state: state,
    });
}
//Sets up an endpoint with the GET method on /pfp
route.get("/", userAuth, (auth, req, res, next) => {
    res.sendFile(path.join(__dirname, "/html_pages/pfp.html"));
});
//Sets up an endpoint with the GET method on /pfp/info
route.get("/info", userAuth, (auth, req, res, next) => {
    //The email is gotten from the return obj of the userAuth function
    let email = auth.email;
    User.findOne({ email: email })
        .exec()
        .then((userData) => {
        Score.findOne({ email: email })
            .exec()
            .then((scoreData) => {
            //Get the necessary data from the return data
            //from the database
            const { email, blog, firstname, lastname, password } = userData;
            const { typeBoth, typeMD, typeAS } = scoreData;
            res.json({
                email: email,
                firstname: firstname,
                lastname: lastname,
                password: password,
                blog: blog,
                typeAS: typeAS,
                typeMD: typeMD,
                typeBoth: typeBoth,
            });
        });
    });
});
//Sets up an endpoint with the PUT method on /pfp/change-password
route.put("/change-password", userAuth, (auth, req, res, next) => {
    //The email is gotten from the return obj of the userAuth function
    let email = auth.email;
    const { password } = req.body;
    //Updates the password for the given user
    User.findOneAndUpdate({ email: email }, { password: password }, { runValidators: true })
        .exec()
        .then(() => {
        res.json({
            //If the validation is a success, do the
            //send back a positive response
            message: "Password Changed",
            state: true,
        });
    })
        .catch((err) => {
        //If the validation is a failure, do the
        //send back a negative response with the error
        //message
        res.json({
            message: err.message,
            state: false,
        });
    });
});
//Sets up an endpoint with the PUT method on /pfp/save-blog
route.put("/save-blog", userAuth, (auth, req, res, next) => {
    //The email is gotten from the return obj of the userAuth function
    let email = auth.email;
    const { blog } = req.body;
    //Updates the password for the given user
    User.findOneAndUpdate({ email: email }, { blog: blog }, { runValidators: true })
        .exec()
        .then(() => {
        res.json({
            //If the validation is a success, do the
            //send back a positive response
            message: "Blog saved",
            state: true,
        });
    })
        .catch((err) => {
        //If the validation is a failure, do the
        //send back a negative response with the error
        //message
        res.json({
            message: err.message,
            state: false,
        });
    });
});
module.exports = route;
