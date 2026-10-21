export {}

type JsonResponse = {message : string, state : boolean}

function showPassword() {
  //Function to toggle password visability
  const password = document.getElementById("password") as HTMLInputElement;
  if (password.type === "password") {
    password.type = "text";
  } else {
    password.type = "password";
  }
}

function getElement(id : string) {
  //Gets a inputs fields value from the DOM
  const ele = document.getElementById(id) as HTMLInputElement;
  return ele.value;
}

function cleanForm() {
  //Clears all the text from the error p tags
  const errorTags = document.querySelectorAll(".error");
  errorTags.forEach((ele) => {
    ele.textContent = "";
  });
}

function valiadateData(data : string) {
  //Takes in the validation message from the server
  //and displays the messages in the DOM
  const splitData = data.split(" ");
  for (let i = 0; i < 3; i++) {
    splitData.shift();
  }
  const newData = splitData.join(" ").split(", ");

  const errorMsgs = newData.map((error : string) => {
    let err = error.split(":");
    return [err[0], err[1]];
  });

  const element = document.getElementById(errorMsgs[0][0] + "Error") as HTMLParagraphElement;
  element.textContent = errorMsgs[0][1];
}

function register() {
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