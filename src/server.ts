
//Packages are imported here
import express from "express";
import { Request, Response, NextFunction, ErrorRequestHandler } from "express";

//Imports the module from db.js
import {connectDB}  from "./db.js"

// //Package to allow cookies to be read
import cookieParser from "cookie-parser"

import path from 'node:path';

import { fileURLToPath } from "node:url"
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


//Connects to the databse
connectDB();

//Creates a express driven server
const app = express();
const Port:number = 3000;
//the server is no hosted locally on the port 3000
app.listen(Port, () => {
  console.log("Server listening on port", Port);
});

//Sets up static files
app.use(express.static(path.join(__dirname, "/public")));

//allows for info transfer between other websites and this api
import cors from "cors"
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

//importing a helpful debug libary
import morgan from "morgan"
app.use(morgan("dev"));

//This converts JSON in the request body into readable JavaScript
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//this gives me the access to the code in the routes
import registerPage from "./api/routes/register.js"
import gamesPage from "./api/routes/games.js"
import profilePage from "./api/routes/pfp.js"
import homePage from "./api/routes/home.js"
import statsPage from "./api/routes/stats.js"
import loginPage from "./api/routes/login.js"
import adminPage from "./api/routes/admin.js"

//this sends the argument "/smth" to the paticular route's file
app.use("/register", registerPage);
app.use("/login", loginPage);
app.use("/games", gamesPage);
app.use("/pfp", profilePage);
app.use("/home", homePage);
app.use("/stats", statsPage);
app.use("/admin", adminPage);

type HttpError = Error & { status?: number };

//if no page is found then an error is thrown in the json
//format saying "Page not found"
app.use((req:Request, res:Response, next:NextFunction) => {
  const error:HttpError = new Error("Page not found")
  error.status = 404;

  //this next function says the next function must be called which is the other error handler
  next(error);
});

//if there is an error that is from anywhere in the code it will be caught here and
//returned in json format
const errorHandler:ErrorRequestHandler = ((error, req, res, next) => {
  console.log(error.message);
  res.status(error.status || 500);
  res.json({
    message: error.message,
    state: false,
  });
});

app.use(errorHandler)
