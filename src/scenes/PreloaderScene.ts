import Phaser from 'phaser';
import GameScene from './GameScene';

export default class Preloader extends Phaser.Scene {
    constructor() {
        super(Preloader.name);
    }

    preload(): void {
        this.load.image('spaceship', 'assets/spaceship.png');
        
        this.load.image('bullet-01', 'assets/bullet-01.png');
        this.load.image('bullet-02', 'assets/bullet-02.png');
        
        this.load.image('asteroid', 'assets/asteroid.png');
        
        this.load.image('simple-upgrade', 'assets/simple-upgrade.png');
        this.load.image('double-upgrade', 'assets/double-upgrade.png');
        this.load.image('bubble-upgrade', 'assets/bubble-upgrade.png');
    }

    create(): void {
        this.scene.start(GameScene.name);
    }
}