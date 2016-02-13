//Assets
var imgLaser = new Image();
imgLaser.src = "space/red-laser.png";
var imgUpgrade = new Image();
imgUpgrade.src = "space/upgrade.png";


function PlayerShip(x, y, imgSrc, imgSrc2) {

	this.x = x;
	this.y = y;
	this.img = new Image();
	this.img.src = imgSrc;
	this.img2 = new Image();
	this.img2.src = imgSrc2;
	this.imgIndex = 0;
	this.imgCount = 2;
	this.speed = 300;
	this.shots = new Array();
	this.reloading = 0;
	this.alive = true;
	this.upgraded = false;
	this.repair = new Upgrade(0,1000,200);

	this.animate = function() {
		this.imgCount--;
		if(this.imgCount === 0) {
			this.imgIndex = this.imgIndex === 0 ? 1 : 0;
			this.imgCount = 2;
		}
	}

	this.moveX = function(speed) {
		this.x += speed;
	}

	this.fire = function(mod, asteroids, peons) {

		if(this.shots[0] !== undefined && this.shots[0].timeout <= 0)
			this.shots.shift();

		if(this.reloading > 0)
			this.reloading--;

		if(32 in keysDown && this.reloading === 0) {
			this.shots.push(new Shot(this.x + 13.5, this.y, 0));
			if(this.upgraded) {
				this.shots.push(new Shot(this.x + 25.5, this.y + 17, 100));
				this.shots.push(new Shot(this.x + 1.5, this.y + 17, -100));
			}
			this.reloading = this.shots[this.shots.length - 1].reload;
		}

		for(var i = 0; i < this.shots.length; i++) {
			this.shots[i].update(mod);
			this.shots[i].collision(asteroids, peons);
		}

	}

	this.update = function(keysDown, mod, asteroids, peons) {

		this.animate();
		this.repair.update(mod);
		this.collision(asteroids);

		//Input for Moving
		if(37 in keysDown)
			this.moveX(mod * -this.speed);
		else if (39 in keysDown)
			this.moveX(mod * this.speed);
		this.clampX(1, 447);

		//Fire Weapon
		this.fire(mod, asteroids, peons);
	}

	this.collision = function(asteroids) {
		for(var i = 0; i < asteroids.length; i++) {
			if(isColliding(this.x + 8, this.y, 16, 32,
			   asteroids[i].x - asteroids[i].img.width/2, asteroids[i].y - asteroids[i].img.height/2,
			   asteroids[i].img.width, asteroids[i].img.height)) {
			   	if(this.upgraded)
			   		this.upgraded = false;
			   	else
					this.alive = false;
				asteroids[i].y = 1000;
				booms.push(new Boom(this.x, this.y));
			}
		}

		for(var i = 0; i < enemyShots.length; i++) {
			if(isColliding(this.x + 8, this.y, 16, 32,
			   enemyShots[i].x, enemyShots[i].y, enemyShots[i].img.width, enemyShots[i].img.height)) {
				if(this.upgraded)
			   		this.upgraded = false;
			   	else
					this.alive = false;
				enemyShots[i].y = 1000;
				booms.push(new Boom(this.x, this.y));
			}
		}

		if(isColliding(this.x + 8, this.y, 16, 32,
			   this.repair.x, this.repair.y, 32, 32)) {
				this.upgraded = true;
				this.repair.y = 1000;
		}
	}

	this.clampX = function(min, max) {
  		this.x = Math.min(Math.max(this.x, min), max);
	};
}

function Shot(x, y, xspeed) {
	new Audio('space/sounds/lazer.wav').play();
	this.x = x;
	this.y = y;
	this.xspeed = xspeed;
	this.img = imgLaser;
	this.speed = 1000;
	this.reload = 15;
	this.timeout = 30;

	this.update = function(mod) {
		this.y -= this.speed * mod;
		this.x += this.xspeed * mod;
		this.timeout--;
	}

	this.collision = function(asteroids, peons) {
		for(var i = 0; i < asteroids.length; i++) {
			if(isColliding(this.x, this.y, this.img.width, this.img.height,
			   asteroids[i].x - asteroids[i].img.width/2, asteroids[i].y - asteroids[i].img.height/2,
			   asteroids[i].img.width, asteroids[i].img.height)) {
			   	booms.push(new Boom(asteroids[i].x - 16, asteroids[i].y - 16));
				this.timeout = 0;
				asteroids[i].y = 512;

				if(Math.floor(Math.random() * 10) < 1 && player.repair.y > 512) {
					player.repair.x = this.x;
					player.repair.y = this.y;
					player.repair.speed = asteroids[i].speed;
				}

			}
		}

		for(var i = 0; i < peons.length; i++) {
			if(isColliding(this.x, this.y, this.img.width, this.img.height,
			   peons[i].x, peons[i].y, 32, 32)) {
			   	booms.push(new Boom(peons[i].x, peons[i].y));
				this.timeout = 0;
				peons[i].y = 1000;
			}
		}



	}
}

var isColliding = function(x1, y1, w1, h1, x2, y2, w2, h2) {
	return (x1 < x2 + w2 &&
   x1 + w1 > x2 &&
   y1 < y2 + h2 &&
   h1 + y1 > y2);
}

function Upgrade(x, y, speed) {
	this.x = x;
	this.y = y;
	this.img = imgUpgrade;
	this.speed = speed;

	this.update = function(mod) {
		this.y += this.speed * mod;
	}

}