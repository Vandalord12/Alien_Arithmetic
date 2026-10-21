function showPassword() {
  //Function to toggle passsword visability
  const password = document.querySelector(".password")
  
  if (password.type === "password") {
    password.type = "text"
  } else {
    password.type = "password"
  }
}

function logOut() {
  //Logouts the user and take them to the login page
  location.replace("http://localhost:3000/login/logout")
}

function makePFP(obj) {
  //Makes the profile picture as the initials
  //of the user
  const firstInitial = obj.firstname.slice(0,1)
  const lastInitial = obj.lastname.slice(0,1)
  const pfp = document.getElementById("initials")
  pfp.textContent = firstInitial + lastInitial
}

function sortScores(array) {
  //Sorts an array of integer values into descending
  //order
  const sorted = array.sort(function (a, b) {
  return b - a;
  });
  return sorted
}

//Sends a GET request to the server in order to display
//the users details on the screen
fetch("http://localhost:3000/pfp/info")
.then((res) => {
  return res.json()
})
.then((data) => {
  makePFP(data)
  for (let key in data) {
    //For each detail of the user, do the below
    const detail = document.querySelector(`.${key}`)
    if( key == "password" || key == "blog") {
      //For the password and blog add it to the 
      //display this way
      detail.value = data[key]
    } else {
      //For all the other details do show it this way
      if (key.slice(0, 4) == "type") {
        //If the data is a score type then sort the scores 
        //and then add it to the DOM
        let sortedScores = sortScores(data[key])
        detail.textContent = sortedScores
      } else {
       detail.textContent = data[key] 
      }
    }
  }
})


function saveBlog() {
  //Function that saves the blog text to the database
  const blog = document.querySelector(".blog")
  const blogText = blog.value
  //Sends a PUT request to the server in order to save the blog
  fetch("http://localhost:3000/pfp/save-blog", {
    method: "PUT",
    body: JSON.stringify({
      blog: blogText
    }),
    headers: {"Content-type": "application/json; charset=UTF-8"}
  })
  .then((res) => {
    return res.json()
  })
  .then((data) => {
    //Changes the 'Save blog' button to 'Blog Saved' after
    //the blog is successfully saved
    const errorMsg = document.getElementById("blogError")
    const saveButton = document.querySelector(".save-blog")
    if (data.state) {
      //If the response is positive, then confirm the password
      //change on the DOM
      errorMsg.textContent = ""
      saveButton.textContent = data.message
    } else {
      //Else, display the error message
      errorMsg.innerText = data.message.slice(25)  
    }
  })
}

function changePassword() {
  //Sends a PUT request to the server in order to change the password
  const password = document.querySelector(".password")
  fetch("http://localhost:3000/pfp/change-password", {
    method: "PUT",
    body: JSON.stringify({
      password: password.value
    }),
    headers: {"Content-type": "application/json; charset=UTF-8"}
  })
  .then((res) => {
    return res.json()
  })
  .then((data) => {
    const errorMsg = document.getElementById("passwordError")
    const changeButton = document.querySelector(".change-password")
    if (data.state) {
      //IF the response is positive, then confirm the password
      //change on the DOM
      errorMsg.textContent = ""
      changeButton.textContent = data.message
    } else {
      //Else, display the error message
      errorMsg.innerText = data.message.slice(29)  
    }
  })
}

