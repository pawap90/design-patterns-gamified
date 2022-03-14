import { Scene } from 'phaser';

export default class ControllerKeys {

    up!: Phaser.Input.Keyboard.Key;
    down!: Phaser.Input.Keyboard.Key;
    left!: Phaser.Input.Keyboard.Key;
    right!: Phaser.Input.Keyboard.Key;
    
    jump!: Phaser.Input.Keyboard.Key;

    constructor(scene: Scene, mode?: 'default' | 'wasd') {
        if (mode === 'wasd')
            this.createWasdKeys(scene);
        else
            this.createDefaultKeys(scene);

        this.jump = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    get isAnyKeyDown(): boolean {
        return  this.up.isDown || this.down.isDown || 
                this.left.isDown || this.right.isDown;
    }

    private createDefaultKeys(scene: Scene): void {
        const cursorKeys = scene.input.keyboard.createCursorKeys();
        this.up = cursorKeys.up;
        this.down = cursorKeys.down;
        this.left = cursorKeys.left;
        this.right = cursorKeys.right;
    }
    
    private createWasdKeys(scene: Scene): void {
        this.up = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.down = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.left = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.right = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    }
}