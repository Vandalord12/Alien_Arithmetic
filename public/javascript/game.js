//Imports the Enemy class and lives from the enemies,js file
import Enemy, { lives } from "./enemies.js";

//defines the elements in the html page
const score = document.getElementById("score");
const input = document.querySelector("input");
const body = document.querySelector("body");
let scr = 20;

//This code defaults the input area to be
//already selected
document.querySelector("input").focus();

body.addEventListener("keypress", (event) => {
  //Listens for the enter key press to read the input
  if (event.code === "Enter") {
    //Gets all the enemy divs on screen with the corresponding value
    let find = document.querySelectorAll(`[value="${input.value}"]`);
    if (find) {
      input.value = "";
      //Removes the enemy divs and add 1 to the score counter
      find.forEach((element) => {
        element.remove();
        scr += 1;
        score.innerHTML = scr;
      });
    }
  }
});

function randomCoords() {
  //produces a random coordinate in the game box
  const choise = rndNum(2);
  let y = rndNum(60) - 1;
  let x = 0;
  if (y > 30) {
    if (choise === 1) {
      x = rndNum(5) - 1;
    } else {
      x = rndNum(5) - 1 + 90;
    }
  } else {
    x = rndNum(95) - 1;
  }
  return [x, y];
}

function rndNum(num) {
  //creates a random number that cannot be 0
  return Math.floor(Math.random() * num) + 1;
}

//gets the type from the browser storage
const type = sessionStorage.getItem("type");

function randomQuestion(asq, mdq, type) {
  //randomizes the type of question created
  let returnQ = "";
  if (type === "both") {
    //depending on the the game mode you will get different
    //questions
    const choise = rndNum(2);
    if (choise === 1) {
      returnQ = randomASQ(asq);
    } else {
      returnQ = randomMDQ(mdq);
    }
  } else if (type === "as") {
    returnQ = randomASQ(asq);
  } else if (type === "md") {
    returnQ = randomMDQ(mdq);
  }
  return returnQ;
}

function evaluateAns(a, sign, b) {
  //calculates the equation
  let c = eval(`${a} ${sign} ${b}`);
  return { que: `${a} ${sign} ${b}`, ans: c };
}

function randomASQ(range) {
  //creates a random addition or subtraction question
  let a = rndNum(range);
  let b = rndNum(range);
  let returnEq = 0;
  let dis = rndNum(2);
  if (dis === 1) {
    //creates random addition equation
    returnEq = evaluateAns(a, "+", b);
  } else {
    //creates random subtraction equation
    if (b > a) {
      //this if statement makes sure that the answer will not be
      //minus number.
      returnEq = evaluateAns(b, "-", a);
    } else {
      returnEq = evaluateAns(a, "-", b);
    }
  }
  return returnEq;
}

function randomMDQ(range) {
  //creates a random multiplication or division question
  let a = rndNum(range);
  let b = rndNum(range);
  let c = evaluateAns(a, "*", b);
  let returnEq = 0;
  let dis = rndNum(2);
  if (dis === 1) {
    //creates random multiplication equation
    c.que = `${a} X ${b}`;
    returnEq = c;
  } else {
    //creates random division equation
    returnEq = { que: `${c.ans} / ${b}`, ans: a };
  }
  return returnEq;
}

function spawnEnemy(id, asq, mdq, type) {
  //Gets the random question
  const text = randomQuestion(asq, mdq, type);
  const gameBox = document.getElementById("game-box");
  //This creates a random set of coords
  const coords = randomCoords();

  //creates the div enemy block
  const enemy = document.createElement("div");
  enemy.setAttribute("class", "enemy");
  enemy.setAttribute("id", `${id}`);
  //The value in of the enemy div is equal to the
  //equation answer
  enemy.setAttribute("value", `${text.ans}`);
  enemy.style.setProperty("--x", coords[0]);
  enemy.style.setProperty("--y", coords[1]);

  //creates a p tag to harbour a question on the enemy
  const question = document.createElement("p");
  const textnode = document.createTextNode(`${text.que}`);
  question.appendChild(textnode);
  question.setAttribute("class", "question");
  question.setAttribute("id", `${id}`);

  //Adds the p tag to the enemy div
  enemy.appendChild(question);
  //Adds the enemy to the game box
  gameBox.appendChild(enemy);
}

//Defines the variables that change the questions and
//attributes of the spawned enemies
let spawnDelay = 1.75;
let interval = spawnDelay;
let id = 0;
let asq = 10;
let mdq = 10;
let movementSpeed = 0.09;

function setValues(rangeOfAsq, rangeOfMdq, delay, speed) {
  //changes the attributes of the enemies and the difficulty of the questions
  asq = rangeOfAsq;
  mdq = rangeOfMdq;
  spawnDelay = delay;
  movementSpeed = speed;
}

function game(timeC) {
  //runs the game
  //depending on the score the attributes and difficulty of
  //questions will change
  if (scr > 90) {
    setValues(35, 14, 1.1, (Math.random() * 12) / 100 + 0.25);
  } else if (scr > 80) {
    setValues(35, 13, 1.1, (Math.random() * 10) / 100 + 0.2);
  } else if (scr > 70) {
    setValues(35, 13, 1.1, (Math.random() * 8) / 100 + 0.18);
  } else if (scr > 50) {
    setValues(30, 12, 1.1, (Math.random() * 5) / 100 + 0.1);
  } else if (scr > 40) {
    setValues(25, 12, 1.2, (Math.random() * 2) / 100 + 0.1);
  } else if (scr > 32) {
    //Here the enemies spawn slowly, but they move very fast
    setValues(12, 12, 4, 0.5);
  } else if (scr > 30) {
    setValues(20, 12, 1.3, 0.1);
  } else if (scr > 20) {
    setValues(15, 12, 1.4, 0.095);
  } else if (scr > 10) {
    setValues(12, 10, 1.5, 0.09);
  }
  if (Math.floor(timeC / 10) / 100 > interval) {
    //spawns an enemy every interval
    interval = interval + spawnDelay;
    spawnEnemy(id, asq, mdq, type);
    //Creates a new instance of the class Enemy
    let enemy = new Enemy(id);
    let x = enemy.getX;
    let y = enemy.getY;
    enemy.createEnemy(enemy, { x: x, y: y }, { x: 47.5, y: 80 }, movementSpeed);
    id++;
  }
  if (lives > 0) {
    //checks if the player is still alive
    //if yes carry on the game
    requestAnimationFrame((timeC) => {
      game(timeC);
    });
  } else {
    //stops the game and clears the screen
    cancelAnimationFrame(timeC);
    const remainingEnemies = document.querySelectorAll(".enemy");
    remainingEnemies.forEach((element) => {
      element.remove();
    });
    //Stores the final score in session storage
    sessionStorage.setItem("score", scr);
    end();
  }
}

function end() {
  //Fired when the game ends
  const gameType = sessionStorage.getItem("type");
  const gameScore = sessionStorage.getItem("score");
  //Calls the endpoint /games/game-scores with the
  //method PUT
  fetch("http://localhost:3000/games/game-scores", {
    method: "PUT",
    body: JSON.stringify({
      //Using a manual email for now
      email: "doctor@who.com",
      type: gameType,
      score: gameScore,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  }).then(() => {
    location.href = "http://localhost:3000/games/game-end";
  });
}

function start() {
  //Initiates the start of game
  requestAnimationFrame((timeC) => {
    game(timeC);
  });
}

start();
