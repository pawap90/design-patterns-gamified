import Phaser, { GameObjects } from 'phaser';
import ControllerKeys from '../utils/ControllerKeys';
import GameOverScene from './GameOverScene';

export default class GameScene extends Phaser.Scene {
    
    private controllerKeys!: ControllerKeys;

    constructor() {
        super(GameScene.name);
    }

    create(): void {
        this.controllerKeys = new ControllerKeys(this);

    }

    update(time: number, delta: number): void {
        super.update(time, delta);
    }


}