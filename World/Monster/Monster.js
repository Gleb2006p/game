class Monster extends GameObject{

    _price;
    _weapon;
    constructor(x, y) {
        super();
        this._hp = 100;
        this._maxHp = this._hp;
        this._x = x * TILE;
        this._y = y * TILE;
        this._width = TILE;
        this._height = TILE;
        this._speed = 5;
        this._viewSize = 10;
        this.attackPause = new Pause(10);
        this._affects = [];
        this._direction = 1;
        this._lookDistance = 1000;
        this._damagePartcleSystem = new ParticleSystem(this._x, this._y, damageParticleSystem);

    }
    set speed(value) {
        this._speed = value;
    }
    get viewSize() {
        return this._viewSize;
    }
    get hp() {
        return this._hp;
    }
    set newState(state) {
        super.newState = state;
        this._animation.setAnimationCount(this._image.width / this._originalWidth - 1);
    }
    _move(player, world){
        let dx = player.center[0] - this.center[0];
        let dy = player.center[1] - this.center[1];

        let  distance = Math.hypot(dx, dy);


        dx /= distance;
        dy /= distance;
        if (distance > this._lookDistance){
            return;
        }
        this._x += dx * this._speed;
        this._y += dy * this._speed;
        this._collider.update(this);
        if (world.checkCollision(this)){
            this._x -= this._speed * dx;
            this._y -= this._speed * dy;
            this._direction = -this._direction;
        }
    }
    update(player, world){
        this._move(player, world);
        this._attack(player);
    }
    _dropPrice(world){
        for (let  resource of this._price){
            resource.drop(this);
            world.droppedWeapon = resource;
        }
    }
    onDie(player, world){
        this._dropPrice(world);
    }
    damaged(damage){
        this._animation.animationCountToZero();
        this._hp -= damage;
        if (this._hp <= 0){
            this.newState = "dead";
            return;
        }
        this.newState = "damaged";
        this._damagePartcleSystem.resume(this.center[0] - camera.x, this.center[1] - camera.y);
    }
    _attack(player){
        if (this.checkCollision(player) && this._state !== "attack" && this._state !== "damaged"){
            this.newState = "attack";
        }
        if (this.checkCollision(player) && this._state === "attack" && this._animation.isEnd()){
            this._animation.animationCountToZero();
            this._weapon.attack(player);
        }
    }
    _drawHp(){
        let widthHp = 100;
        ctx.fillStyle = "#550014";
        ctx.fillRect(this.center[0] - this._width / 4 - camera.x, this._y + this._height / 4 - camera.y,  widthHp, 10);
        ctx.fillStyle = "#ff0049";
        ctx.fillRect(this.center[0] - this._width / 4 - camera.x , this._y + this._height / 4 - camera.y, this._hp / this._maxHp * widthHp, 10);

    }
    draw() {
        super.draw();
        this._drawHp();
        this._drawAffects();
        this._applyAffects();
        this._damagePartcleSystem.draw();

    }
    addAffect(affect){
        this._affects.push(affect);
    }
    _drawAffects(){
        let i = 0;
        let size = 20;
        for (let affect of this._affects){
            ctx.drawImage(affect.image,this.center[0] - this._width / 4 - camera.x + i * size, this._y + this._height / 4 - camera.y, size, size);
            i++;
        }
    }
    _applyAffects(){
        for (let affect of this._affects){
            affect.applyAffect(this);
        }
    }

}