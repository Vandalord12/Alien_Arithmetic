//Exports the live counter
export let lives = 3;
const live = document.getElementById("lives");

//Exporting allows this class to be used in other files
export default class Enemy {
  //creates a class called Enemy that defines the enemies
  constructor(enemyId) {
    this.element = document.getElementById(`${enemyId}`);
  }

  get getX() {
    //This get method gets the enemie's x coords
    return parseFloat(getComputedStyle(this.element).getPropertyValue("--x"));
  }

  set changeX(value) {
    //This set method changes the enemie's x coords
    this.element.style.setProperty("--x", value);
  }

  get getY() {
    //This get method gets the enemie's y coords
    return parseFloat(getComputedStyle(this.element).getPropertyValue("--y"));
  }

  set changeY(value) {
    //This set method changes the enemie's y coords
    this.element.style.setProperty("--y", value);
  }

  //-----------CREATE ENEMY--------------
  createEnemy(enemy, start, aim, speed) {
    //Creates a moving enemy
    function update(timeC, speed) {
      //This is a unit vector towards the player
      let unitV = direction(start, aim);
      //This is what moves the enemy
      enemy.changeX = enemy.getX + unitV.x * speed;
      enemy.changeY = enemy.getY + unitV.y * speed;

      if (enemy.getY < 80) {
        //If the enemy has not reached the player
        //carry on moving towards the player
        requestAnimationFrame((timeC) => {
          update(timeC, speed);
        });
      } else if (enemy.getY >= 80) {
        //If the enemy has reached the player remove the
        //enemy and take away a life
        cancelAnimationFrame(timeC);
        enemy.element.remove();
        lives -= 1;
        live.innerHTML = lives;
      }
    }
    requestAnimationFrame((timeC) => {
      //This initiates the movement
      update(timeC, speed);
    });
  }
}

function direction(startP, endP) {
  //returns the direction of an enemy
  let dir = { x: endP.x - startP.x, y: endP.y - startP.y };
  let hyp = Math.sqrt(Math.pow(dir.x, 2) + Math.pow(dir.y, 2));
  dir = { x: dir.x / hyp, y: dir.y / hyp };
  return dir;
}
