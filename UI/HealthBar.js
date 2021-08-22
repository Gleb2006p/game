class HealthBar{
    constructor() {
        this._healthBar = document.querySelector(".heathBar");
        this._width = 400;
        this._color = "red";
        debugger;
    }
    changeHitPoint(hp, maxHp){

        this._healthBar.style.width = `${hp / maxHp * this._width}px`;
        let green = hp / maxHp * 255;
        let red = (255 - green);
        this._healthBar.style.backgroundColor = `rgb(${red}, ${255 - red}, 0)`;

    }
}