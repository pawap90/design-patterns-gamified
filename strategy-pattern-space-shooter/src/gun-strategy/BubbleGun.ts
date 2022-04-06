import Bullet from '../game-objects/Bullet';
import ShipCharacter from '../game-objects/ShipCharacter';
import GunStrategy from './GunStrategy';

export default class BubbleGun implements GunStrategy {

    private bulletSpeed = 20;
    private delay = 500; 
    private lastBulletTime = 0;

    shoot(bulletGroup: Phaser.Physics.Arcade.Group, ship: ShipCharacter, scene: Phaser.Scene, time: number, delta: number): void {

        if (this.lastBulletTime + this.delay > time ) return;

        const bullet = bulletGroup.get(ship.x, ship.y, 'bullet-02') as Bullet;
        
        bullet.copyPosition(ship);
        bullet.y += ship.height / 2;

        bullet.setVelocity(this.bulletSpeed * delta, 0);

        this.lastBulletTime = time;
    }
}