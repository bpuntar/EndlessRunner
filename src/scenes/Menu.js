class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene")
    }

    preload() {
        //load images/tile sprites
        this.load.image('starfield', './assets/starfield.png')
        this.load.image('guy', './assets/guy.png')
        this.load.atlas('jean_atlas', 'jeans.png', 'jeans.json')
        this.load.image('platform', './assets/platform.png')

        //audio
        this.load.audio('start', './assets/start.wav')
        this.load.audio('jump', './assets/jump.wav')
        this.load.audio('run', './assets/run.wav')
        this.load.audio('die', './assets/die.wav')
        this.load.audio('music', './assets/music.wav')
    }
    
    create() {

        let menuConfig = {
            fontFamily: 'Optima',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
            top: 5,
            bottom: 5,
            },
            fixedWidth: 0
        }
        
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'Endless Runner', menuConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height/2, 'Filler Text', menuConfig).setOrigin(0.5)
        menuConfig.backgroundColor = '#00FF00'
        menuConfig.color = '#000'
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'Press < to start', menuConfig).setOrigin(0.5)
        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        
        //load sound
        this.startAudio = this.sound.add('start')
        // animations
        this.anims.create({
            key: 'run',
            frames: this.anims.generateFrameNames('jean_atlas', {
                prefix: 'jeans',
                start: 1,
                end: 10,
                suffix: '',
                zeroPad: 2
            }),
            framerate: 30,
            repeat: -1
        })

    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.sound.play('start', {
                volume: 0.2
            })
            this.scene.start('playScene')
            
        }
    }



}