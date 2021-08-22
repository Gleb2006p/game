class Water extends Block{
    constructor(x, y) {
        super(x, y);
        this._image = Lib.createImage("image/Tile/water.png");
        this._collision = true;
        this._char = '#';
   }
}