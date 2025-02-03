// Name: Brandon Apuntar
// Game Title:
// Approximate Time spent working:
// Creative Tilt:

'use strict';

let config = {
    parent: 'myGame',
    type: Phaser.auto,
    height: 640, 
    width: 960,
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
        }
    },
    scene: [Title, Play]
}