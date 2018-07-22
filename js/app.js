// Enemies our player must avoid
let Enemy = function(x, y, speed = "med") {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.availableSpeeds = ["slow", "med", "fast"];
    this.speed = speed;
};

Enemy.prototype.changeSpeed = function() {
  let speedkey = Math.floor(Math.random() * 3);
  this.speed = availableSpeeds(speedkey);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    this.movement = 50;
    if(this.speed == "fast") {
      this.movement = 100;
    } else if(this.speed == "slow") {
      this.movement = 10;
    }

    this.x = this.x + (this.movement * dt);
    if( this.x > 505 ){
      this.x = 0;
      this.changeSpeed;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
let Player = function() {
    // Variables applied to each of our instances go here,
    this.sprite = 'images/char-cat-girl.png';
    this.x = 203;
    this.y = 400;
};

// Update the player's position, required method for game
// Parameter: dt, a time delta between ticks
Player.prototype.update = function(dt) {
    console.log("in player's update function!");
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the player on the screen, required method for game
Player.prototype.render = function(dt) {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/* Player.prototpye.handleInput = function(dt) {
   console.log("in player's handle input function!");
};

*/


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
let allEnemies = [
  new Enemy(0, 60),
  new Enemy(0, 144, "fast")
];
console.log(allEnemies);

// Place the player object in a variable called player
let player = new Player();
console.log(player);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
