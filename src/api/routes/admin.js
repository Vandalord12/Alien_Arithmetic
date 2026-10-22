//Imports
import express from "express"
const route = express.Router();
import path from 'node:path';
import { fileURLToPath } from "node:url"
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import Score from "../models/Scores.js"
import User from "../models/Users.js"
import { userAuth } from "../middleware/userAuth.js"

function maxNumber(array) {
  //Finds the biggest number out of
  //an array
  const max = array.reduce((a, b) => {
    return Math.max(a, b);
  }, 0);
  return max;
}

//Sets up an endpoint with the GET method on /admin
route.get("/", userAuth, (auth, req, res, next) => {
  if (auth.role === "admin") {
    //Sends the admin.html file to the display
    res.sendFile(path.join(__dirname, "/html_pages/admin.html"));
  } else {
    res.json({
      message: "Access Denied",
    });
  }
});

//Sets up an endpoint with the GET method on /admin/all-info
route.get("/all-info", userAuth, (auth, req, res, next) => {
  //Returns all the basic user info
  if (auth.role === "admin") {
    let allData = {};
    User.find({ role: "basic" })
      .exec()
      .then((userData) => {
        Score.find({ role: "basic" })
          .exec()
          .then((scoreData) => {
            for (let user in userData) {
              const { email, firstname, lastname, blog } = userData[user];
              const { typeBoth, typeMD, typeAS } = scoreData[user];
              const highBoth = maxNumber(typeBoth);
              const highMD = maxNumber(typeMD);
              const highAS = maxNumber(typeAS);
              allData[user] = {
                email: email,
                firstname: firstname,
                lastname: lastname,
                blog: blog,
                typeAS: typeAS,
                typeMD: typeMD,
                typeBoth: typeBoth,
                highBoth: highBoth,
                highMD: highMD,
                highAS: highAS,
              };
            }
            res.json({
              data: allData,
            });
          });
      });
  } else {
    res.json({
      message: "Access Denied",
    });
  }
});

//Sets up an endpoint with the DELETE method on /admin/{param}
route.delete("/:userEmail", userAuth, (auth, req, res, next) => {
  //Deletes the record with the given in corresponding
  //email address in the database
  if (auth.role === "admin") {
    User.deleteOne({ email: req.params.userEmail })
      .exec()
      .then((result) => {
        Score.deleteOne({ email: req.params.userEmail })
          .exec()
          .then(() => {
            res.status(201).json({
              message: "User deleted",
            });
          });
      })
      .catch((err) => {
        next(err);
      });
  } else {
    res.json({
      message: "Access Denied",
    });
  }
});

export default route
