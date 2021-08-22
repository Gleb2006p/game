class MagicWeapon extends Resource{
    constructor() {
        super();
    }
    attack(player, world){
        let bullet = this.createBullet();
        bullet.init(player.center[0], player.center[1], player.direction);
        world.addBullet(bullet);
    }
    createBullet(){

    }
}