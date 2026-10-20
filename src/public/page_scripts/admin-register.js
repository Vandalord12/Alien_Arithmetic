

function showPassword() {
  //Function to toggle passsword visability
  const password = document.getElementById("password");
  if (password.type === "password") {
    password.type = "text";
  } else {
    password.type = "password";
  }
}

function getElement(id) {
  //Gets a inputs fields value from the DOM
  const ele = document.getElementById(id);
  return ele.value;
}

function cleanForm() {
  //Clears all the text from the error p tags
  const errorTags = document.querySelectorAll(".error");
  errorTags.forEach((ele) => {
    ele.textContent = "";
  });
}

function valiadateData(data) {
  //Takes in the validation message from the server
  //and displays the messages in the DOM
  const splitData = data.split(" ");
  for (let i = 0; i < 3; i++) {
    splitData.shift();
  }
  const newData = splitData.join(" ").split(", ");

  const errorMsgs = newData.map((error) => {
    error = error.split(":");
    return [error[0], error[1]];
  });

  const element = document.getElementById(errorMsgs[0][0] + "Error");
  element.textContent = errorMsgs[0][1];
}

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
    .then((data) => {
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