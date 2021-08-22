class Listener{
    constructor(condition) {
        this._condition = condition;
        let returnedValue = condition();

        // condition function must return true or false value;
        if (returnedValue !== true && returnedValue !== false){
            throw new Error(" condition function incorect");
        }
        this._observers = [];
    }
    addObserver(observer){
        this._observers.push(observer);
    }
    update(){
        if (this._condition()){
            for (let observer of this._observers){
                observer();
            }
        }
    }


}