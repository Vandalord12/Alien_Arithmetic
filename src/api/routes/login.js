//Imports
import express from "express"
const route = express.Router();
import path from 'node:path';
import { fileURLToPath } from "node:url"
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import jwt from "jsonwebtoken"
import User from "../models/Users.js"
import mongoose from "mongoose"

function jsonResponce(res, text, code, state = true) {
  //Sends a JSON responce to the client
  res.status(code).json({
    message: text,
    state: state,
  });
}

//Sets up an endpoint with the GET method on /login
route.get("/", (req, res, next) => {
  //Send a html file to the display
  res.sendFile(path.join(__dirname, "/html_pages/login.html"));
});

//Sets up an endpoint with the GET method on /login/logout
route.get("/logout", (req, res) => {
  //This endpoint clears the authentication cookie
  //and reroutes the user to the login page
  res.clearCookie("token", undefined);
  res.sendFile(path.join(__dirname, "/html_pages/login.html"));
});

//Sets up an endpoint with the POST method on /login
route.post("/", (req, res, next) => {
  //Gets the values stored in the email and password from the body
  const { email, password } = req.body;
  if (!email || !password) {
    jsonResponce(
      res,
      "password: Both email and password are required",
      200,
      false
    );
  } else {
    //If the fields are both filled do the below
    User.find({ email: req.body.email.toLowerCase() })
      .exec()
      .then((user) => {
        const userContent = user[0];
        //If an account with email exists then do the below
        if (user.length >= 1) {
          //If the password passed in is correct then do the below
          if (userContent.password === req.body.password) {
            // Creates a token that stores the email, userId and role of the
            //user.
            const maxAge = 1 * 60 * 60;
            //This is the code to be used to undecipher the token
            const jwtSecret =
              "SomethingCoolIGuess"; // Secret
            //This defines the token
            const token = jwt.sign(
              {
                email: userContent.email,
                userID: userContent._id,
                role: userContent.role,
              },
              jwtSecret,
              {
                expiresIn: maxAge,
              }
            );
            //Adds a cookie with the authentication token
            res.cookie("token", token, {
              maxAge: maxAge * 1000,
            });

            res.status(200).json({
              message: "You logged in",
              state: true,
            });
            //If the password is incorrect then do the below
          } else {
            jsonResponce(res, "password: Wrong password", 200, false);
          }
          //If the email does not exist then do the below
        } else {
          jsonResponce(res, "email: This user does not exist", 200, false);
        }
      })
      .catch((err) => {
        next(err);
      });
  }
});

export default route;
