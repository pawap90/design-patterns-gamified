export default class Asteroid extends Phaser.Physics.Arcade.Image {

    private speed = 20;
    private speedRandomFactor = 12;
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'asteroid');
    }
    
    create(baseSpeed = 20): void {
        this.body.onCollide = true;
        
        this.speed = baseSpeed + Phaser.Math.Between(this.speedRandomFactor * -1, this.speedRandomFactor);
    }
    
    update(time: number, delta: number): void {
        super.update(time, delta);

        this.setVelocity(this.speed * delta * -1, 0);
        
        if (this.x <= 0) {
            this.destroy();
        }
    }

}