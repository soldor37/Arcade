var game = new Phaser.Game(800,600,Phaser.CANVAS, 'Arcade');
var sprite;
var cursors;
var enemies;
var bullet;
var bullets;
var bulletTime = 0;
var GameState= {
	//load the game assets before the game starts
	preload: function(){
		this.load.image('background','assets/background.jpg');
		this.load.image('player','assets/Gera.png');
		this.load.image('bullet','assets/bullet.png');
		this.load.image('enemies','assets/enemy.png');

	},
	//executed after everything is loaded
	create: function(){
    //  A spacey background
    	game.add.tileSprite(0, 0, game.width, game.height, 'background');  
    	//enemies!!!!
    	enemies = game.add.group();
    	enemies.enableBody = true;
    	enemies.physicsBodyType = Phaser.Physics.ARCADE;
    	for (var i = 0; i < 50; i++)
    {
        var c = enemies.create(game.world.randomX, Math.random() * 500, 'enemies', game.rnd.integerInRange(0, 36));
        c.name = 'enemy' + i;
        c.body.immovable = true;
    }
		//  Our ships bullets
    	bullets = game.add.group();
    	bullets.enableBody = true;
    	bullets.physicsBodyType = Phaser.Physics.ARCADE;

    //  All 40 of them
    	for (var i = 0; i < 20; i++)
    {
        var b = bullets.create(0, 0, 'bullet');
        b.name = 'bullet' + i;
        b.exists = false;
        b.visible = false;
        b.checkWorldBounds = true;
        b.events.onOutOfBounds.add(resetBullet, this);
    }
    	
    	//  Our player ship
    	sprite = game.add.sprite(300, 300, 'player');
    	sprite.anchor.set(0.5,0.5);

    //  and its physics settings
    	game.physics.enable(sprite, Phaser.Physics.ARCADE);
    	sprite.body.collideWorldBounds = true;
    	sprite.body.bounce.set(0.8);
    	sprite.body.drag.set(100);
    	sprite.body.maxVelocity.set(200);

    //  Game input
    	cursors = game.input.keyboard.createCursorKeys();
    	game.input.keyboard.addKeyCapture([ Phaser.Keyboard.SPACEBAR ]);
	},
	//this is executed multiple times per second
	update: function(){
		game.physics.arcade.overlap(bullets, enemies, collisionHandler, null, this);

    sprite.body.velocity.x = 0;
    sprite.body.velocity.y = 0;

    if (cursors.left.isDown)
    {
        sprite.body.velocity.x = -300;
    }
    else if (cursors.up.isDown)
    {
        sprite.body.velocity.y = -300;
    }
    else if (cursors.down.isDown)
    {
        sprite.body.velocity.y = 300;
    }
    else if (cursors.right.isDown)
    {
        sprite.body.velocity.x = 300;
    }

    if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))
    {
        fireBullet();
    }

	}
};
function fireBullet () {

    if (game.time.now > bulletTime)
    {
        bullet = bullets.getFirstExists(false);

        if (bullet)
        {
            bullet.reset(sprite.x + 6, sprite.y - 8);
            bullet.body.velocity.y = -300;
            bulletTime = game.time.now + 150;
        }
    }

}

function resetBullet (bullet) {

    bullet.kill();

}

//  Called if the bullet hits one of the enemy sprites
function collisionHandler (bullet, enemy) {

    bullet.kill();
    enemy.kill();

}


game.state.add('GameState',GameState);
game.state.start('GameState');
