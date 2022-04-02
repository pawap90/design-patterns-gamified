import GunStrategy from '../gun-strategy/GunStrategy';

export default class GunUpgrade extends Phaser.Physics.Arcade.Image {

    gunStrategy?: GunStrategy;
    private speed = 10;

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
        super(scene, x, y, texture);
    }

    update(time: number, delta: number): void {
        super.update(time, delta);

        this.setVelocity(this.speed * delta * -1, 0);

        if (this.x <= this.scene.physics.world.bounds.left) {
            this.destroy();
        }
    }
}