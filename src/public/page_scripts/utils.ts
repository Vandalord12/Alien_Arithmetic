

function showPassword() {
  //Function to toggle passsword visability
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

function valiadateData(validationMsg : string) {
  //Takes in the validation message from the server
  //and displays the messages in the DOM

  //Example validation message: user validation failed: firstname: First name must be greater than 2 chars, lastname: Last Name is required, email: Email is required, password: Password is required
  const validationMsgs : string[] = validationMsg.slice(0,25).split(", ")
  const firstValidationMsg : string[] = validationMsgs[0].split(": ")


  const element = document.getElementById(firstValidationMsg[0] + "Error") as HTMLParagraphElement;
  element.textContent = firstValidationMsg[1];
}

export {showPassword, getElement, cleanForm, valiadateData}