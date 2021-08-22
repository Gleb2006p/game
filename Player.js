class Player extends GameObject{

    _craft;
    constructor() {
        super();
        this._x  = 300;
        this._y = 300;
        this._image = Lib.createImage("image/player/Idle.png");
        this._animation = new Lib.Animation(100, 55, 7);
        this._originalWidth = 100;
        this._originalHeight = 55;
        this._scale = 2;
        this._width = this._originalWidth * this._scale;
        this._height = this._originalHeight * this._scale;
        this._state = "idle"
        this._statesAnimation = {
            idle : Lib.createImage("image/player/Idle.png"),
            run : Lib.createImage("image/player/Run.png"),
            attack : Lib.createImage("image/player/Attack.png"),
            damaged : Lib.createImage("image/player/Damaged.png"),
            wizard : Lib.createImage("image/player/Wizarding.png"),
        }
        this._speed = 10;
        this._dx = 0;
        this._dy = 0;
        this._attackRadius =  100;
        this._weapon = new LightSword();
        this._inventory = new Inventory(this);
        this._craft = new CraftBlock(this);
        this._inventory.add(this._weapon);
        this._maxHp = 100;
        this._hp = 100;
        this._heathBar = new HealthBar();
        this._collider = new Collider(this._x, this._y, 50, this._height);
    }
    set speed(value) {
        this._speed = value;
    }
    get weapon() {
        return this._weapon;
    }
    get inventory() {
        return this._inventory;
    }
    get direction(){
        return {
            x : this._dx,
            y : this._dy,
        }
    }
    update() {
        super.update();
        this._weapon = this._inventory.getCurrentWeapon();
        this._craft.update(this);
    }
    damaged(damage){
        this._hp -= damage;
        this._heathBar.changeHitPoint(this._hp, this._maxHp);
        this._animation.animationCountToZero();
        this.newState = "damaged";
        if (this._hp <= 0){
            endGame();
        }
    }
    draw() {
        super.draw();
        this._collider.draw();
    }

    _attack(world){
        if (this._state === "attack"){
            return;
        }
        this.newState = "attack";
        this._animation.animationCountToZero();
        let monster = world.getMonsterInDiapason(this);
        if (monster !== undefined) {
            this._weapon.attack(monster);
        }
        if (this._weapon.name === "Emerald"){
            this.newState = "wizard";
            this._animation.animationCountToZero();
            this._weapon.attack(this ,world);

        }


    }
    move(direction, world){

        this._x += this._speed * this._dx * direction;
        this._y += this._speed * this._dy * direction;
        this._collider.update(this);
        if (world.checkCollision(this)){
            this._x -= this._speed * this._dx * direction;
            this._y -= this._speed * this._dy * direction;
        }
        camera.target = this.center;

    }
    setDirection(ev){
        let x = ev.clientX;
        let y = ev.clientY;

        let dx = (this._x + this._width / 2 - camera.x) - x;
        let dy = (this._y + this._height / 2 - camera.y) - y;

        let distance = Math.hypot(dx, dy);

        dx /= distance;
        dy /= distance;

        this._dx = dx;
        this._dy = dy;
    }
    onKeyDown(ev, world){
        if (ev.key === "ArrowUp"){
            this.move(-1, world);
            this.newState = "run";
            return -1;
        }
        else if (ev.key === "ArrowDown"){
            this.move(1, world);
            this.newState = "run";
            return 1;
        }
        else if (ev.keyCode === 32){
           this._attack(world);
        }
        else if (ev.key === "d"){
            let weapon = world.getWeaponInDiapason(this._x + this._width / 2, this._y + this._height / 2, this._attackRadius);
            if (weapon !== undefined){
                this._inventory.add(weapon);
                weapon.put();
            }
        }
    }

    onKeyUp(){
        if (this._state === "run") {
            this.newState = "idle";
        }
    }
    set newWeapon(weapon){
        this._inventory.add(weapon);
        this.update();
    }
    removeWeapon(weapon){
        let finder = this.inventory.remove(weapon);
        this.update();
        return finder;
    }
    inventoryContains(weapon){
       return this._inventory.isContains(weapon);
    }

}