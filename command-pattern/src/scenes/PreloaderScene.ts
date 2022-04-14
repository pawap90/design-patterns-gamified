import Phaser from 'phaser';
import GameScene from './GameScene';

export default class Preloader extends Phaser.Scene {
    constructor() {
        super(Preloader.name);
    }

    preload(): void {
        this.load.image('robot', 'assets/robot.png');
    }

    create(): void {
        this.scene.start(GameScene.name);
    }
}