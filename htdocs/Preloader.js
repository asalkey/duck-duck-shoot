
BasicGame.Preloader = function (game) {

	this.background = null;
	this.preloadBar = null;

	this.ready = false;

};

BasicGame.Preloader.prototype = {

	preload: function () {

      this.background = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'preloaderImage');
      this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'preloaderText');
      this.load.setPreloadSprite(this.preloadBar);

      this.game.stage.backgroundColor = '#66CEFF';
  
    // Game assets
      this.game.load.atlasJSONHash('stall', 'assets/spritesheet_stall.png', 'assets/spritesheet_stall.json');
      this.game.load.atlasJSONHash('hud', 'assets/spritesheet_hud.png', 'assets/spritesheet_hud.json');
      this.game.load.atlasJSONHash('objects', 'assets/spritesheet_objects.png', 'assets/spritesheet_objects.json');
      this.game.load.atlasJSONHash('box', 'assets/spritesheet_box.png', 'assets/spritesheet_box.json');
    //"Alto Gong, Metal Hit, B (H6 XY).wav" by InspectorJ of Freesound.org
      this.game.load.audio('duckhit', 'assets/duckhit.wav');
    //Error.wav by Autistic Lucario of Freesound.org
      this.game.load.audio('wrong', 'assets/error.wav');
    //Old Mo by Yubatake https://opengameart.org/content/old-mo
      this.game.load.audio('play', ['assets/music.ogg']);



	},

	create: function () {
    this.preloadBar.cropEnabled = false;
		this.state.start('MainMenu');
	},

};
