import Phaser from 'phaser';

export default class InitialScene extends Phaser.Scene {
    private achoThePup!: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;

    constructor() {
        super('initial');
    }

    create(): void {

        this.add.image(400, 570, 'ground');
        this.achoThePup = this.physics.add.image(0, 0, 'acho');
        
        this.achoThePup.setCollideWorldBounds(true);
        this.achoThePup.setBounce(1, 1);
        this.achoThePup.setVelocityX(300);
    }
}