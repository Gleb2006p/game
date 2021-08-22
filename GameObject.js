class GameObject{
    _x;
    _y;
    _image;
    _animation;
    _width;
    _height;
    _state;
    _statesAnimation;
    _speed;
    _collider;
    _originalWidth;
    _originalHeight;
    _scale;
    constructor() {
        this._x;
        this._y;
        this._image;
        this._animation;
        this._width;
        this._height;
        this._state;
        this._statesAnimation;
        this._originalWidth = 100;
        this._originalHeight = 100;
        this._scale = 1;
        this._speed = 10;
        this._collider = new Collider(0, 0, 255, 255);
    }
    draw(){

        let rectangle = this._animation.next();
        ctx.drawImage(this._image, rectangle[0], rectangle[1], rectangle[2], rectangle[3], this._x - camera._x, this._y - camera.y ,this._width, this._height);
        if (rectangle[4]){
            if (this._state === "attack" || this._state === "damaged" || this._state === "wizard"){
                this._animation.animationCountToZero();
                this.newState = "run";
            }
        }
        this._collider.update(this);
        this._collider.draw();
    }
    get center(){
        return [this._x + this._width / 2, this._y + this._height / 2];
    }
    set newState(state){
        if (this._statesAnimation[state] === undefined){
            throw  new Error("Broken State");
        }
        this._state = state;
        this._image = this._statesAnimation[state];
    }
    update(player, world) {

    }
    checkCollision(other){
        return this._collider.checkCollision(other.collider);
    }
    get collider (){
        return this._collider;
    }
    _initSize(){
        this._width = this._originalWidth * this._scale;
        this._height = this._originalHeight * this._scale;
    }

}