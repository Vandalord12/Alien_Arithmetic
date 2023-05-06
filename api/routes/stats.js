//Imports
const express = require("express");
const route = express.Router();
const path = require("path");
const Score = require("../models/Scores");
const { userAuth } = require("../middleware/userAuth");

function jsonResponce(res, text, code, state = true) {
  //Sends a JSON responce to the client
  res.status(code).json({
    message: text,
    state: state,
  });
}

//Sets up an endpoint with the GET method on /stats
route.get("/", userAuth, (auth, req, res, next) => {
  res.sendFile(path.join(__dirname, "/html_pages/stats.html"));
});

//Sets up an endpoint with the GET method on /stats/game-scores
route.get("/game-scores", userAuth, (auth, req, res, next) => {
  const email = auth.email;
  //Returns the scores of the user
  Score.findOne({ email: email })
    .exec()
    .then((data) => {
      res.json({
        message: data,
      });
    });
});

module.exports = route;
