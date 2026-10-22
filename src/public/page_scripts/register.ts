import {showPassword, getElement, cleanForm, valiadateData} from "./utils.js"

type JsonResponse = {message : string, state : boolean}

console.log("This ran?")





function register() {
  console.log("register button clicked")
  //Sends a POST request to the server in order to create a user
  fetch("http://localhost:3000/register/basic", {
    method: "POST",
    body: JSON.stringify({
      firstname: getElement("firstName"),
      lastname: getElement("lastName"),
      email: getElement("email"),
      password: getElement("password"),
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((data : JsonResponse) => {
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

const registerButton = document.getElementById("sign-in") as HTMLButtonElement

registerButton.addEventListener("click", () => register())

const showPasswordCheckBox = document.getElementById("show") as HTMLInputElement

showPasswordCheckBox.addEventListener("change", () => showPassword())