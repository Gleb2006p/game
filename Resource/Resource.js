class Resource{
    _image;

    constructor() {
        this._image;
        this._url = "";
        this._x = 0;
        this._y = 0;
        this._size = 50;
        this._dropped = false;
        this._name = "";
    }
    get url(){
        return this._url;
    }
    get center(){
        return [this._x + this._size / 2, this._y + this._size / 2];
    }
    put(){
        this._dropped = false;
    }
    drop(monster){
        let offsetSize = 20;
        let offsetX = Math.random() * offsetSize - offsetSize / 2;
        let offsetY = Math.random() * offsetSize - offsetSize / 2;
        this._x = monster.center[0] + offsetX;
        this._y = monster.center[1] + offsetY;
        this._dropped = true;
    }
    draw(){
        if (this._dropped) {
            ctx.fillStyle = "#785400";
            ctx.fillRect(this._x - camera.x , this._y - camera.y, this._size, this._size);
            ctx.drawImage( this._image,this._x - camera.x, this._y - camera.y, this._size, this._size);
        }
    }
    get name(){
        return this._name;
    }
    isSame(other){
        if (other === null){
            return false;
        }
        return (this._name === other.name);
    }
}
