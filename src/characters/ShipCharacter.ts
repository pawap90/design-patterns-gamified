import ControllerKeys from '../utils/ControllerKeys';

export default class ShipCharacter extends Phaser.Physics.Arcade.Image {

    private speed = 50;

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
    }

    update(time: number, delta: number, controllerKeys: ControllerKeys): void {
        super.update(time, delta);

        // Character controller
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
    }
}
