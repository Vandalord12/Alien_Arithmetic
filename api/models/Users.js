//Imports the mongoose package
const Mongoose = require("mongoose");

//Creates a new schema
const userSchema = new Mongoose.Schema({
  firstname: {
    //Inside the object is where the field is validated
    type: String,
    trim: true,
    required: [true, "First Name is required"],
    minLength: [3, "First name must be greater than 2 chars"],
    maxLength: [20, "First name must be less than 21 characters"],
  },
  lastname: {
    type: String,
    trim: true,
    required: [true, "Last Name is required"],
    minLength: [3, "Last name must be greater than 2 chars"],
    maxLength: [20, "Last name must be less than 21 characters"],
  },
  email: {
    type: String,
    trim: true,
    required: [true, "Email is required"],

    validate: {
      validator: function validateEmail(email) {
        //Validates the length of the local and domain lengths
        const letters = email.split("");
        let atCounter = 0;
        for (let i = 0; i < letters.length; i++) {
          if (letters[i] === "@") {
            atCounter++;
          }
        }
        if (atCounter !== 1) {
          return false;
        } else {
          splitEmail = email.split("@");
          if (18 < splitEmail[0].length || splitEmail[0].length < 1) {
            return false;
          } else {
            if (18 < splitEmail[1].length || splitEmail[1].length < 1) {
              return false;
            } else {
              //Validates an emails format
              let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
              if (email.match(mailformat)) {
                return true;
              } else {
                return false;
              }
            }
          }
        }
      },
      message: "Wrong email format",
    },
    //Emails must be unique. This is not validation though.
    unique: true,
  },
  password: {
    type: String,
    trim: true,
    required: [true, "Password is required"],
    minLength: [7, "Password must be greater than 6 chars"],
    maxLength: [20, "Password must be less than 21 characters"],
  },
  blog: {
    type: String,
    trim: true,
    maxLength: [100, "Blog must be less than 101 characters"],
  },
  role: {
    type: String,
  },
});
//Initiates the model
const User = Mongoose.model("user", userSchema);
//Exports the User model
module.exports = User;
