class Wall extends Block{
    constructor(x, y) {
        super(x, y);
        this._image = Lib.createImage("image/Tile/wall.png");
        this._collision = true;
        this._char = '#';
    }
}