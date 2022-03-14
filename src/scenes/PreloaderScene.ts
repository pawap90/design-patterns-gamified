import Phaser from 'phaser';

export default class Preloader extends Phaser.Scene {
    constructor() {
        super('preloader');
    }

    preload(): void {
        this.load.image('spaceship', 'assets/spaceship.png');
    }

    create(): void {
        this.scene.start('initial');
    }
}