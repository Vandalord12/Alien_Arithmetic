"use strict";
//Imports the mongoose package
const Mongoose = require("mongoose");
//Creates a new schema
const scoreSchema = new Mongoose.Schema({
    email: {
        type: String,
    },
    typeBoth: {
        type: [Number],
    },
    typeMD: {
        type: [Number],
    },
    typeAS: {
        type: [Number],
    },
    role: {
        type: String,
    },
});
//Initiates the model
const Score = Mongoose.model("score", scoreSchema);
//Exports the Score model
module.exports = Score;
