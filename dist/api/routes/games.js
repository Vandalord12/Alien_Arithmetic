"use strict";
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
//Sets up an endpoint with the GET method on /games
route.get("/", userAuth, (auth, req, res, next) => {
    res.sendFile(path.join(__dirname, "/html_pages/game-page.html"));
});
//Sets up an endpoint with the GET method on /games/game-one
route.get("/game-one", userAuth, (auth, req, res, next) => {
    res.sendFile(path.join(__dirname, "/html_pages/game.html"));
});
//Sets up an endpoint with the GET method on /games/game-menu
route.get("/game-menu", userAuth, (auth, req, res, next) => {
    res.sendFile(path.join(__dirname, "/html_pages/game-menu.html"));
});
//Sets up an endpoint with the GET method on /games/game-end
route.get("/game-end", userAuth, (auth, req, res, next) => {
    res.sendFile(path.join(__dirname, "/html_pages/game-end.html"));
});
//Sets up an endpoint with the PUT method on /games/game-scores
route.put("/game-scores", userAuth, (auth, req, res, next) => {
    const email = auth.email;
    const { score, type } = req.body;
    if (type === "as") {
        Score.findOneAndUpdate({ email: email }, { $push: { typeAS: score } })
            .exec()
            .then((result) => {
            res.json({
                state: true,
            });
        });
    }
    else if (type === "md") {
        Score.findOneAndUpdate({ email: email }, { $push: { typeMD: score } })
            .exec()
            .then((result) => {
            res.json({
                state: true,
            });
        });
    }
    else if (type === "both") {
        Score.findOneAndUpdate({ email: email }, { $push: { typeBoth: score } })
            .exec()
            .then((result) => {
            res.json({
                state: true,
            });
        });
    }
});
//Sets up an endpoint with the POST method on /games/game-score
route.post("/game-score", userAuth, (auth, req, res, next) => {
    //This endpoint gets the Scores from the database
    //depending of the game mode given
    const email = auth.email;
    const { type } = req.body;
    Score.findOne({ email: email })
        .exec()
        .then((data) => {
        const content = data;
        let scores = "";
        if (type === "typeAS") {
            scores = content.typeAS;
        }
        else if (type === "typeMD") {
            scores = content.typeMD;
        }
        else {
            scores = content.typeBoth;
        }
        res.json({
            message: scores,
        });
    });
});
module.exports = route;
