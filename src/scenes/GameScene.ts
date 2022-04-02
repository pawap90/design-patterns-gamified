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
    private asteroidSpawnTimer!: Phaser.Time.TimerEvent;
    
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
        this.physics.add.collider(this.shipCharacter, this.asteroids, this.onAsteroidCollide, undefined, this);

        let asteroidSpeedFactor = 0;
        let asteroidSpawnDelayFactor = 0;
        let asteroidSpawnAmountFactor = 0;
        this.asteroidSpawnTimer = this.time.addEvent({
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
                this.asteroidSpawnTimer.timeScale = 1 + asteroidSpawnDelayFactor * 0.01;
            },
            delay: 1000,
            loop: true
        });

        // Add gun upgrade group.
        this.upgrades = this.physics.add.group({
            classType: GunUpgrade,
            runChildUpdate: true
        });

        // Create gun upgrade spawner.
        this.asteroidSpawnTimer = this.time.addEvent({
            callback: () => {
                this.spawnRandomUpgrade();
            },
            delay: 10 * 1000, // 10 seconds
            loop: true
        });

        this.physics.add.collider(this.shipCharacter, this.upgrades, this.onUpgradeCollide, undefined, this);
    }

    update(time: number, delta: number): void {
        super.update(time, delta);

        this.shipCharacter.update(time, delta, this.controllerKeys);
    }

    private onAsteroidCollide() {
        this.scene.pause();
        this.scene.start(GameOverScene.name);
    }

    private onBulletAsteroidCollide(bulletGameObject: GameObjects.GameObject, asteroidGameObject: GameObjects.GameObject) {
        asteroidGameObject.destroy();
        bulletGameObject.destroy();
    }
    
    private onUpgradeCollide(shipGameObject: GameObjects.GameObject, upgradeGameObject: GameObjects.GameObject) {
        const gunUpgrade = (upgradeGameObject as GunUpgrade);
        if (gunUpgrade.gunStrategy)
            (shipGameObject as ShipCharacter).setGunStrategy(gunUpgrade.gunStrategy);

        upgradeGameObject.destroy();
    }

    private getRandomRightMarginSpawnPoint() {
        return { x: this.cameras.main.width, y: Phaser.Math.Between(20, this.cameras.main.height - 20) };
    }

    private spawnNewAsteroid(asteroidSpeedFactor: number) {
        const spawnPoint = this.getRandomRightMarginSpawnPoint();

        const newAsteroid: Asteroid = this.asteroids.get(spawnPoint.x, spawnPoint.y);
        newAsteroid.create(18 + asteroidSpeedFactor);       
    }

    private spawnRandomUpgrade() {
        const randomUpgrade = this.availableUpgrades[Phaser.Math.Between(0, 2)];
        
        const spawnPoint = this.getRandomRightMarginSpawnPoint();
       
        const newUpgrade: GunUpgrade = this.upgrades.get(spawnPoint.x, spawnPoint.y, randomUpgrade.texture);
        newUpgrade.gunStrategy = randomUpgrade.strategy;
    }
}