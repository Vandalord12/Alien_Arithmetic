//Imports
import express from "express"
const route = express.Router();
import path from 'node:path';
import { fileURLToPath } from "node:url"
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import { userAuth } from "../middleware/userAuth.js"

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
  } else {
    res.sendFile(path.join(__dirname, "/html_pages/home.html"));
  }
});

export default route;
