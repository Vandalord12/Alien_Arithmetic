//Imports the mongoose package
import Mongoose from "mongoose"
//This is the connection url
const dbURI : string =
  "mongodb+srv://alien_arithmetic:alienarithmetic@cluster0.dt1u6xr.mongodb.net/"; // Input db uri here. Secret.

function connectDB() {
  //Makes the connection to the database
  Mongoose.set("strictQuery", true);
  Mongoose.connect(dbURI)
    .then(() => {
      //If the process is successful, run this code
      console.log("Database connected");
    })
    .catch((err:Error) => {
      //If the process is unsuccessful, run this code
      console.log(err);
    });
}
//Exports the function to be used else where
export {connectDB}
