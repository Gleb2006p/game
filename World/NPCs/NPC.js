class  NPC extends  GameObject{
    constructor(x, y) {
        super();
        this._x = x * TILE;
        this._y = y * TILE;
        this._width = TILE;
        this._height = TILE;
        this._animation;
        this._image;
        this._statesAnimation = {
            "idle" : this._image
        };

        this._state = "idle";

    }
    onCollision(player){

    }
    draw() {
        super.draw();
    }
    onExitCollision(){

    }

}