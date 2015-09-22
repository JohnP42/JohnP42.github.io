//Create the canvas
var canvas = document.createElement("canvas");
var context = canvas.getContext("2d");
canvas.width = 480;
canvas.height = 480;
canvas.style.background = '#000000';
canvas.tabIndex = 1;
document.getElementById("game").appendChild(canvas);

//Score
var score = document.getElementById("score");

//css
canvas.style.margin ="20px auto";
canvas.style.display = "block";

//snake part
var SnakePart = function(x, y, parent) {
	this.parent = parent;
	this.x = x;
	this.y = y;
}

//Snake Head
var snakeHead = {
	x: 8,
	y: 8,	
	dir: 'R'
};

snakeHead.body = [new SnakePart(7,8, snakeHead)];
snakeHead.grow = function() {
	var last = snakeHead.body[snakeHead.body.length - 1];
	snakeHead.body.push(new SnakePart(last.x, last.y, last));
}

//food
var food = {
	x: Math.floor(Math.random() * 16),
	y: Math.floor(Math.random() * 16)
};


//Collisions
var objectAtPoint = function(x, y, obj)
{
	var list = new Array();

	for(var part in snakeHead.body) {
		if(snakeHead.body[part].x === x && snakeHead.body[part].y === y && obj !== snakeHead.body[part])
			return snakeHead.body[part];
	}
	if(snakeHead.x === x && snakeHead.y === y && obj !== snakeHead)
		return snakeHead;

	if(food.x === x && food.y === y && obj !== food)
		return food;

	return 0;
}

food.relocate = function()
{
	do {
		food.x = Math.floor(Math.random() * 16)
		food.y = Math.floor(Math.random() * 16)
	}
	while(objectAtPoint(food.x, food.y, food) !== 0);
}

food.relocate();

//Input
var keysDown = {};

addEventListener("keydown", function(e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function(e){
	delete keysDown[e.keyCode];
}, false);

//Reset the game
var reset = function() {
	snakeHead.x = 8;
	snakeHead.y = 8;
	snakeHead.body = [new SnakePart(7,8, snakeHead)];
	snakeHead.dir = 'R';
	food.relocate();
}

var update = function (modifier) {
	//Movement
	for(var i = snakeHead.body.length - 1; i >=0; i--) {
		snakeHead.body[i].x = snakeHead.body[i].parent.x;
		snakeHead.body[i].y = snakeHead.body[i].parent.y;
	}

	if (87 in keysDown) { // Player holding up
		snakeHead.dir = 'U';
	}
	if (83 in keysDown) { // Player holding down
		snakeHead.dir = 'D';
	}
	if (65 in keysDown) { // Player holding left
		snakeHead.dir = 'L';
	}
	if (68 in keysDown) { // Player holding right
		snakeHead.dir = 'R';
	}

	switch(snakeHead.dir) {
		case 'R':
			snakeHead.x++;
			break;
		case 'L':
			snakeHead.x--;
			break;
		case 'U':
			snakeHead.y--;
			break;
		case 'D':
			snakeHead.y++;
			break;
	}

	//Collision
	if(objectAtPoint(snakeHead.x, snakeHead.y, snakeHead) === food)
	{
		snakeHead.grow();
		food.relocate();
	}
	else if(objectAtPoint(snakeHead.x, snakeHead.y, snakeHead) !== 0 ||
		(snakeHead.x < 0 || snakeHead.x >=16) || (snakeHead.y < 0 || snakeHead.y >=16))
	{
		reset();
	}

}

//Draw Everything
var render = function() {
	var s = 30;//Scale

	context.clearRect(0, 0, canvas.width, canvas.height);

	//draw snakeHead
	context.fillStyle = "#FF0000";
	context.fillRect(snakeHead.x * s, snakeHead.y * s, s, s);
	//draw Body
	for(var i = snakeHead.body.length - 1; i >=0; i--) {
		context.fillRect(snakeHead.body[i].x * s, snakeHead.body[i].y * s, s, s);
	}
	//draw food
	context.fillStyle = "#BBBBBB";
	context.fillRect(food.x * s, food.y * s, s, s);
}

var count = 10;

//The main game loop
var main = function() {

	var now = Date.now();
	var delta = now - then;

	if(document.activeElement.tagName === "CANVAS")
	{
		count--;
		if(count <= 0)
		{
			update((delta / 1000));
			render();
			count = 10;
		}

		score.innerHTML = snakeHead.body.length - 1;

	}
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

