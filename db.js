//Imports the mongoose package
const Mongoose = require("mongoose");
//This is the connection url
const dbURI =
  "mongodb+srv://alien_arithmetic:AlienInvaders@cluster0.dt1u6xr.mongodb.net/Website_users?retryWrites=true&w=majority";

function connectDB() {
  //Makes the connection to the database
  Mongoose.set("strictQuery", true);
  Mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      //If the process is successful, run this code
      console.log("Database connected");
    })
    .catch((err) => {
      //If the process is unsuccessful, run this code
      console.log(err);
    });
}
//Exports the function to be used else where
module.exports = connectDB();
