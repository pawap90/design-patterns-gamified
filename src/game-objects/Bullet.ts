export default class Bullet extends Phaser.Physics.Arcade.Image {

    scene: Phaser.Scene;

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
        super(scene, x, y, texture);

        this.scene = scene;
        scene.add.existing(this);
        scene.physics.add.existing(this);
    }

    update(time: number, delta: number): void {
        super.update(time, delta);

        if (this.x >= this.scene.physics.world.bounds.width) {
            this.destroy();
        }
    }
}
