import Phaser, { GameObjects } from 'phaser';
import Asteroid from '../game-objects/Asteroid';
import GunUpgrade from '../game-objects/GunUpgrade';
import ShipCharacter from '../game-objects/ShipCharacter';
import BigGun from '../gun-strategy/BigGun';
import DoubleGun from '../gun-strategy/DoubleGun';
import SimpleGun from '../gun-strategy/SimpleGun';
import ControllerKeys from '../utils/ControllerKeys';
import GameOverScene from './GameOverScene';

export default class GameScene extends Phaser.Scene {
    private shipCharacter!: ShipCharacter;
    private controllerKeys!: ControllerKeys;

    private asteroids!: Phaser.Physics.Arcade.Group;
    
    private upgrades!: Phaser.Physics.Arcade.Group;
    private availableUpgrades = [
        { texture: 'simple-upgrade', strategy: new SimpleGun() },
        { texture: 'double-upgrade', strategy: new DoubleGun() },
        { texture: 'bubble-upgrade', strategy: new BigGun() }
    ];

    constructor() {
        super(GameScene.name);
    }

    create(): void {
        this.controllerKeys = new ControllerKeys(this, 'wasd');

        // Add character to the scene.
        this.shipCharacter = new ShipCharacter(this, 0, 0);
        this.add.existing(this.shipCharacter);
        this.physics.add.existing(this.shipCharacter);
        this.shipCharacter.create();
        this.shipCharacter.setPosition(50, (this.cameras.main.height - this.shipCharacter.height) / 2);

        // Add asteroids group.
        this.asteroids = this.physics.add.group({
            classType: Asteroid,
            runChildUpdate: true
        });
        
        // Add bullet vs asteroids collider.
        this.physics.add.collider(this.shipCharacter.bullets, this.asteroids, this.onBulletAsteroidCollide, undefined, this);

        // Add ship vs asteroids collider.
        this.physics.add.collider(this.shipCharacter, this.asteroids, this.onShipAsteroidCollide, undefined, this);

        let asteroidSpeedFactor = 0;
        this.time.addEvent({
            callback: () => {
                // Spawn one to 4 asteroids
                const amountToSpawn = Phaser.Math.Between(1, 4);
                for (let i = 0; i < amountToSpawn; i++) {
                    this.spawnNewAsteroid(20 + asteroidSpeedFactor);                    
                }

                // Increase base speed every iteration.
                asteroidSpeedFactor++;
            },
            delay: 1500,
            loop: true
        });

        // Add gun upgrade group.
        this.upgrades = this.physics.add.group({
            classType: GunUpgrade,
            runChildUpdate: true
        });

        // Create gun upgrade spawner.
        this.time.addEvent({
            callback: () => {
                this.spawnRandomUpgrade();
            },
            delay: 10 * 1000, // 10 seconds
            loop: true
        });

        // Add ship vs upgrades collider.
        this.physics.add.collider(this.shipCharacter, this.upgrades, this.onShipUpgradeCollide, undefined, this);
    }

    update(time: number, delta: number): void {
        super.update(time, delta);

        this.shipCharacter.update(time, delta, this.controllerKeys);
    }

    /** 
     * Handle collision between the spaceship and an asteroid 
     * The current scene is paused and the Game Over scene is started over it.
     * From the Game Over scene the player can restart the game.
     */
    private onShipAsteroidCollide() {
        this.scene.pause();
        this.scene.start(GameOverScene.name);
    }

    /** 
     * Handle collision between a bullet and an asteroid 
     * Both game objects are destroyed.
     */
    private onBulletAsteroidCollide(bulletGameObject: GameObjects.GameObject, asteroidGameObject: GameObjects.GameObject) {
        asteroidGameObject.destroy();
        bulletGameObject.destroy();
    }
    
    /** 
     * Handle collision between the spaceship and an upgrade 
     * The spaceship takes the new gun strategy defined in the upgrade
     * The upgrade is destroyed.
     */
    private onShipUpgradeCollide(shipGameObject: GameObjects.GameObject, upgradeGameObject: GameObjects.GameObject) {
        const gunUpgrade = (upgradeGameObject as GunUpgrade);
        if (gunUpgrade.gunStrategy)
            (shipGameObject as ShipCharacter).setGunStrategy(gunUpgrade.gunStrategy);

        upgradeGameObject.destroy();
    }

    /** 
     * Returns a random point on Y (inside the camera bounds) 
     * along with a point on X outside the camera bounds 
     */
    private getRandomRightMarginSpawnPoint() {
        return { x: this.cameras.main.width, y: Phaser.Math.Between(20, this.cameras.main.height - 20) };
    }

    /**
     * Adds a new asteroid game object to the scene.
     */
    private spawnNewAsteroid(asteroidSpeedFactor: number) {
        const spawnPoint = this.getRandomRightMarginSpawnPoint();

        const newAsteroid: Asteroid = this.asteroids.get(spawnPoint.x, spawnPoint.y);
        newAsteroid.create(asteroidSpeedFactor);       
    }

    /**
     * Adds a new upgrade game object to the scene
     */
    private spawnRandomUpgrade() {
        const randomUpgrade = this.availableUpgrades[Phaser.Math.Between(0, 2)];
        
        const spawnPoint = this.getRandomRightMarginSpawnPoint();
       
        const newUpgrade: GunUpgrade = this.upgrades.get(spawnPoint.x, spawnPoint.y, randomUpgrade.texture);
        newUpgrade.gunStrategy = randomUpgrade.strategy;
    }
}