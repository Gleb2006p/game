class Particle{
    constructor(x, y, particleProperty) {
        this._x = x;
        this._y = y;
        this._startX = this._x;
        this._startY = this._y;
        this._maxDeltaAngle = particleProperty.maxDeltaAngle;
        this._minDeltaAngle = particleProperty.minDeltaAngle;
        this._maxAngle = particleProperty.maxAngle + 180;
        this._minAngle = particleProperty.minAngle + 180;
        this._colorGradient = particleProperty.colorGradient;
        this._angle = this._generateValueInDiapason(this._minAngle, this._maxAngle);
        this._speed = this._generateValueInDiapason(particleProperty.minSpeed, particleProperty.maxSpeed);
        this._size = this._generateValueInDiapason(particleProperty.minSize, particleProperty.maxSize);
    }
    _calculateDistanceToStart(){
        let distance = Math.hypot(this._x - this._startX, this._y - this._startY);
        return distance;
    }
    _generateValueInSector(value1, value2, coef){
        let valueLine = value2 - value1;
        let randomOffset = coef * valueLine;
        let randomValue = randomOffset + value1;
        return randomValue;
    }
    _calculateCurrentColor(){
        let distanceToStart = this._calculateDistanceToStart();
        let startColor = this._colorGradient.colors[0];
        let endColor = this._colorGradient.colors[1];
        let resultColor = [];
        let gradientDistance = this._colorGradient.distance;
        let i  = 0;
        for (let colorValue1 of startColor){
            let colorValue2 = endColor[i];
            let resultColorValue = this._generateValueInSector(colorValue2, colorValue1, distanceToStart / gradientDistance);
            resultColor.push(resultColorValue);
            i++;
        }

        let basicString = resultColor.join();
        let  rgbaString = `rgba(${basicString})`;
        return rgbaString;
    }
    _generateValueInDiapason(min, max){
        let randomValue = this._generateValueInSector(min, max, Math.random());
        return randomValue;
    }
    draw(){
        ctx.fillStyle = this._calculateCurrentColor();
        ctx.fillRect(this._x, this._y, this._size, this._size);
        this._move();
    }
    _calm(){
        return this._angle < this._maxAngle && this._angle > this._minAngle;
    }
    _drawVector(angle, color="black"){
        let radian = this._convertDegreesToRadian(angle);
        let length = 300;
        let x = this._x + Math.sin(radian) * length;
        let y = this._y + Math.cos(radian) * length;
        ctx.strokeStyle = color;
        ctx.moveTo(this._x, this._y);
        ctx.lineTo(x, y);
        ctx.stroke();
    }
    _move(){
        let radian = this._convertDegreesToRadian(this._angle);
        this._x += Math.sin(radian) * this._speed;
        this._y += Math.cos(radian) * this._speed;
        while (true) {
            let deltaAngle = this._generateValueInDiapason(this._minDeltaAngle, this._maxDeltaAngle);
            this._angle += deltaAngle;
            if (this._calm()){
                break;
            }
            this._angle -= deltaAngle;
        }
    }
    _convertDegreesToRadian(degrees){
        let radian = degrees * Math.PI / 180;
        return radian;
    }
}