//Gets the score and game mode from the session storage
const currentType = sessionStorage.getItem("type");
const score = sessionStorage.getItem("score");

const yourScore = document.getElementById("your-score")!;
yourScore.innerText = `Your Score: ${score}`;

const selectedTypes = document.querySelectorAll<HTMLElement>(".type");
selectedTypes.forEach((ele) => {
  //For each score board button selected, do the following
  ele.addEventListener("click", () => {
    selectedTypes.forEach((e) => {
      //When the button is clicked make all
      //the buttons have white borders
      e.style.borderColor = "white";
    });
    //The button clicked will get a red border
    ele.style.borderColor = "red";
  });
});

//Depending on the game mode previously played
//the corresponding score board button is highlighted and displayed
if (currentType === "both") {
  document.querySelector<HTMLButtonElement>(".both")!.style.borderColor = "red";
  getScores("Both");
} else if (currentType === "as") {
  document.querySelector<HTMLButtonElement>(".as")!.style.borderColor = "red";
  getScores("typeAS");
} else {
  document.querySelector<HTMLButtonElement>(".md")!.style.borderColor = "red";
  getScores("typeMD");
}

function nextLocation(loc : string) {
  //Calls an endpoint when called
  location.href = "http://localhost:3000/games/" + loc;
}

function displayScores(array : number[]) {
  //Displays the scores in the DOM
  const list = document.getElementById("scores")! as HTMLOListElement;
  // Sorts the array
  array = array.sort(function (a, b) {
    return b - a;
  });
  if (!array.length) {
    //If the array given is empty add the p tag below
    //to the list of scores
    list.innerHTML = "<p>There are no scores here</p>";
  } else {
    //If the array given is not empty add the array
    //into the DOM
    list.innerHTML = "";
    for (let i = 0; i < array.length; i++) {
      if (i >= 10) {
        //This only allows the first top ten
        //scores to be displayed
        break;
      }
      list.innerHTML += `<li>${array[i]}</li>`;
    }
  }
}

function getScores(type : string) {
  //Sends a POST request to the server in order to get the array of scores
  fetch("http://localhost:3000/games/game-score", {
    method: "POST",
    body: JSON.stringify({
      type: type,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      displayScores(data.message);
    });
}