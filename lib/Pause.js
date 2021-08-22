class Pause{
    constructor(maxTime) {
        this._time = 0;
        this._maxTime = maxTime;
    }
    next(){
        if (this._time >= this._maxTime) {
            return true;
        }
        this._time ++;
        return false;
    }
    restart(){
        this._time = 0;
    }
}