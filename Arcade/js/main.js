
var GameState= {
	//load the game assets before the game starts
	preload: function(){
		this.load.image('background','assets/background.jpg');
		this.load.image('player','assets/Gera.png');

	},
	//executed after everything is loaded
	create: function(){
		this.background = this.game.add.sprite(0,0,'background');
		this.player = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY,'player');
		this.player.anchor.setTo(0.5,0.5);
	},
	//this is executed multiple times per second
	update: function(){

	}
};
//initiate the Phaser framework
var game = new Phaser.Game(512,512,Phaser.AUTO);

game.state.add('GameState',GameState);
game.state.start('GameState');
