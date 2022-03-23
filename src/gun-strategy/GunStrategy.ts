import { Scene } from 'phaser';
import ShipCharacter from '../game-objects/ShipCharacter';

interface GunStrategy {
    shoot(bulletGroup: Phaser.Physics.Arcade.Group, ship: ShipCharacter, scene: Scene, time: number, delta: number): void
}

export default GunStrategy;