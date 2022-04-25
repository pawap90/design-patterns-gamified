import { Scene } from "phaser";
import Robot from "../game-objects/Robot";
import { RobotCommand } from "./RobotCommand";

export class RobotCommandInvoker {

    private commandQueue: RobotCommand[] = [];
    private robot: Robot;
    private scene: Scene;

    constructor(scene: Scene, robot: Robot) {
        this.scene = scene;
        this.robot = robot;
    }

    add(command: RobotCommand) {
        this.commandQueue.push(command);
    }

    /**
     * Executes commands in order until the queue is empty.
     */
    executeQueue() {
        if (this.commandQueue.length > 0) {
            this.commandQueue.shift()?.execute(this.scene, this.robot, () => {
                this.executeQueue();
            });
        }
    }
}