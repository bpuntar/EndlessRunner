class Play extends Phaser.Scene {
    constructor() {
        super('playScene');
    }

    init() {
        this.JUMP_VELOCITY = -600
        this.MAX_JUMPS = 3
        this.physics.world.gravity.y = 2600
        this.gameOver = false;
    }

    create() {
        // make music
        this.music = this.sound.add('music', {
            loop: true, 
            volume: 0.5
        })
        this.music.play();


        // scrolling background
        this.starfield = this.add.tileSprite(0, 0, 0, 0, 'starfield').setOrigin(0)
        
        //make ground tiles group
        //code used from Movement Studies by Nathan Altice
        this.ground = this.physics.add.staticGroup()
        for(let i = 0; i < game.config.width; i += tileSize) {
            let groundTile = this.ground.create(i, game.config.height - tileSize, 'platform').setScale(SCALE).setOrigin(0)
            groundTile.body.immovable = true
            groundTile.body.allowGravity = false
            this.ground.add(groundTile)
        }

        //ground disappear
        this.time.delayedCall(5000, this.removeGround, [], this);

        // add player and sizes
        this.guy = this.physics.add.sprite(120, 0, 0, 0, 'jean_atlas').setOrigin(0)
        this.guy.setSize(60, 60)
        this.guy.setOffset(0, 0)

        // add platform obstacles and parameters
        this.platforms = this.physics.add.group({
            immovable: true,
            allowGravity: false
        });

        this.time.addEvent({
            delay: 950,
            callback: this.addPlatform,
            callbackScope: this,
            loop: true
        });

        //phaser provided cursor key input
        cursors = this.input.keyboard.createCursorKeys()

        // physics collider
        this.physics.add.collider(this.guy, this.ground)
        this.physics.add.collider(this.guy, this.platforms)

        this.gameOverText = this.add.text(game.config.width / 2, game.config.height / 2, 'GAME OVER', {
            fontSize: '64px',
            fill: '#ff0000'
        }).setOrigin(0.5).setAlpha(0)
        
        this.restartText = this.add.text(game.config.width / 2, game.config.height / 2 + 80, 'Press ^ to Restart', {
            fontSize: '32px',
            fill: '#ff0000'
        }).setOrigin(0.5).setAlpha(0);

        //timer
        this.timeLived = 0
        this.timerText = this.add.text(game.config.width/2, 50, 'Time Survived: 0s', {

            fontSize: '40px',
            color: '#0000FF'
        }).setOrigin(0.5, 0)


        this.timer = this.time.addEvent({
            delay: 1000,
            callback: () => {
                if (!this.gameOver) {
                    this.timeLived++;
                    this.timerText.setText('Time Survived:' + this.timeLived + 's')
                }
            },
            callbackScope: this,
            loop: true
        })

        //instructions
        this.instructions = this.add.text(game.config.width / 2, game.config.height / 2 - 100, 'Press UP Arrow to Jump, the ground will disappear soon! You have 3 jumps', {
            fontSize: '20px',
            fill: '#0000FF'
        }).setOrigin(0.5, 0.5);

        //make them go away after 5 seconds
        this.time.delayedCall(5000, () => {
            this.instructions.setAlpha(0);
        }, [], this);
    }

    addPlatform() {
        const platformHeight = Phaser.Math.Between(100, 500);
        const speed = Phaser.Math.Between(200, 400);

        const platform = this.physics.add.sprite(800, platformHeight, 'platform');
        platform.setSize(200, 20);
        platform.setOrigin(0.5, 0.5);

        platform.setVelocityX(-speed);
        platform.body.allowGravity = false;
        platform.setImmovable(true);
        platform.speed = speed;

        
        this.platforms.add(platform);
    }

    removeGround() {
        this.ground.clear(true, true);
    }

    update() {

        // Restart
        if (this.gameOver) {
            if (Phaser.Input.Keyboard.JustDown(cursors.up)) {
                this.scene.restart(); 
            }
            return; 
        }
    
        // scrolling background speed
        this.starfield.tilePositionX +=9

		// jump system taken from nathan altice movement studies
	    this.guy.isGrounded = this.guy.body.touching.down
	    
	    if(this.guy.isGrounded) {
            this.guy.anims.play('run', true)

	    	this.jumps = this.MAX_JUMPS
	    	this.jumping = false
	    }

	    if(this.jumps > 0 && Phaser.Input.Keyboard.DownDuration(cursors.up, 150)) {
            this.sound.play('jump', {
                volume: 0.1
            })
	        this.guy.body.velocity.y = this.JUMP_VELOCITY
	        this.jumping = true

        }

        if(this.jumping && Phaser.Input.Keyboard.UpDuration(cursors.up)) {

	    	this.jumps--
	    	this.jumping = false
	    }

        //check if player in bounds
        if (this.guy.y > game.config.height || this.guy.x < 0 || this.guy.x > game.config.width) {
            this.gameOverScreen();
            this.sound.play('die',{
                volume: 0.2
            })
            this.music.stop();
            this.timer.paused = true
        }
        
        //platform destroy
        this.platforms.children.iterate(platform => {
            if (platform) {
                platform.setVelocityX(-platform.speed);
            if (platform.x < -platform.width) {
                platform.destroy();
            }
        }
        })

        //game over
        if (this.gameOver) return;

    
    }

    gameOverScreen() {
        this.gameOver = true;
        this.gameOverText.setAlpha(1);
        this.restartText.setAlpha(1);
    }


}
