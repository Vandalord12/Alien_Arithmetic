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
  const splitData = data.split(": ");
  const element = document.getElementById(splitData[0] + "-error");
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
        valiadateData(data.message);
      }
    })
    .catch((err) => {
      console.log(err.message);
    });
}