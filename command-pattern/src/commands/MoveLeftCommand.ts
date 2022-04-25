import Robot from "../game-objects/Robot";
import { RobotCommand } from "./RobotCommand";

export class MoveLeftCommand implements RobotCommand {

    execute(scene: Phaser.Scene, robot: Robot, onComplete: () => void): void {
        robot.moveTo(robot.x - 100, robot.y, () => {
            onComplete();
        });
    }
}