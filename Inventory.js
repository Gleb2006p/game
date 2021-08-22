class Inventory{
    constructor(player) {
        this._array = [];
        this._currentIndex = 0;
        this._inventoryElement = document.querySelector(".inventory");
        this._generateNullArray();
        this._setClick(player);
        this._changeInventory();
        this._setDragAndDropEvent();
        console.log(this._array)
    }
    _generateNullArray(){
        for (let i = 0; i  < this._inventoryElement.children.length - 1; i++){
            this._array.push(null);
        }
    }
    add(weapon){
        this._array.push(weapon);
        this._updateElementPosition();
        this._update();
    }
    _setDragAndDropEvent(){
        for (let i = 0; i < this._inventoryElement.children.length; i ++){
            let weaponElement = this._inventoryElement.children.item(i);
            let weaponElementImage = weaponElement.children.item(0);
            weaponElement.ondragover = function (event){
                event.preventDefault();
            }
            weaponElementImage.ondragstart = (event)=>{
                event.dataTransfer.setData(`weapon-id${i}`, event.target.id);
            }
            weaponElementImage.ondrop = (event)=>{
                let itemId = event.dataTransfer.getData(`weapon-id${i}`);
                event.target.append(document.getElementById(itemId));
            }
        }
    }
    remove(removeWeapon){
        let i = 0;
        for (let weapon of this._array){
            if (removeWeapon.isSame(weapon)){

                this._array[i] = null;
                this._update();
                return i === this._currentIndex;

            }
            i ++;
        }
        return false;
    }
    _update(){
        for (let i = 0; i < this._inventoryElement.children.length; i ++ ){
            let weapon = this._array[i];
            let weaponElement = this._inventoryElement.children.item(i);
            let weaponElementImage = weaponElement.children.item(0);
            weaponElementImage.style.display = "block";
            if (weapon !== null) {
                weaponElementImage.src = weapon.url;
            }
            else {
                weaponElementImage.style.display = "none";
            }
            if (i === this._currentIndex){
                weaponElement.style.backgroundColor = "darkblue";
            }
            else {
                weaponElement.style.backgroundColor = "royalblue";
            }
        }
    }
    isContains(finderWeapon){
        for (let weapon of this._array){
            if (weapon === null) {
                continue;
            }
            if (weapon.isSame(finderWeapon)){
                return true;
            }
        }
        return false;
    }
    _setClick(player){

        for (let i = 0; i < this._inventoryElement.children.length; i ++ ){
            let weaponElement = this._inventoryElement.children.item(i);
            weaponElement.onclick = ()=>{
                this._currentIndex = i;
                this._update();
                player.update();
            }

        }
    }
    getCurrentWeapon(){
        let weapon = this._array[this._currentIndex];
        return weapon;
    }
    _changeInventory(){
        let closeInvetoryButton = document.querySelector(".inventory-button");
        let craftDisplay = document.querySelector(".craft");
        // TODO
        //Надо етот метод переащить кудда то
        closeInvetoryButton.onclick = ()=> {
            if (this._inventoryElement.style.display === "none"){
                this._inventoryElement.style.display = "flex";
                craftDisplay.style.display = "flex";
            }
            else {
                this._inventoryElement.style.display = "none";
                craftDisplay.style.display = "none";
            }
        }
    }
    _updateElementPosition(){
        let i = 0;
        for (let weapon of this._array){
            let weaponIndex = i;
            if (weapon !== null){
                for (let j = i - 1; j > -1; j --){
                    let lastWeapon = this._array[j];
                    if (lastWeapon !== null){
                        break;
                    }
                    this._array[j] = weapon;
                    this._array[j + 1] = null;
                    weaponIndex = j;

                }
            }
            i ++;
        }
    }
}