// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // X and Y paramaters as placeholders
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png'; // Load the enemy image

    this.width = 80;
    this.height = 50;

    this.speed = 1;
    this.speed = 100 + (Math.floor(Math.random()* 512) + 1);
};

// Update the enemy's position, required method for game
Enemy.prototype.update = function(dt) {

    // X coordinates are used to reset the enemies position after they move off of the canvas
    if (this.x < 500) {
        this.x += this.speed * (dt);
    } else {
        this.x = -200;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Creating the player
var Player = function(x, y) {
    this.x = x;
    this.y = y;

    // Set the player score to 0
    this.score = 0;

    // Player image
    this.sprite = 'images/char-boy.png';

    // Width and Height are added to detect collisions
    this.width = 80;
    this.height = 50;

    // Initial speed
    this.speed = 1;
};

// Update the player position once the character hits the water.
// Since the water is not moving and is static we use the player Y coordinate
Player.prototype.update = function(dt) {
    if (this.y <= 0) {
        this.reset(202, 405);
        this.score += 50; // adds 50 if the player win
        document.getElementById("score").innerHTML = this.score;
    }
};


// Player movement is the same width and height of the canvas squares
Player.prototype.handleInput = function(keyPress) {
    if (keyPress === 'left' && this.x > 0) {
        this.x -= 101;
    }
    if (keyPress === 'right' && this.x < 405) {
        this.x += 101;
    }
    if (keyPress === 'up' && this.y > 0) {
        this.y -= 83;
    }
    if (keyPress === 'down' && this.y < 405) {
        this.y += 83;
    }
    if (this.y < 0 ){
        setTimeout(function (){
            player.x = 202;
            player.y = 405;
        }, 600)
    }
};

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var allEnemy = [
    new Enemy(-200, 50, 1),
    new Enemy(-200, 150, 1),
    new Enemy(-200, 250, 1)
];


// Place the player object in a variable called player
var player = new Player(202, 405);

// Reset players position after collision with enemies
Player.prototype.reset = function(x, y) {
    if (this.y> 0) {
        this.score -= 50; // subtracts from the score when player hits an enemy
        document.getElementById('score').innerHTML = this.score;
    }
    this.x = x;
    this.y = y;
};

// Checks collisions between player and Enemy
function checkCollisions(Enemy, player) {
    for (var i = 0; i < Enemy.length; i++) {
        if (Enemy[i].x < player.x + player.width && Enemy[i].x + Enemy[i].width > player.x && Enemy[i].y < player.y + player.height &&
            Enemy[i].height + Enemy[i].y > player.y) {
            player.reset(202, 405);
        }
    }
}


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var keyboard = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(keyboard[e.keyCode]);
});
