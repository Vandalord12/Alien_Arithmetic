//Imports
import express from "express"
const route = express.Router();
import path from 'node:path';
import { fileURLToPath } from "node:url"
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import Score from "../models/Scores.js"
import { userAuth } from "../middleware/userAuth.js"

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

export default route;
