import DoubleGun from '../gun-strategy/DoubleGun';
import GunStrategy from '../gun-strategy/GunStrategy';
import SimpleGun from '../gun-strategy/SimpleGun';
import ControllerKeys from '../utils/ControllerKeys';
import Bullet from './Bullet';

export default class ShipCharacter extends Phaser.Physics.Arcade.Image {

    private speed = 50;
    private bullets: Phaser.Physics.Arcade.Group;
    private gunStrategy: GunStrategy;
    

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'spaceship');

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setOrigin(0, 0);
        this.setCollideWorldBounds(true);
        this.setPosition(0, (scene.cameras.main.height - this.height) / 2);
        this.setBounce(0, 0.5);
        this.setMaxVelocity(500, undefined);
        this.setVelocityX(this.speed);
        this.setDepth(1);

        this.bullets = scene.physics.add.group({ classType: Bullet, runChildUpdate: true });
        this.gunStrategy = new DoubleGun();
    }

    update(time: number, delta: number, controllerKeys: ControllerKeys): void {
        super.update(time, delta);

        // Character movement
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

        if (controllerKeys.shoot.isDown)
            this.ShootGun(time, delta);
    }

    ShootGun(time: number, delta: number): void {
        this.gunStrategy.Shoot(this.bullets, this, this.scene, time, delta);
    }
}
