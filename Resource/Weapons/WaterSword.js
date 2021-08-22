class WaterSword extends Weapon{
    constructor() {
        super();
        this._damage = 20;
        this._url = "image/Weapons/waterSword.png";
        this._image = Lib.createImage(this._url);
        this._name = "WaterSword";
        this._affects = {
            1 : new Bolt(),
        }
    }

}