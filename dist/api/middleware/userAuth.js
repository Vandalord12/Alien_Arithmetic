"use strict";
//Imports
const jwt = require("jsonwebtoken");
const path = require("path");
//This code is used to decipher the token
const jwtSecret = ""; // A secret DUH
//This exports the function called userAuth
exports.userAuth = (req, res, next) => {
    //This get the token from the cookies from the request body
    const token = req.cookies.token;
    try {
        //If the token is able to be deciphered, allow access to the user
        const { email, userID, role } = jwt.verify(token, jwtSecret);
        //Sends the role, email and userId as arguments to next function called.
        next({ role: role, id: userID, email: email });
    }
    catch {
        //If the token is NOT able to be deciphered, deny access to the user
        //and send them to the login page
        res.sendFile(path.join(__dirname, "../routes/html_pages/login.html"));
    }
};
