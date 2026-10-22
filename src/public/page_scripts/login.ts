import {showPassword, getElement, cleanForm} from "./utils.js"

function validateData(data : string) {
  //Takes in the validation message from the server
  //and displays the messages in the DOM
  const splitData = data.split(": ");
  const element = document.getElementById(splitData[0] + "-error") as HTMLParagraphElement;
  element.textContent = splitData[1];
}

function login() {
  //Sends a POST request to the server in order to login a user
  fetch("http://localhost:3000/login", {
    method: "POST",
    body: JSON.stringify({
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
    .then((data) => {
      if (data.state) {
        location.href = "http://localhost:3000/home";
      } else {
        cleanForm();
        validateData(data.message);
      }
    })
    .catch((err) => {
      console.log(err.message);
    });
}