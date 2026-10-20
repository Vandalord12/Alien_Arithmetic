"use strict";
//Imports
const express = require("express");
const route = express.Router();
const path = require("path");
const User = require("../models/Users");
const Score = require("../models/Scores");
const mongoose = require("mongoose");
//Code to allow users to become admins
const secretCode = "ZzaR0sHoVG";
function jsonResponce(res, text, code, state = true) {
    //Sends a JSON responce to the client
    res.status(code).json({
        message: text,
        state: state,
    });
}
//Sets up an endpoint with the GET method on /register
route.get("/", (req, res, next) => {
    res.sendFile(path.join(__dirname, "/html_pages/register.html"));
});
//Sets up an endpoint with the GET method on /register/basic
route.get("/basic", (req, res, next) => {
    res.sendFile(path.join(__dirname, "/html_pages/register.html"));
});
//Sets up an endpoint with the GET method on /register/admin
route.get("/admin", (req, res, next) => {
    res.sendFile(path.join(__dirname, "/html_pages/admin-register.html"));
});
function capitalizeWord(word) {
    //Capatilizes the first letter of a word
    //and makes the ofthe word lower case
    word = word.toLowerCase();
    const firstLetter = word.slice(0, 1);
    word = word.replace(firstLetter, firstLetter.toUpperCase());
    return word;
}
//Sets up an endpoint with the POST method on /register/admin
route.post("/admin", (req, res, next) => {
    const data = {
        //Gets the data from the request body
        firstname: capitalizeWord(req.body.firstname),
        lastname: capitalizeWord(req.body.lastname),
        email: req.body.email.toLowerCase(),
        password: req.body.password,
        blog: "",
        role: "admin",
        code: req.body.code,
    };
    //If the code entered is correct do the below
    if (data.code === secretCode) {
        //Checks if the email exists
        User.find({ email: data.email })
            .exec()
            .then((result) => {
            //If the email does not exist
            if (result.length === 0) {
                const user = new User(data);
                user
                    .save()
                    .then(() => {
                    //Creates the scores record for the user
                    const score = new Score({
                        typeBoth: [],
                        typeAS: [],
                        typeMD: [],
                        email: data.email,
                        role: "admin",
                    });
                    score
                        .save()
                        .then(() => {
                        jsonResponce(res, "Successful register", 201);
                    })
                        .catch((err) => {
                        next(err);
                    });
                })
                    .catch((err) => {
                    next(err);
                });
            }
            else {
                //If the email exists then do this
                jsonResponce(res, "user validation failed: email: This email already exists", 200, false);
            }
        });
    }
    else {
        //If the code is incorrect do the below
        jsonResponce(res, "user validation failed: code: This code is invalid", 200, false);
    }
});
//Sets up an endpoint with the POST method on /register/basic
route.post("/basic", (req, res, next) => {
    const data = {
        //Gets the data from the request body
        firstname: capitalizeWord(req.body.firstname),
        lastname: capitalizeWord(req.body.lastname),
        email: req.body.email.toLowerCase(),
        password: req.body.password,
        blog: "",
        role: "basic",
    };
    //Checks if the email exists
    User.find({ email: data.email })
        .exec()
        .then((result) => {
        //If the email does not exist
        if (result.length === 0) {
            const user = new User(data);
            user
                .save()
                .then(() => {
                //Creates the scores record for the user
                const score = new Score({
                    typeBoth: [],
                    typeAS: [],
                    typeMD: [],
                    email: data.email,
                    role: "basic",
                });
                score
                    .save()
                    .then(() => {
                    jsonResponce(res, "Successful register", 201);
                })
                    .catch((err) => {
                    next(err);
                });
            })
                .catch((err) => {
                next(err);
            });
        }
        else {
            //If the email exists then do this
            jsonResponce(res, "user validation failed: email: This email already exists", 200, false);
        }
    });
});
module.exports = route;
