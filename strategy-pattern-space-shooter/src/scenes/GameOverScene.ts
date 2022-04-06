import Phaser from 'phaser';
import GameScene from './GameScene';

export default class GameOverScene extends Phaser.Scene {
    
    constructor() {
        super(GameOverScene.name);
    }

    create(): void {
        this.input.keyboard.on('keydown-ENTER', () => {
            this.scene.stop();
            this.scene.get(GameScene.name).scene.restart();
        });

        const text = this.add.text(100, 100, 'GAME OVER - PRESS ENTER TO RESTART');
        const cameraSize = { width: this.cameras.main.width, height: this.cameras.main.height };
        text.setPosition(cameraSize.width / 2 - text.width / 2, 200);
    }
}