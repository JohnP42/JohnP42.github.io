Ranger.prototype = new UnitCavalry();
Ranger.prototype.constructor = Ranger;

function Ranger(pos, player) {
  this.pos = pos;
  Phaser.Sprite.call(this, game, pos.canvasX(), pos.canvasY(), "sprElves" + player);
  game.add.existing(this);
  this.animations.add("stand", [30, 31], 2);
  this.animations.add("move", [32, 33], 8);
  this.animations.add("attack", [34, 35, 36, 37], 8);
  this.moveSound = game.add.audio("move");
  this.attackSound = game.add.audio("bow");
  this.name = "Elf Ranger";
  this.health = 100;
  this.attack = 45;
  this.defense = 0.1;
  this.speed = 8;
  this.range = [1,2];
  this.cost = 250;
  this.player = player;
}
