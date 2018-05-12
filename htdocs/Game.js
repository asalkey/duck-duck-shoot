BasicGame.Game = function (game) {
	//	When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:

    this.game;		//	a reference to the currently running game
    this.add;		//	used to add sprites, text, groups, etc
    this.camera;	//	a reference to the game camera
    this.cache;		//	the game cache
    this.input;		//	the global input manager (you can access this.input.keyboard, this.input.mouse, as well from it)
    this.load;		//	for preloading assets
    this.math;		//	lots of useful common math operations
    this.sound;		//	the sound manager - add a sound, play one, set-up markers, etc
    this.stage;		//	the game stage
    this.time;		//	the clock
    this.tweens;    //  the tween manager
    this.state;	    //	the state manager
    this.world;		//	the game world
    this.particles;	//	the particle manager
    this.physics;	//	the physics manager
    this.rnd;		//	the repeatable random number generator

    //	You can use any of these from any function within this State.
    //	But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.

};

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 400;
var water1;
var water2;
var crosshair;
var targetBrownDuck;
var ducks = [ 'duck_outline_target_yellow.png', 
              'duck_outline_yellow.png', 
              'duck_outline_target_brown.png',
              'duck_outline_brown.png'];
var topDuckGroup;
var topDuckChild;
var bottomDuckGroup;
var bottomDuckChild;
var duckhit;
var counterText;
var scoreText;
var levelText;
var counter = 0;
var score = 0;
var lives = 2;
var wrong;
var level = 1;
var levelSpeed = 7000;
var music;
var topDuckTween;


BasicGame.Game.prototype = {

	create: function () {
        //sounds
        duckhit = this.game.add.audio('duckhit');
        wrong = this.game.add.audio('wrong');
        music = this.game.add.audio('play',1,true);
        music.play();

        //some items for the stage
        var background = this.add.tileSprite(0, 0,CANVAS_WIDTH, CANVAS_HEIGHT,'stall','bg_wood.png' );
        var backCurtain = this.add.tileSprite(0, 40, CANVAS_WIDTH, 63,'stall','curtain_top.png' );
        var treeLeft = this.add.tileSprite(75, 52, 119, 255,'stall','tree_pine.png' );
        var treeRight = this.add.tileSprite(600, 52, 119, 255,'stall','tree_pine.png' );
        var grass = this.add.tileSprite(0, 242, CANVAS_WIDTH, 200,'stall','grass2.png' );

        //create ducks for top row
        topDuckGroup = this.game.add.group();

        for (var i = 0; i < 4; i++) {
            rndDuck = Math.floor(Math.random() * 3) + 0;  
            topDuckChild = topDuckGroup.create( 150 + (i*210) ,  325,'objects', ducks[rndDuck]);
            topDuckChild.anchor.setTo(1, 1);
            topDuckChild.inputEnabled = true;
            topDuckChild.events.onInputDown.add(this.duckClick, this);
        }

        //add water
        water1 = this.add.tileSprite(0, 280, CANVAS_WIDTH, 224,'stall','water1.png' );
        
        //create ducks for bottom row
        bottomDuckGroup = this.game.add.group();

        for (var i = 0; i < 3; i++) {
            rndDuck = Math.floor(Math.random() * 3) + 0;
            bottomDuckChild = bottomDuckGroup.create(250 + (i*200) , 365,'objects', ducks[rndDuck]);
            bottomDuckChild.anchor.setTo(1, 1);
            bottomDuckChild.inputEnabled = true;
            bottomDuckChild.events.onInputDown.add(this.duckClick, this);
        }

        //add water
        water2 = this.add.tileSprite(0, 318, CANVAS_WIDTH, 223,'stall','water2.png' );

        //add curtains
        var leftCurtain = this.add.tileSprite(0, 0, 130,426,'stall','curtain.png' );

        var rightCurtain = this.add.tileSprite(800, 0, 130,426,'stall','curtain.png' );
        rightCurtain.scale.x *= -1;
        frontCurtain = this.add.tileSprite(0, 0,CANVAS_WIDTH, 80,'stall','curtain_straight.png' );

        //top HUD with score, time, and lives
        counterText = this.game.add.text(this.game.world.width - 200, 10, 'Time:' + counter, { font: "34px Pangolin", fill: "#ffffff", align: "right" });
        scoreText = this.game.add.text(this.game.world.width - 600, 10, 'Score:' + score, { font: "34px Pangolin", fill: "#ffffff", align: "left" });
        levelText = this.game.add.text(this.game.world.width - 400, 10, 'Level:' + level, { font: "34px Pangolin", fill: "#ffffff", align: "left" });

        this.game.time.events.loop(Phaser.Timer.SECOND, this.updateCounter, this);

        livesGroup = this.game.add.group();

        for (var i = 0; i < 3; i++) {
            livesChild = livesGroup.create(50 + (i * 40), 60,'hud', 'text_cross.png');
            livesChild.anchor.setTo(1, 1);
        }


	},

	update: function () {
        //animate water
        water1.tilePosition.x -= 1;
        water2.tilePosition.x += 1;

        //animate ducks
        bottomDuckGroup.position.x +=level;
        topDuckGroup.position.x +=level;

        //start bottom ducks from beginning
        if(bottomDuckGroup.position.x > 700){
            bottomDuckGroup.position.x = 0;
        }

        //start top ducks from beginning
        if(topDuckGroup.position.x > 700){
            topDuckGroup.position.x = 0;
        }

        // are we starting from the beginning? 
        if(bottomDuckGroup.position.x < 2){
            bottomDuckGroup.children.forEach(function(element) {
                var str = element.animations.currentFrame.name;
                var isShot = str.includes("back");
                
                // if a duck is hit vars get a new random duck
                rndDuck = Math.floor(Math.random() * 3) + 0;
                if(isShot){
                    element.loadTexture('objects',ducks[rndDuck],0);
                }
            });
        }

        // are we starting from the beginning? 
        if(topDuckGroup.position.x < 2){
            topDuckGroup.children.forEach(function(element) {
                var str = element.animations.currentFrame.name;
                var isShot = str.includes("back");
                
                // if a duck is hit vars get a new random duck
                rndDuck = Math.floor(Math.random() * 3) + 0;
                if(isShot){
                    element.loadTexture('objects',ducks[rndDuck],0);
                }
            });
        }

        if(lives < 0){
            music.stop();
            this.state.start('Lose');
        }

        if(counter == 20 && level == 6){
            music.stop();
            this.state.start('Win');
        }else if (counter == 20){
            counter = 0;
            level += 1;
            levelText.text = 'Level: ' + level;
        }

    },
    
    updateCounter: function () {
        counter++;
        counterText.setText('Time: ' + counter);
    },

    duckClick(object, pointer) {
        var str = object.animations.currentFrame.name;
        var isTarget = str.includes("target");
        
        if(isTarget){
          // the correct duck has been hit
          duckhit.play();
          object.loadTexture('objects','duck_outline_back.png',0);
          score += 10;
          scoreText.text = 'Score: ' + score;
        }else{
          wrong.play();
          livesGroup.children[lives].kill();
          lives -= 1;
            //subtract points
            //lose a life
        }
      
    }
};


