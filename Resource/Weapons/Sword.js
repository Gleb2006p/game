class Sword extends Weapon {
    constructor() {
        super();
        this._damage = 10;
        this._url = "image/Weapons/sword.png";
        this._image = Lib.createImage(this._url);
        this._name = "Sword";
    }
}