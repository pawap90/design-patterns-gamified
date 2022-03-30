import Phaser from 'phaser';
import Asteroid from '../game-objects/Asteroid';
import ShipCharacter from '../game-objects/ShipCharacter';
import ControllerKeys from '../utils/ControllerKeys';

export default class InitialScene extends Phaser.Scene {
    private shipCharacter!: ShipCharacter;
    private controllerKeys!: ControllerKeys;
    private asteroids!: Phaser.Physics.Arcade.Group;

    constructor() {
        super('initial');
    }

    create(): void {
        this.controllerKeys = new ControllerKeys(this, 'wasd');
        this.shipCharacter = new ShipCharacter(this, 0, 0);
        this.shipCharacter.setCollideWorldBounds(true);

        this.asteroids = this.physics.add.group({
            classType: Asteroid,
            runChildUpdate: true
        });

        let asteroidSpeedFactor = 0;
        let asteroidSpawnDelayFactor = 0;
        let asteroidSpawnAmountFactor = 0;
        const timer = this.time.addEvent({
            callback: () => {
                // Calculate asteroid speed factor.
                asteroidSpeedFactor = Phaser.Math.MaxAdd(asteroidSpeedFactor, 1, 25);
                // Calculate asteroid amount factor.
                asteroidSpawnAmountFactor = Phaser.Math.MaxAdd(asteroidSpawnAmountFactor, 1, 30);
                // Calculate asteroid delay factor.
                asteroidSpawnDelayFactor = Phaser.Math.MaxAdd(asteroidSpawnDelayFactor, 1, 40);

                // Spawn one or more asteroids
                // Increasing the amout every 10 callbacks
                const amountToSpawn = Phaser.Math.Between(1, 2 + Math.trunc(asteroidSpawnAmountFactor / 10));
                for (let i = 0; i < amountToSpawn; i++) {
                    this.spawnNewAsteroid(asteroidSpeedFactor);                    
                }
                
                // Decrease spawn delay.
                timer.timeScale = 1 + asteroidSpawnDelayFactor * 0.01;
            },
            delay: 1000,
            loop: true
        });
    }


    update(time: number, delta: number): void {
        super.update(time, delta);

        this.shipCharacter.update(time, delta, this.controllerKeys);
    }

    private getRandomAsteroidSpawnPoint() {
        return { x: this.cameras.main.width, y: Phaser.Math.Between(20, this.cameras.main.height - 20) }
    }

    private spawnNewAsteroid(asteroidSpeedFactor: number) {
        const spawnPoint = this.getRandomAsteroidSpawnPoint();

        let newAsteroid: Asteroid;
        newAsteroid = this.asteroids.get(spawnPoint.x, spawnPoint.y);
        newAsteroid.create(18 + asteroidSpeedFactor);       
    }

}