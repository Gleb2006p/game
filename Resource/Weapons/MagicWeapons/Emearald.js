class Emerald extends MagicWeapon{
    constructor() {
        super();
        this._url = "image/Weapons/MagicWeapons/Emerald.png";
        this._image = Lib.createImage(this._url);
        this._name = "Emerald";
    }
    createBullet() {
        return new Fairball();
    }
}