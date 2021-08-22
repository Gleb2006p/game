class CraftBlock{
    constructor(player) {
        this._weapons = [];
        this._generateWeapons();
        this.update(player);
        this._weaponIndex = {
             0 : null,
             1: new LightSword(),
             2 : new MonsterEye(),


        };
        this._craftRecepts = [];
        this._craftWeapons = [];
        this._craftRecepts.push([[0, 1, 0],
                                 [0, 2, 0],
                                 [0, 0, 0]]);
        this._craftWeapons.push(new Emerald());
        this._onCraftButtonClick(player);
        this._setCancel(player);
    }

    _generateWeapons(){
        for (let x = 0; x < 3; x++){
            let localArray = [];
            for (let y = 0; y < 3; y++){
                localArray.push(null);
            }
            this._weapons.push(localArray);
        }
    }
    _setOnClick(player){
        let weapon = player.weapon;
        let craftElement = document.querySelector(".craft");
        let i = 0;
        for (let x = 0; x < 3; x ++){
            for (let y = 0; y < 3; y++){
                let craftItem = craftElement.children.item(i);
                craftItem.onclick =  ()=>{
                    if (weapon === null){
                        craftItem.style.backgroundImage = `none`;
                        return;
                    }
                    if (this._weapons[x][y] !== null){
                        return;
                    }
                    this._weapons[x][y] = weapon;
                    craftItem.style.backgroundImage = `url(${this._weapons[x][y].url})`;
                    if (player.removeWeapon(weapon)){
                        player.update();
                    }
                }
                i ++;
            }
        }
    }
    _onCraftButtonClick(player){
        let craftButton = document.querySelector('.accept-craft');
        craftButton.onclick = ()=>{
            this._craft(player);
        }
    }

    _setCancel(player){
        let cancelButton = document.querySelector(".cancel-craft");
        let craftElement = document.querySelector(".craft");
        cancelButton.onclick = ()=>{
            let i = 0;
            for (let x = 0; x < 3; x ++){
                for (let y = 0; y < 3; y ++){
                    let craftItem = craftElement.children.item(i);
                    i ++;
                    let weapon = this._weapons[x][y];
                    this._weapons[x][y] = null;

                    craftItem.style.backgroundImage = "none";

                    if (weapon === null){
                        continue;
                    }
                    player.newWeapon = weapon;
                }

            }
            this.update(player);
        }
    }
    update(player){
        this._setOnClick(player);
    }
    _getIndexMap(){
        let indexMap  = [];
        for (let x = 0; x < 3; x ++){
            let localIndexMap = [];
            for (let y = 0; y < 3; y ++){
                for (let index in this._weaponIndex){
                    let weapon = this._weaponIndex[index];
                    let currentWeapon = this._weapons[x][y];
                    if (currentWeapon === null){
                        localIndexMap.push(0);
                        break;
                    }
                    if (currentWeapon.isSame(weapon)){
                        localIndexMap.push(index);
                        break;
                    }
                }

            }
            indexMap.push(localIndexMap);
        }
        return indexMap;
    }
    _craft(player){
        let indexMap = this._getIndexMap();
        for (let i = 0; i  < this._craftWeapons.length; i ++){
            let receptsIndexMap = this._craftRecepts[i];
            if (this._indexMapEquals(indexMap, receptsIndexMap)){
                let craftedWeapon = this._craftWeapons[i];
                player.newWeapon = craftedWeapon;
                this._clear();
            }
        }
    }
    _indexMapEquals(indexMap, indexMap1){
        for (let x = 0; x < 3; x ++){
            for (let y = 0; y < 3; y ++){
                let index = indexMap[x][y];
                let index1 = indexMap1[x][y];
                if (index1 != index){
                    return false;
                }
            }
        }
        return true;
    }
    _clear(){
        let i = 0;
        let craftElement = document.querySelector(".craft");
        for (let x = 0; x < 3; x ++){
            for (let y = 0; y < 3; y ++){
                this._weapons[x][y] = null;
                let weaponElement = craftElement.children.item(i);
                weaponElement.style.backgroundImage = "none";
                i ++;
            }
        }
    }
}
