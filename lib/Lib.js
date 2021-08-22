let Lib = {

}
Lib.__proto__.createImage = (src)=>{
    let img = document.createElement("img");
    img.src = src;
    let body = document.querySelector("body");
    body.append(img);
    img.style.display = "none";
    return img;
}
Lib.__proto__.Animation = function (animationWidth, animationHeight, row){
    this._animationWidth = animationWidth;
    this._animationHeight = animationHeight;
    this._row = row - 1;
    this._counter = 0;
    this._speed = 0.8;
}
Lib.__proto__.Animation.prototype.next = function (){
    let end = false;
    this._counter += this._speed;
    let counter = Math.floor(this._counter);
    if (counter >= this._row){
        this._counter = 0;
        end = true;
    }
    let x = counter * this._animationWidth;
    let y = 0;
    let width = this._animationWidth;
    let height = this._animationHeight;
    return [x, y , width, height, end];
}
Lib.__proto__.Animation.prototype.animationCountToZero = function () {
    this._counter = 0;
}
Lib.__proto__.Animation.prototype.setSpeed = function (speed){
    this._speed = speed;
}
Lib.__proto__.Animation.prototype.setAnimationCount = function (count){
    this._row = count;
}
Lib.__proto__.Animation.prototype.isEnd = function (){
    let nextCount = Math.floor(this._counter + this._speed);
    return nextCount >= this._row;
}
Array.prototype.to2D = function (width, height){
    for (let x = 0; x < width; x ++){
        let localArray = [];
        for (let y = 0; y < height; y ++){
            localArray.push('_');
        }
        this.push(localArray);
    }

}
Lib.__proto__.delay = function (func, ms) {
    return function() {
        setTimeout(() => func.apply(this, arguments), ms);
    };
}