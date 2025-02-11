class Load extends Phaser.Scene {
    constructor() {
        super('loadScene')
    }

    preload() {
        this.load.path = './assets/';
        this.load.image('starfield', 'starfield.png')
        this.load.atlas('jean_atlas', 'jeans.png', 'jeans.json')
    }

    create() {
        
        this.anims.create({
            key: 'run',
            frames: this.anims.generateFrameNames('jean_atlas', {
                prefix: 'jeans',
                suffix: '.png',
                start: 1,
                end: 10,
            }),
            framerate: 30,
            repeat: -1
        })
    
        this.scene.start('menuScene')
    }
}
