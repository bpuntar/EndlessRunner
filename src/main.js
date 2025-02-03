// Name: Brandon Apuntar
// Game Title:
// Approximate Time spent working:
// Creative Tilt:

'use strict';


let cursors
const SCALE = 0.5
const tileSize = 35

let config = {
    type: Phaser.AUTO,
    height: 640, 
    width: 960,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: {
                x: 0,
                y: 0
            }
        }
    },
    scene: [Menu, Play]
}

let game = new Phaser.Game(config)

//reserve keyboard bindings
let keyLEFT

//set UI sizes
let borderUISize = game.config.height / 15
let borderPadding = borderUISize / 3