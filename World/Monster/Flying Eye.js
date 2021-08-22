class FlyingEye extends Monster{
    constructor(x, y) {
        super(x, y);
        this._originalWidth = 150;
        this._originalHeight = 150;
        this._scale = 2;
        this._initSize();
        this._animation = new Lib.Animation(150, 150, 4);
        this._image = Lib.createImage("image/Monster/FlyingEye/Flight.png");
        this._statesAnimation = {
            idle : Lib.createImage("image/Monster/FlyingEye/Flight.png"),
            run : Lib.createImage("image/Monster/FlyingEye/Flight.png"),
            damaged : Lib.createImage("image/Monster/FlyingEye/Take Hit.png"),
            attack : Lib.createImage("image/Monster/FlyingEye/Attack1.png"),
            dead : Lib.createImage("image/Monster/FlyingEye/Death.png"),
        };
        this._state = "run";
        this._weapon = new Sword();
        this._price = [new MonsterEye()];
        this._collider = new Collider(this._x, this._y, 25 * 5, 25 * 4);
    }
    _update() {
        super._update();
        if (this._state !== "damaged"){
            this.newState = "run";
        }
    }

}