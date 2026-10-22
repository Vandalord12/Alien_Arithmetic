import {showPassword, getElement, cleanForm, valiadateData} from "./utils.js"


function register() {
  //Sends a POST request to the server in order to create a user
  fetch("http://localhost:3000/register/admin", {
    method: "POST",
    body: JSON.stringify({
      firstname: getElement("firstName"),
      lastname: getElement("lastName"),
      email: getElement("email"),
      password: getElement("password"),
      code: getElement("code"),
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((data: {message : string, state : boolean}) => {
      //When the data is recieved check whether it was succesful or not in creating
      //a user
      if (data.state) {
        location.href = "http://localhost:3000/login";
      } else {
        cleanForm();
        valiadateData(data.message);
      }
    })
    //If there is a network error it is caught here
    .catch((err) => {
      console.log(err.message);
    });
}