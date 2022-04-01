import BigGun from '../gun-strategy/BigGun';
import GunStrategy from '../gun-strategy/GunStrategy';
import ControllerKeys from '../utils/ControllerKeys';
import Bullet from './Bullet';

export default class ShipCharacter extends Phaser.Physics.Arcade.Image {

    private speed = 50;
    private bullets!: Phaser.Physics.Arcade.Group;
    private gunStrategy: GunStrategy;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'spaceship');

        this.gunStrategy = new BigGun();
    }

    create(): void {
        this.setOrigin(0, 0);
        this.setCollideWorldBounds(true);
        this.setDepth(1);
        this.bullets = this.scene.physics.add.group({ classType: Bullet, runChildUpdate: true });
    }

    update(time: number, delta: number, controllerKeys: ControllerKeys): void {
        super.update(time, delta);

        // Character movement.
        const speed = { x: 0, y: 0 };

        if (controllerKeys.left.isDown)
            speed.x = -1 * this.speed * delta;

        if (controllerKeys.right.isDown)
            speed.x = 1 * this.speed * delta;

        if (controllerKeys.up.isDown)
            speed.y = -1 * this.speed * delta;

        if (controllerKeys.down.isDown)
            speed.y = 1 * this.speed * delta;

        this.setVelocity(speed.x, speed.y);

        // Shooting controller.
        if (controllerKeys.shoot.isDown)
            this.shootGun(time, delta);
    }

    /**
     * Shoots using the currently selected gun strategy.
     */
    shootGun(time: number, delta: number): void {
        this.gunStrategy.shoot(this.bullets, this, this.scene, time, delta);
    }

    /**
     * Sets a new gun strategy to use.
     */
    setGunStrategy(newStrategy: GunStrategy): void {
        this.gunStrategy = newStrategy;
    }
}