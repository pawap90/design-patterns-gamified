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
    }

    create(): void {
        this.scene.start(GameScene.name);
    }
}