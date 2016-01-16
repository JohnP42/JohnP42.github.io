var loadState = {

	preload: function() {
		// Load Assets
    _loadText();
    _loadAudio();
    _loadImages();
    _loadSpritesheets();
    _loadScripts();
	},

	create: function() {
		// game.state.start("victoryState", true, false, "1");
    game.state.start("mainMenuState");
	}
}

function _loadText() {
  game.load.text("instructions", "fantasy-wars/game/assets/instructions.html");
};

function _loadAudio() {
  game.load.audio('move', 'fantasy-wars/game/assets/audio/SE/move.ogg');
  game.load.audio('coin', 'fantasy-wars/game/assets/audio/SE/coin.ogg');
  game.load.audio('rifle', 'fantasy-wars/game/assets/audio/SE/rifle.ogg');
  game.load.audio('capture', 'fantasy-wars/game/assets/audio/SE/capture.ogg');
  game.load.audio('battleButton', 'fantasy-wars/game/assets/audio/SE/battleButton.ogg');
  game.load.audio('select', 'fantasy-wars/game/assets/audio/SE/select.ogg');
  game.load.audio('slash', 'fantasy-wars/game/assets/audio/SE/slash.ogg');
  game.load.audio('flash', 'fantasy-wars/game/assets/audio/SE/flash.ogg');
  game.load.audio('bow', 'fantasy-wars/game/assets/audio/SE/bow.ogg');
  game.load.audio('cannonShot', 'fantasy-wars/game/assets/audio/SE/Explosion4.ogg');
  game.load.audio('mortarShot', 'fantasy-wars/game/assets/audio/SE/Explosion7.ogg');
  game.load.audio('machineGun', 'fantasy-wars/game/assets/audio/SE/machineGun.ogg');
  game.load.audio('complete', 'fantasy-wars/game/assets/audio/SE/complete.ogg');
  game.load.audio('purchase', 'fantasy-wars/game/assets/audio/SE/purchase.ogg');

};

function _loadImages() {
  game.load.image('logo', 'fantasy-wars/game/assets/logo.jpg');
  game.load.image('parchment', 'fantasy-wars/game/assets/menus/ui/parchmentBackdrop.png');
  game.load.image('bottomMenuBar', 'fantasy-wars/game/assets/menus/ui/menuBar.png');
  game.load.image('topMenuBar', 'fantasy-wars/game/assets/menus/ui/topMenuBar.png');
  game.load.image('statsMenu', 'fantasy-wars/game/assets/menus/ui/statsMenu.png');
  game.load.image('dwarfImage','fantasy-wars/game/assets/menus/images/dwarfImage.png');
  game.load.image('elfImage','fantasy-wars/game/assets/menus/images/elfImage.png');
  game.load.image('orcImage','fantasy-wars/game/assets/menus/images/orcImage.png');
  game.load.image('unitBuildScreen','fantasy-wars/game/assets/menus/ui/unitBuildScreen.png');
  game.load.image('instructions', 'fantasy-wars/game/assets/menus/ui/instructions.png');
  game.load.image('landBridgeThumb1', 'fantasy-wars/game/assets/menus/images/land_bridge.png');
  game.load.image('oceanpassThumb2', 'fantasy-wars/game/assets/menus/images/oceanpass.png');
  game.load.image('colosseumThumb3', 'fantasy-wars/game/assets/menus/images/colosseum.png');
  game.load.image('scorpionValleyThumb4', 'fantasy-wars/game/assets/menus/images/scorpion_valley.png');
};

function _loadSpritesheets() {
  game.load.spritesheet("mainMenuButtons", "fantasy-wars/game/assets/menus/buttons/mainMenuButtons.png", 193, 71);
  game.load.spritesheet("battleUIButtons", "fantasy-wars/game/assets/menus/buttons/battleUIButtons.png", 160, 64);
  game.load.spritesheet("armySelectionButtons", "fantasy-wars/game/assets/menus/buttons/armySelectionButtons.png", 224, 71);
  game.load.spritesheet('muteButton','fantasy-wars/game/assets/menus/buttons/muteButton.png', 32, 32);
  game.load.spritesheet("victoryButton", 'fantasy-wars/game/assets/menus/buttons/victoryStateButtons.png', 193, 71);

  game.load.tilemap("testmap", "fantasy-wars/game/assets/maps/FW_map_1.json", null, Phaser.Tilemap.TILED_JSON );
  game.load.tilemap("oceanPass", "fantasy-wars/game/assets/maps/Ocean_Pass.json", null, Phaser.Tilemap.TILED_JSON );
  game.load.tilemap("landBridge", "fantasy-wars/game/assets/maps/Land_Bridge.json", null, Phaser.Tilemap.TILED_JSON ); 
  game.load.tilemap("colosseum", "fantasy-wars/game/assets/maps/Colosseum.json", null, Phaser.Tilemap.TILED_JSON );
  game.load.tilemap("scorpionValley", "fantasy-wars/game/assets/maps/Scorpion_Valley.json", null, Phaser.Tilemap.TILED_JSON );
  game.load.image("tilesheet", "fantasy-wars/game/assets/maps/fantasy_wars_tilesheet.png");

  game.load.spritesheet("sprDwarves1", "fantasy-wars/game/assets/spritesheets/dwarf_units.png", 32, 32);
  game.load.spritesheet("sprDwarves2", "fantasy-wars/game/assets/spritesheets/dwarf_units2.png", 32, 32);
  game.load.spritesheet("sprElves1", "fantasy-wars/game/assets/spritesheets/elf_units.png", 32, 32);
  game.load.spritesheet("sprElves2", "fantasy-wars/game/assets/spritesheets/elf_units2.png", 32, 32);
  game.load.spritesheet("sprOrcs1", "fantasy-wars/game/assets/spritesheets/orcs_units.png", 32, 32);
  game.load.spritesheet("sprOrcs2", "fantasy-wars/game/assets/spritesheets/orcs_units2.png", 32, 32);
  game.load.spritesheet("selectionTiles", "fantasy-wars/game/assets/spritesheets/select_tiles.png", 32, 32);
  game.load.spritesheet("blue_flag", "fantasy-wars/game/assets/spritesheets/blue_flag.png", 8, 8);
  game.load.spritesheet("red_flag", "fantasy-wars/game/assets/spritesheets/red_flag.png", 8, 8);

};

function _loadScripts() {
  game.load.script('gray', 'fantasy-wars/game/phaser/filters/Gray.js');
};


