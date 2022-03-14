import { Scene } from "phaser";
import ShipCharacter from "../game-objects/ShipCharacter";

export default interface GunStrategy {
    Shoot(bulletGroup: Phaser.Physics.Arcade.Group, ship: ShipCharacter, scene: Scene, time: number, delta: number): void;
}