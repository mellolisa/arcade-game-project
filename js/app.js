"use strict";
// Enemies our player must avoid
let Enemy = function(rowkey = 1, speed = "med") {

    //available values
    this.availableSpeeds = ["slow", "med", "fast"];
    this.rowYValues = [60, 144, 228];
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = 0;
    this.y = this.rowYValues[rowkey];
    this.speed = speed;
};

Enemy.prototype.changeSpeed = function() {
    let speedkey = Math.floor(Math.random() * 3);
    this.speed = this.availableSpeeds[speedkey];
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    //create an amount of movement for slow, medium and fast speeds
    this.movement = 400;
    if (this.speed == "fast") {
        this.movement = 800;
    } else if (this.speed == "slow") {
        this.movement = 100;
    }

    this.x = this.x + (this.movement * dt);
    if (this.x > 505) {
        this.x = 0;
        this.changeSpeed();

        //every time an enemy makes it to the other side, add another enemy
        //row for new enemy

        let rowkey = Math.floor(Math.random() * 3);
        allEnemies.push(new Enemy(rowkey, "med"));
        if (allEnemies.length > 5) {
            allEnemies.pop();
        }
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
    this.y = 415;
};

// Update the player's position, required method for game
// Parameter: dt, a time delta between ticks
Player.prototype.update = function() {
    //Whenever the player is updated, check to see if either the game is won or lost

    if (this.y <= 20) {
        setTimeout(alert("You win the game!"), 3000);
        this.reset();
    }

    this.checkForBugs();

};

// Draw the player on the screen, required method for game
Player.prototype.render = function(dt) {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(dt) {
    /*
    This page was a good resource to get started here:
    https://discussions.udacity.com/t/i-dont-understand-how-to-code-classic-arcade-game/527836/2
    */
    switch (dt) {
        case "up":
            this.y -= 85;
            break;
        case "down":
            if (this.y < 400) {
                this.y += 85;
            }
            break;
        case "left":
            if (this.x > 10) {
                this.x -= 100;
            }
            break;
        case "right":
            if (this.x < 380) {
                this.x += 100;
            }
            break;
    }

};

Player.prototype.checkForBugs = function() {
    //Sets a boundary around the player - if the bug crosses into this boundary, the player loses

    for (let i = 0; i < allEnemies.length; i++) {
        let yDiff = Math.abs(allEnemies[i].y - this.y);
        let xDiff = Math.abs(allEnemies[i].x - this.x);
        if (yDiff <= 25 && xDiff <= 25) {
            setTimeout(alert("You lose the game!"), 3000);
            this.reset();
        }
    }
}

Player.prototype.reset = function() {
    //Resets the game by removing the player object and creating a new one

    player = null;
    player = new Player();
}




// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
let allEnemies = [new Enemy()];

// Place the player object in a variable called player
let player = new Player();

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
