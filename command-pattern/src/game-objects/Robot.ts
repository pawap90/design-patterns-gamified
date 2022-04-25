import ControllerKeys from '../utils/ControllerKeys';

export default class Robot extends Phaser.Physics.Arcade.Image {

    private speed = 0.2;
    
    
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'robot');       
    }

    create(): void {
        this.setOrigin(0, 0);
        this.setCollideWorldBounds(true);
        this.setDepth(1);
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
    }

    moveTo(x: number, y: number, onCompleteCallback: () => void) {
        const duration = Phaser.Math.Distance.Between(this.x, this.y, x, y) / this.speed;

        this.scene.tweens.add({
            targets: this,
            x: x,
            y: y,
            ease: 'Linear',
            duration: duration,
            onComplete : () => {
                onCompleteCallback();
            }
        });
    }
}