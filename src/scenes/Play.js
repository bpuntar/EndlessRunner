class Play extends Phaser.Scene {
    constructor() {
        super('playScene');
    }

    init() {
        this.JUMP_VELOCITY = -600
        this.MAX_JUMPS = 3
        this.physics.world.gravity.y = 2600
    }

    create() {
        // scrolling background
        this.starfield = this.add.tileSprite(0, 0, 0, 0, 'starfield').setOrigin(0)
        
        //make ground tiles group
        this.ground = this.add.group()
        for(let i = 0; i < game.config.width; i += tileSize) {
            let groundTile = this.physics.add.sprite(i, game.config.height - tileSize, 'platformer_atlas', 'block').setScale(SCALE).setOrigin(0)
            groundTile.body.immovable = true
            groundTile.body.allowGravity = false
            this.ground.add(groundTile)
        }

        // add player
        this.guy = this.physics.add.sprite(120, 0, 0, 0, 'guy').setOrigin(0)

        //phaser provided cursor key input
        cursors = this.input.keyboard.createCursorKeys()

        // physics collider
        this.physics.add.collider(this.guy, this.ground)
    }

    update() {
        // scrolling background speed
        this.starfield.tilePositionX +=15

		// jump system taken from nathan altice movement studies
	    this.guy.isGrounded = this.guy.body.touching.down
	    
	    if(this.guy.isGrounded) {
	    	this.jumps = this.MAX_JUMPS
	    	this.jumping = false
	    }

	    if(this.jumps > 0 && Phaser.Input.Keyboard.DownDuration(cursors.up, 150)) {
	        this.guy.body.velocity.y = this.JUMP_VELOCITY
	        this.jumping = true

        }

        if(this.jumping && Phaser.Input.Keyboard.UpDuration(cursors.up)) {
	    	this.jumps--
	    	this.jumping = false
	    }
        
    
    }
}