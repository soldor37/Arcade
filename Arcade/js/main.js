var game = new Phaser.Game(800,600,Phaser.CANVAS, 'Arcade');
var sprite;
var cursors;

var bullet;
var bullets;
var bulletTime = 0;
var GameState= {
	//load the game assets before the game starts
	preload: function(){
		this.load.image('background','assets/background.jpg');
		this.load.image('player','assets/Gera.png');
		this.load.image('bullet','assets/bullet.png');

	},
	//executed after everything is loaded
	create: function(){
		//  This will run in Canvas mode
    	game.renderer.clearBeforeRender = false;
    	game.renderer.roundPixels = true;

		//  We need arcade physics
    	game.physics.startSystem(Phaser.Physics.ARCADE);

    //  A spacey background
    	game.add.tileSprite(0, 0, game.width, game.height, 'background'); // поставил якорь в по центру картинки 
		//  Our ships bullets
    	bullets = game.add.group();
    	bullets.enableBody = true;
    	bullets.physicsBodyType = Phaser.Physics.ARCADE;

    //  All 40 of them
    	bullets.createMultiple(40, 'bullet');
    	bullets.setAll('anchor.x', 0.5);
    	bullets.setAll('anchor.y', 0.5);
    	//  Our player ship
    	sprite = game.add.sprite(300, 300, 'player');
    	sprite.anchor.set(0.5);

    //  and its physics settings
    	game.physics.enable(sprite, Phaser.Physics.ARCADE);

    	sprite.body.drag.set(100);
    	sprite.body.maxVelocity.set(200);

    //  Game input
    	cursors = game.input.keyboard.createCursorKeys();
    	game.input.keyboard.addKeyCapture([ Phaser.Keyboard.SPACEBAR ]);
	},
	//this is executed multiple times per second
	update: function(){
		if (cursors.up.isDown)
    {
        game.physics.arcade.accelerationFromRotation(sprite.rotation, 200, sprite.body.acceleration);
    }
    else
    {
        sprite.body.acceleration.set(0);
    }

    if (cursors.left.isDown)
    {
        sprite.body.angularVelocity = -300;
    }
    else if (cursors.right.isDown)
    {
        sprite.body.angularVelocity = 300;
    }
    else
    {
        sprite.body.angularVelocity = 0;
    }

    if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))
    {
        fireBullet();
    }

    screenWrap(sprite);

    bullets.forEachExists(screenWrap, this);

	}
};
function fireBullet () {

    if (game.time.now > bulletTime)
    {
        bullet = bullets.getFirstExists(false);

        if (bullet)
        {
            bullet.reset(sprite.body.x + 16, sprite.body.y + 16);
            bullet.lifespan = 2000;
            bullet.rotation = sprite.rotation;
            game.physics.arcade.velocityFromRotation(sprite.rotation, 400, bullet.body.velocity);
            bulletTime = game.time.now + 50;
        }
    }

}
function screenWrap (sprite) {

    if (sprite.x < 0)
    {
        sprite.x = game.width;
    }
    else if (sprite.x > game.width)
    {
        sprite.x = 0;
    }

    if (sprite.y < 0)
    {
        sprite.y = game.height;
    }
    else if (sprite.y > game.height)
    {
        sprite.y = 0;
    }

}

function render() {
}


game.state.add('GameState',GameState);
game.state.start('GameState');
