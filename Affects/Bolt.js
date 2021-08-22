class Bolt extends Affect{
    constructor() {
        super();
        this._time = 10;
        this._image = Lib.createImage("image/Affect/bolt.png");
    }
    applyAffect(object){
        let speed = 2;
        object.speed = speed;

    }
}
