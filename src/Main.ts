import Phaser from 'phaser';

import PreloaderScene from './scenes/PreloaderScene';
import InitialScene from './scenes/InitialScene';

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 500 }
        }
    },
    scene: [PreloaderScene, InitialScene],
    backgroundColor: '#21213B'
};

export default new Phaser.Game(config);