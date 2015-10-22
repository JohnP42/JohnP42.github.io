//Create the canvas
var canvas = document.createElement("canvas");
var context = canvas.getContext("2d");
canvas.width = 480;
canvas.height = 480;
canvas.style.background = '#000000';
canvas.tabIndex = 1;
document.getElementById("game").appendChild(canvas);

//css
canvas.style.margin ="20px auto";
canvas.style.display = "block";

//Player
var player = new PlayerShip(224, 430, "space/ship.png", "space/ship2.png");

//Score
var scoreText = document.getElementById("score");
var score = 0;

//Paused
var gamePaused = true;

//Asteroids
var asteroids = new Array();
var spawnAsteroid = 0; 

//Peons
var peons = new Array();
var spawnPeon = 100; 
var spawnBeamer = 500;
enemyShots = new Array();

//Background
var bg = new Image();
bg.src = "space/stars.png";
var bgY = 0;
var bgMusic = new Audio('space/sounds/music.mp3');
bgMusic.loop = true;

//Explosion
var imgExplosion = new Image();
imgExplosion.src = "space/explosion_by_gintasdx.png";
booms = new Array();

function Boom(x, y) {
	this.x = x,
	this.y = y,
	this.imgIndex = 0,
	this.imgCount = 2;
	new Audio('space/sounds/boom.wav').play();

	this.animate = function() {
		this.imgCount--;
		if(this.imgCount === 0) {
			this.imgIndex += this.imgIndex < 8 ? 1 : 0;
			this.imgCount = 2;
		}
	}
}

//Input
var keysDown = {};

addEventListener("keydown", function(e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function(e){
	delete keysDown[e.keyCode];
}, false);

window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);

//Reset the game
var reset = function() {
	player = new PlayerShip(224, 430, "space/ship.png", "space/ship2.png");
	asteroids = new Array();
	enemyShots = new Array();
	peons = new Array();
	booms = new Array();
	spawnAsteroid = 0; 
	spawnPeon = 100;
	spawnBeamer = 500;
	score = 0;
}

var update = function (modifier) {

	if(!player.alive)
		gamePaused = true;
	player.update(keysDown, modifier, asteroids, peons);
	bgY = bgY >= 480 ? 0 : bgY + 2;

	//Astroids
	spawnAsteroid--;
	if(spawnAsteroid <= 0) {
		asteroids.push(new Asteroid());
		spawnAsteroid = Math.floor(Math.random() * Math.max(200 - score, 0)) + 50;
	}

	for(var i = 0; i < asteroids.length; i++) {
		asteroids[i].update(modifier);
		if(asteroids[i].y >= 512) {
			asteroids.splice(i, 1);
			i--;
			score += 2;
		}
	}

	//Peons
	spawnPeon--;
	if(spawnPeon <= 0) {
		peons.push(new Peon());
		spawnPeon = Math.floor(Math.random() * Math.max(400 - score, 0)) + 50;
	}

	spawnBeamer--;
	if(spawnBeamer <= 0) {
		peons.push(new Beamer());
		spawnBeamer = Math.floor(Math.random() * Math.max(800 - score, 0)) + 50;
	}

	for(var i = 0; i < peons.length; i++) {
		peons[i].update(modifier);
		if(peons[i].y >= 512) {
			peons.splice(i, 1);
			i--;
			score += 5;
		}
	}

	//Enemy Shots
	for(var i = 0; i < enemyShots.length; i++) {
		enemyShots[i].update(modifier);
		if(enemyShots[i].y >= 512) {
			enemyShots.splice(i, 1);
			i--;
		}
	}

	//Explosions
	for(var i = 0; i < booms.length; i++) {
		if(booms[i].imgIndex === 8) {
			booms.splice(i, 1);
			i--;
			continue;
		}
		booms[i].animate();
	}
}

//Draw Everything
var render = function() {

	context.clearRect(0, 0, canvas.width, canvas.height);

	//Background
	context.drawImage(bg, 0, bgY);
	context.drawImage(bg, 0, bgY - 480);

	//upgrade
	context.drawImage(player.repair.img, player.repair.x, player.repair.y);

	//Munnition
	for(var i = 0; i < player.shots.length; i++) {
		context.drawImage(player.shots[i].img, player.shots[i].x, player.shots[i].y);
	}

	for(var i = 0; i < enemyShots.length; i++) {
		context.drawImage(enemyShots[i].img, enemyShots[i].x, enemyShots[i].y);
	}

	//Asteroids
	for(var i = 0; i < asteroids.length; i++) {
		drawRotatedImage(asteroids[i].img, asteroids[i].x, asteroids[i].y, asteroids[i].r);
	}

	//Peons
	for(var i = 0; i < peons.length; i++) {
		if(peons[i] instanceof Beamer)
			context.drawImage(peons[i].img, peons[i].imgIndex * 32, 0, 32, 32, peons[i].x, peons[i].y, 32, 32);
		else
			context.drawImage(peons[i].img, peons[i].x, peons[i].y);
	}

	//player
	if(player.upgraded)
		context.drawImage(player.img2, player.imgIndex * 64, 0, 64, 96, player.x, player.y, 32, 48);
	else
		context.drawImage(player.img, player.imgIndex * 64, 0, 64, 96, player.x, player.y, 32, 48);

	//font
	context.font="18px Arial";
	context.fillStyle = 'white';
	context.fillText("Score: " + score,5, 15);
	if(gamePaused)
		context.fillText("Press Enter to Start!", 165, 250);
	if(!player.alive) {
		context.font="36px Arial";
		context.fillStyle = 'red';
		context.fillText("GAME OVER", 135, 220);
	}

	//Explosions
	for(var i = 0; i < booms.length; i++) {
		context.drawImage(imgExplosion, booms[i].imgIndex * 32 + 32, 0, 32, 32, booms[i].x - 8, booms[i].y - 8, 48, 48);
	}
}

var drawRotatedImage = function (img, x, y, r) {
	context.save();
	context.translate(x, y);
	context.rotate(r * Math.PI / 180);
	context.drawImage(img, -(img.width/2), -(img.height/2));
	context.restore();
}

var updatePause = function(modifier) {
	if(13 in keysDown) {
		gamePaused = false;
		reset();
	}
}

//The main game loop
var main = function() {

	var now = Date.now();
	var delta = now - then;

	if(document.activeElement.tagName === "CANVAS")
	{
		if(bgMusic.paused)
			bgMusic.play();

		if(!gamePaused)
			update((delta / 1000));
		else
			updatePause((delta / 1000));
		render();
		scoreText.innerHTML = score;
	}
	else if(!bgMusic.paused)
		bgMusic.pause();

	then = now;

	// Request to do this again ASAP
	requestAnimationFrame(main);
}

// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Let's play this game!
var then = Date.now();
reset();
main();

