class Earth extends Block{
    constructor(x, y) {
        super(x, y);
        this._image = Lib.createImage("image/Tile/plains.png");
        this._char = '_';
    }
}