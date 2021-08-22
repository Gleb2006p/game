class Block extends GameObject{
    _char;
    constructor(x, y) {
        super();
        this._x = x * TILE;
        this._y = y * TILE;
        this._image;
        this._width = TILE;
        this._height = TILE;
        this._statesAnimation = {
            "idle": this._image
        }
        this._state = "idle";
        this._animation = new Lib.Animation(255, 255, 1);
        this._char = '';
        this._collision = false;
        this._collider = new Collider(this._x, this._y,  this._width, this._height);
    }
    get collision() {
        return this._collision;
    }
    get char() {
        return this._char;
    }


    onCollision(player, direction){
        if (this._collision){
            player.move(-direction);
        }
    }
    get x (){
        return this._x;
    }
    get y (){
        return this._y;
    }
}