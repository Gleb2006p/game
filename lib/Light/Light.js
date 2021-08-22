class Light{
    constructor(x, y, radius) {
        this._gradient = ctx.createRadialGradient(x, y, 50, x, y, radius);
        this._gradient.addColorStop(0, "rgba(100, 50, 0, 0.1)");
        this._gradient.addColorStop(1, "black");
    }
    draw(){
        ctx.fillStyle = this._gradient;
        ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
    }
}