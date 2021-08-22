class Diler extends NPC{
    constructor(x, y) {
        super();
        this._x = x * TILE;
        this._y = y * TILE;
        this._image = Lib.createImage("image/NPCs/diler.png");
        this._animation = new Lib.Animation(32, 64, 1);
        this._scale = 2.5;
        this._width = 26 * 2.5;
        this._height = 46 * 2.5;
        this._state = "idle";
        this._newItem = new LightSword();
        this._lostItem = new Sword();
        this._collider = new Collider(this._x, this._y, 13 * 5, 23 * 5);
    }
    _startExchangeWindow(player){
        let exchangeWindow = document.querySelector(".exchange-window");
        exchangeWindow.style.top = "50%";
        let newItemElement = document.querySelector(".new-item");
        let lostItemElement = document.querySelector(".lost-item");
        lostItemElement.style.backgroundImage = `url(${this._lostItem.url})`;
        newItemElement.style.backgroundImage = `url(${this._newItem.url})`;
        let exchangeButton = document.querySelector(".start-exchange");
        exchangeButton.onclick = ()=>{
            if (player.inventoryContains(this._lostItem)) {

                player.removeWeapon(this._lostItem);
                player.newWeapon = this._newItem;
            }
        }
    }
    _startExchangeButton(player){
        let exchangeStartButton = document.querySelector(".start-exchange-window");
        exchangeStartButton.style.opacity = "0.8";
        exchangeStartButton.style.display = "inline";
        exchangeStartButton.onclick = ()=>{

            this._startExchangeWindow(player);

        }
    }
    _resetExchangeWindow(){
        let exchangeWindow = document.querySelector(".exchange-window");
        exchangeWindow.style.top = "-30%";
    }
    _resetExchangeButton(){
        let exchangeStartButton = document.querySelector(".start-exchange-window");
        exchangeStartButton.style.opacity = "0";
        exchangeStartButton.style.display = "none";

    }
    onCollision(player) {
        super.onCollision(player);
        this._startExchangeButton(player);
    }

    onExitCollision() {
        super.onExitCollision();
        this._resetExchangeWindow();
        this._resetExchangeButton();
    }
}