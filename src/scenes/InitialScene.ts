import Phaser from 'phaser';
import ShipCharacter from '../game-objects/ShipCharacter';
import ControllerKeys from '../utils/ControllerKeys';

export default class InitialScene extends Phaser.Scene {
    private shipCharacter!: ShipCharacter;
    private controllerKeys!: ControllerKeys;

    constructor() {
        super('initial');
    }

    create(): void {
        this.controllerKeys = new ControllerKeys(this, 'wasd');
        this.shipCharacter = new ShipCharacter(this, 0, 0);
        this.shipCharacter.setCollideWorldBounds(true);
    }

    update(time: number, delta: number): void {
        super.update(time, delta);

        this.shipCharacter.update(time, delta, this.controllerKeys);
    }
}