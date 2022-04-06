import GunStrategy from '../gun-strategy/GunStrategy';
import SimpleGun from '../gun-strategy/SimpleGun';
import ControllerKeys from '../utils/ControllerKeys';
import Bullet from './Bullet';

export default class ShipCharacter extends Phaser.Physics.Arcade.Image {

    private speed = 30;
    private gunStrategy: GunStrategy;
    
    bullets!: Phaser.Physics.Arcade.Group;
    
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'spaceship');
        
        this.gunStrategy = new SimpleGun();
    }

    create(): void {
        this.setOrigin(0, 0);
        this.setCollideWorldBounds(true);
        this.setDepth(1);
        this.bullets = this.scene.physics.add.group({ classType: Bullet, runChildUpdate: true });

        // Resize body to make it more accurate for collisions.
        this.body.setSize(this.body.width * 0.8, this.body.height * 0.8);
        this.body.offset.x -= 4;
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