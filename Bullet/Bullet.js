class Bullet extends GameObject{
    constructor() {
        super();
        this._x = 0;
        this._y = 0;
        this._direction = {
            x : 0,
            y : 0
        };
        this._damage = 0;
        this._speed = 5;
        this._originalWidth = 100;
        this._originalHeight = 100;
        this._scale = 1;
        this._speed = 20;
        this._size = 20;
        this._width = this._size;
        this._height = this._size;
        this._collider = new Collider(0, 0, this._size, this._size);
    }
    init(x, y, direction){
        this._x = x;
        this._y = y;
        this._direction = direction;
    }
    draw(){
        ctx.fillStyle = "#b71c1c";
        ctx.strokeStyle = "#e53835";
        ctx.beginPath();
        ctx.arc(this.center[0] - camera.x, this.center[1] - camera.y, this._size / 2, 0, Math.PI * 2);
        ctx.fill();
        this._collider.update(this);
        this._collider.draw();

    }
    _move(i, world){
        this._x -= this._direction.x * this._speed;
        this._y -= this._direction.y * this._speed;
        if (world.checkCollision(this)){
            world.destroyBullet(i);
        }
    }
    update(i, world){
        this._move(i, world);
        this._attack(i, world);
    }
    _attack(i, world){
        let monster = world.getMonsterInDiapason(this);
        if (monster !== undefined){
            monster.damaged(this._damage);
            world.destroyBullet(i);
        }
    }
}