var imgAsteroid = new Image();
imgAsteroid.src = "space/asteroid.png";
var imgPeon = new Image();
imgPeon.src = "space/enemy1.png";
var imgLaserY = new Image();
imgLaserY.src = "space/yellow-laser.png";
var imgBeamer = new Image();
imgBeamer.src = "space/enemy2.png";
var imgLaserV = new Image();
imgLaserV.src = "space/violet-laser.png";

function Asteroid() {
	this.x = Math.random() * 480;
	this.y = -16;
	this.r = Math.random() * 360;
	this.img = imgAsteroid;
	this.rDir = Math.floor(Math.random() * 2) * -2 + 1;
	this.speed = Math.floor(Math.random() * 100) + 200;

	this.update = function(mod) {
		this.y += this.speed * mod;
		this.r += this.rDir;
	}

}

function Peon() {
	this.x = Math.random() * 448;
	this.y = -32;
	this.img = imgPeon;
	this.speed = Math.floor(Math.random() * 50) + 100;
	this.moveDown = Math.floor(Math.random() * 300) + 100;
	this.dirX = 1;
	this.reloading = 0;

	this.update = function(mod) {
		if(this.moveDown > this.y)
			this.y += this.speed * mod * 4;
		else {
			if((this.x <= 0 && this.dirX === -1) || (this.x >= 448 && this.dirX === 1))
				this.dirX *= -1;

			this.x += this.speed * this.dirX * mod;
			this.fire(mod);
		}
	}

	this.fire = function(mod) {

		if(enemyShots[0] !== undefined && enemyShots[0].timeout <= 0)
			enemyShots.shift();

		if(this.reloading > 0)
			this.reloading--;

		if(this.reloading === 0) {
			enemyShots.push(new ShotE(this.x + 13, this.y, -.25));
			enemyShots.push(new ShotE(this.x + 13, this.y, .25));
			this.reloading = enemyShots[enemyShots.length - 1].reload;
		}
	}

}

Beamer.prototype = new Peon();
Beamer.prototype.constructor=Beamer;
function Beamer() {
	this.img = imgBeamer;
	this.charging = 0;
	this.shotCount = 0;
	this.waitTime = 100;
	this.imgCount = 5;
	this.imgIndex = 0;
	this.moveDown = Math.floor(Math.random() * 150) + 50;
	this.vspeed = 0;
	this.vDir = 5;
	this.speed = Math.floor(Math.random() * 100) + 150;

	this.update = function(mod) {
		if(this.moveDown > this.y)
			this.y += this.speed * mod * 4;
		else {

			if(this.waitTime > 0)
			{
				this.imgIndex = 0;
				this.waitTime--;
				if(this.vspeed >= 200 && this.vDir === 5)
					this.vDir = -5;
				else if(this.vspeed <= -200 && this.vDir === -5)
					this.vDir = 5;
				this.vspeed += this.vDir;

				this.y += this.vspeed * mod;

				if((this.x <= 0 && this.dirX === -1) || (this.x >= 448 && this.dirX === 1))
					this.dirX *= -1;

				this.x += this.speed * this.dirX * mod;

				if(this.waitTime === 0) {
					this.charging = 50;
					this.shotCount = 20;
				}
			}
			else {
				if(this.charging > 0) {
					this.charging--;
					this.animate();
				}
				else {
					this.imgIndex = 1;
					this.fire(mod);
					if(this.shotCount <= 0) {
						this.charging = 0;
						this.shotCount = 0;
						this.waitTime = 100;
					}
				}

			}
		}
	}

	this.animate = function() {
		this.imgCount--;
		if(this.imgCount === 0) {
			this.imgIndex = this.imgIndex < 3 ? this.imgIndex + 1 : 1;
			this.imgCount = 5;
		}
	};

	this.fire = function(mod) {

		if(enemyShots[0] !== undefined && enemyShots[0].timeout <= 0)
			enemyShots.shift();

		if(this.reloading > 0)
			this.reloading--;

		if(this.reloading === 0) {
			enemyShots.push(new ShotV(this.x + 13, this.y, 0));
			this.reloading = enemyShots[enemyShots.length - 1].reload;
			this.shotCount--;
		}
	};
}

function ShotE(x, y, d) {
	new Audio('space/sounds/lazer2.wav').play();
	this.x = x;
	this.y = y;
	this.img = imgLaserY;
	this.speed = 500;
	this.reload = 100;
	this.timeout = 50;
	this.d = d;

	this.update = function(mod) {
		this.y += this.speed * mod;
		this.x += this.speed * mod * d;
		this.timeout--;
	};

}

function ShotV(x, y, d) {
	new Audio('space/sounds/lazer2.wav').play();
	this.x = x;
	this.y = y;
	this.img = imgLaserV;
	this.speed = 1000;
	this.reload = 5;
	this.timeout = 50;

	this.update = function(mod) {
		this.y += this.speed * mod;
		this.timeout--;
	};
}