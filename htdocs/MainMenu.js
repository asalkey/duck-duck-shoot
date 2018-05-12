
BasicGame.MainMenu = function (game) {
	this.music = null;
};

BasicGame.MainMenu.prototype = {
 
	create: function () {
		this.music = this.game.add.audio('play',1,true);
		this.music.play();
		
		var background = this.add.tileSprite(0, 0,this.game.world.width, this.game.world.height,'stall','bg_wood.png' );
        var backCurtain = this.add.tileSprite(0, 40, this.game.world.width, 63,'stall','curtain_top.png' );
        var treeLeft = this.add.tileSprite(75, 52, 119, 255,'stall','tree_pine.png' );
        var treeRight = this.add.tileSprite(600, 52, 119, 255,'stall','tree_pine.png' );
		var grass = this.add.tileSprite(0, 242, this.game.world.width, 200,'stall','grass2.png' );
		
		var menuText = this.game.add.text(this.game.world.centerX, this.game.world.centerY, 'Duck Duck Shoot', { font: "40px Pangolin", fill: "#ffffff"});
		menuText.anchor.setTo(0.5);
		this.game.add.sprite(this.game.world.centerX, this.game.world.centerY + 15,'objects', 'duck_outline_target_yellow.png');
		this.game.add.text(this.game.world.centerX + 130, this.game.world.centerY + 20, 'aim for the ducks\n with targets', { font: "15px Pangolin", fill: "#ffffff"});
		this.game.add.text(this.game.world.centerX, this.game.world.centerY + 150, 'Press space to play', { font: "20px Pangolin", fill: "#ffffff"});
		var space_key = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		space_key.onDown.add(this.startGame, this);
		
        //add curtains
        let leftCurtain = this.add.tileSprite(0, 0, 130,426,'stall','curtain.png' );

        let rightCurtain = this.add.tileSprite(800, 0, 130,426,'stall','curtain.png' );
        rightCurtain.scale.x *= -1;
        frontCurtain = this.add.tileSprite(0, 0,CANVAS_WIDTH, 80,'stall','curtain_straight.png' );
	},

	update: function () {

	},

	startGame: function (pointer) {
		this.music.stop();
		this.state.start('Game');
	}

};
