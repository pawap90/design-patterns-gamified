import Bullet from "../game-objects/Bullet";
import ShipCharacter from "../game-objects/ShipCharacter";
import GunStrategy from "./GunStrategy";

export default class DoubleGun implements GunStrategy {

    private bulletSpeed = 50;
    private delay = 300; 
    private lastBulletTime = 0;

    Shoot(bulletGroup: Phaser.Physics.Arcade.Group, ship: ShipCharacter, scene: Phaser.Scene, time: number, delta: number): void {

        if (this.lastBulletTime + this.delay > time ) return;

        this.createBullet(bulletGroup, ship, delta);
        const bulletDown = this.createBullet(bulletGroup, ship, delta);
        bulletDown.y += ship.height;

        this.lastBulletTime = time;
    }

    private createBullet(bulletGroup: Phaser.Physics.Arcade.Group, ship: ShipCharacter, delta: number): Bullet {
        const bullet = bulletGroup.get(ship.x, ship.y, 'bullet-01') as Bullet;
        
		bullet.copyPosition(ship);
        bullet.x += ship.width / 2;

        bullet.setVelocity(this.bulletSpeed * delta, 0)
        return bullet;
    }
}