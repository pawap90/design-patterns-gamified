import { Scene } from "phaser";
import Robot from "../game-objects/Robot";

export interface RobotCommand {
    execute(scene: Scene, robot: Robot, onComplete: RobotCommandOnComplete): void;
}

type RobotCommandOnComplete =  () => void;