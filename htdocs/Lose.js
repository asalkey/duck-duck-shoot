
BasicGame.Lose = function (game) {

	this.music = null;
	this.playButton = null;

};

BasicGame.Lose.prototype = {

	create: function () {
		this.music = this.game.add.audio('play',1,true);
		this.music.play();
		
		var background = this.add.tileSprite(0, 0,this.game.world.width, this.game.world.height,'stall','bg_wood.png' );
        var backCurtain = this.add.tileSprite(0, 40, this.game.world.width, 63,'stall','curtain_top.png' );
        var treeLeft = this.add.tileSprite(75, 52, 119, 255,'stall','tree_pine.png' );
        var treeRight = this.add.tileSprite(600, 52, 119, 255,'stall','tree_pine.png' );
		var grass = this.add.tileSprite(0, 242, this.game.world.width, 200,'stall','grass2.png' );
		
		var menuText = this.game.add.text(this.game.world.centerX, this.game.world.centerY, 'You lose!', { font: "40px Pangolin", fill: "#ffffff"});
		menuText.anchor.setTo(0.5);

		this.game.add.text(this.game.world.centerX, this.game.world.centerY + 50, 'Score: ' + score, { font: "20px Pangolin", fill: "#ffffff"});

		this.game.add.text(this.game.world.centerX, this.game.world.centerY + 150, 'Press space to play again', { font: "20px Pangolin", fill: "#ffffff"});
		var space_key = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		space_key.onDown.add(this.startGame, this);
		
        //add curtains
        var leftCurtain = this.add.tileSprite(0, 0, 130,426,'stall','curtain.png' );

        var rightCurtain = this.add.tileSprite(800, 0, 130,426,'stall','curtain.png' );
        rightCurtain.scale.x *= -1;
        frontCurtain = this.add.tileSprite(0, 0,this.game.world.width, 80,'stall','curtain_straight.png' );


	},

	update: function () {
	},

	startGame: function (pointer) {
		counter = 0;
		score = 0;
		
		this.music.stop();
		this.state.start('Game');
	}

};
