class Collider{
    constructor(x, y, width, height) {
        this._width = width;
        this._height = height;
        this._x = x;
        this._y = y;
    }

    get rect(){
        return {
            x : this._x,
            y : this._y,
            width : this._width,
            height : this._height
        }
    }
    checkCollision(other){
        function intersect(n, length, n1, length1){
            if (n < n1){
                return (n + length >= n1);
            }
            else {
                return  (n1 + length1 >= n) ;
            }
        }
        let otherX = other.rect.x;
        let otherY = other.rect.y;
        let otherWidth = other.rect.width;
        let otherHeight = other.rect.height;
        let intersectX = intersect(otherX, otherWidth, this._x, this._width);
        let intersectY = intersect(otherY, otherHeight, this._y, this._height);
        return (intersectY && intersectX);
    }

    update(gameObject){
        this._x = gameObject.center[0] - this._width / 2;
        this._y = gameObject.center[1] - this._height / 2;
    }
    draw(){
        ctx.strokeStyle = "black";
        ctx.strokeRect(this._x - camera.x, this._y  - camera.y, this._width, this._height);
    }
}