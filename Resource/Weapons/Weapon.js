class Weapon extends Resource{
    constructor() {
        super();
        this._damage = 0;
        this._affects = {

        }
    }
    _addAffectToEnemy(object){
        for (let probability in this._affects){
            let randomNumber = Math.random();
            if (randomNumber < probability){
                let affect = this._affects[probability];
                object.addAffect(affect);
            }
        }
    }
    attack(object){
        object.damaged(this._damage);
        this._addAffectToEnemy(object);
    }

}