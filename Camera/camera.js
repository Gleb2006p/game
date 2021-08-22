let camera = {
    _x : 0,
    _y : 0,
    _targetX : canvas.width / 2,
    _targetY : canvas.height / 2,
    set target(cords){
        this._targetX = cords[0];
        this._targetY = cords[1];
        let dx = this.x - this._targetX + canvas.width /2 ;
        let dy = this.y - this._targetY + 300;
    },
    move(){
        let dx = this.x - this._targetX + 300;
        let dy = this.y - this._targetY + 300;

        dx *= 0.2;
        dy *= 0.2;

        this._x -= dx;
        this._y -= dy;

    },
    get x(){
        return this._x;
    },
    get y(){
        return this._y;
    }
}
