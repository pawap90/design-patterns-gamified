import Phaser from 'phaser';
import Robot from '../game-objects/Robot';
import ControllerKeys from '../utils/ControllerKeys';
import GameOverScene from './GameOverScene';

export default class GameScene extends Phaser.Scene {
    
    private controllerKeys!: ControllerKeys;

    constructor() {
        super(GameScene.name);
    }

    create(): void {
        this.controllerKeys = new ControllerKeys(this);
        
        const robot = new Robot(this, 0, 0);
        this.add.existing(robot);
        this.physics.add.existing(robot);
        robot.create();

        robot.moveTo(300, 300)
    }

    update(time: number, delta: number): void {
        super.update(time, delta);
    }


}