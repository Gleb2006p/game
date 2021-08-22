class Skeleton extends Monster{
    constructor(x, y) {
        super(x, y);
        this._originalWidth = 150;
        this._originalHeight = 150;
        this._scale = 2;
        this._initSize();
        this._animation = new Lib.Animation(150, 150, 4);
        this._image = Lib.createImage("image/Monster/Skeleton/Walk.png");
        this._statesAnimation = {
            idle : Lib.createImage("image/Monster/Skeleton/Idle.png"),
            run : Lib.createImage("image/Monster/Skeleton/Walk.png"),
            damaged : Lib.createImage("image/Monster/Skeleton/Take Hit.png"),
            attack : Lib.createImage("image/Monster/Skeleton/Attack1.png"),
            dead : Lib.createImage("image/Monster/Skeleton/Death.png"),
        };
        this._state = "run";
        this._animation.setSpeed(0.5);
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