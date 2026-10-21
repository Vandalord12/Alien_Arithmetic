try {
  //This checks if the type is already selected from
  //a previous game. If yes, then it checked the corresponding
  //radio button.
  let type = sessionStorage.getItem("type");
  const input = document.getElementById(type);
  input.checked = true;
} catch {
  //If the type is not selected, the Both radio button
  //is checked by default
  const input = document.getElementById("both");
  input.checked = true;
}

const startButton = document.querySelector("button");
startButton.addEventListener("click", () => {
  //When the start button is clicked, store the type of radio button
  //selected and go to the game.
  const inputs = document.querySelectorAll("input");
  inputs.forEach((e) => {
    if (e.checked === true) {
      type = e.value;
      sessionStorage.setItem("type", type);
      location.href = "http://localhost:3000/games/game-one";
    }
  });
});