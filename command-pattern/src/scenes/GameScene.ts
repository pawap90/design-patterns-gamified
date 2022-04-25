import Phaser from 'phaser';
import { MoveLeftCommand } from '../commands/MoveLeftCommand';
import { MoveRightCommand } from '../commands/MoveRightCommand';
import { RobotCommandInvoker } from '../commands/RobotCommandInvoker';
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

        const invoker = new RobotCommandInvoker(this, robot);
        invoker.add(new MoveRightCommand());
        invoker.add(new MoveLeftCommand());
        invoker.add(new MoveRightCommand());
        invoker.add(new MoveLeftCommand());
        invoker.add(new MoveRightCommand());
        invoker.add(new MoveLeftCommand());
        invoker.executeQueue();
    }

    update(time: number, delta: number): void {
        super.update(time, delta);
    }


}