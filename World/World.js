class World{
    _currentNPC;
    constructor() {
        this._map = [];
        this._player = new Player();
        this._monsters = [];
        this._npcs = [];
        this._droppedWeapons = [];
        this._bullets = [];
        this._light = new Light(this._player.center[0], this._player.center[1], 700);
        this._currentNPC;
        let condition = ()=>{
            return this._monsters.length === 0;
        }

        this._winListener = new Listener(condition.bind(this));
        this._winListener.addObserver(()=>{

        });


    }

    parseStringMap(blocks){
        let i = 0;
        const SIZE = 14;

        for (let  map of blocks) {

            let offsetX = i % 5;
            let offsetY = (i - offsetX) / 5;

            offsetX *= SIZE;
            offsetY *= SIZE;

            for (let x = 0; x < map.length; x++) {
                for (let y = 0; y < map[x].length; y++) {
                    let char = map[map.length - x - 1][map.length - y - 1];
                    if (char === '#') {
                        this._map.push(new Wall(x + offsetX, y + offsetY));
                        continue;
                    }
                    else if (char === '^'){
                        this._monsters.push(new Skeleton(x + offsetX, y + offsetY))
                    }
                    this._map.push(new Earth(x + offsetX, y + offsetY));
                }
            }
            i ++;
        }
    }
    addBullet(bullet){
        this._bullets.push(bullet);
    }
    _normalizeByMap(n){
        return Math.floor(n / TILE) * TILE;
    }

    _updateBullets(){
        let i = 0;
        for (let bullet of this._bullets){
            bullet.update(i, world);
            i++;
        }
    }
    getWeaponInDiapason(x, y, radius){
        let i = 0;
        for (let droppedWeapon of this._droppedWeapons){
            let monsterX = droppedWeapon.center[0];
            let monsterY = droppedWeapon.center[1];
            let distance = Math.hypot(x - monsterX, y - monsterY);
            if (distance < radius){
                this._droppedWeapons.splice(i, 1);
                return droppedWeapon;
            }
            i  ++;
        }
    }
    destroyBullet(index){
        this._bullets.splice(index, 1);
    }
    getMonsterInDiapason(player){
        for (let monster of this._monsters){
            if (player.checkCollision(monster)){
                return monster;
            }

        }
    }
    setDirection(ev){
        this._player.setDirection(ev);
    }
    onKeyDown(ev){
       let direction =  this._player.onKeyDown(ev, this);
    }
    onKeyUp(){
        this._player.onKeyUp();
    }

    _drawObjects(arr){
        for (let object of arr){
            if (object.draw === undefined){
                throw new Error("Гей, триклятий");
            }
            object.draw();
        }
    }
    _drawMonsters(){
        this._drawObjects(this._monsters);
    }
    _drawLight(){
       this._light.draw();
    }
    _drawMap(){
        this._drawObjects(this._map);
    }
    _drawDroppedWeapon(){
        this._drawObjects(this._droppedWeapons);
    }
    _drawBullets(){
        this._drawObjects(this._bullets);
    }
    draw(){
        this._drawMap();
        this._drawMonsters();
        this._drawDroppedWeapon();
        this._drawBullets();
        this._player.draw();
        this._drawNPCs();
        this._drawLight();
        this._update();


    }
    _updateMonster(){
        for (let monster of this._monsters){
            monster.update(this._player, this);
        }
    }
    _update() {
        this._deleteDeadsMonster();
        this._updateMonster();
        this._checkCollisionWithNPCs();
        this._onCurrentNPCIsNotOnDiapason();
        this._updateBullets();
        this._winListener.update();
    }

    _deleteDeadsMonster(){
        let i = 0;
        for (let monster of this._monsters){
            if (monster.hp <= 0){
                monster.onDie(this._player, this);
                this._monsters.splice(i, 1);
            }
            i ++;
        }
    }
    _currentTile(object){
        for (let block of this._map){
            if (block.checkCollision(object) && block.collision){
                return block;
            }
        }
        return null;
    }
    _drawNPCs(){
        for (let npc of this._npcs){
            npc.draw();
        }
    }
    _checkCollisionWithNPCs(){
        for (let npc of this._npcs){
            if (npc.checkCollision(this._player)){
                 npc.onCollision(this._player);
                 this._currentNPC = npc;
            }
        }
    }
    _onCurrentNPCIsNotOnDiapason(){
        if (this._currentNPC === undefined){
            return;
        }
        if (!this._currentNPC.checkCollision(this._player)){
            this._currentNPC.onExitCollision();
        }
    }
    generateCharMap(object){
        let charMap = [];
        charMap.to2D(object.viewSize, object.viewSize);

        let objectX = object.center[0];
        let objectY = object.center[1];
        objectX = this._normalizeByMap(objectX);
        objectY = this._normalizeByMap(objectY);
        for (let tile of this._map){
            let tileX = tile.x;
            let tileY = tile.y;
            let width = (objectX - tileX) / TILE;
            let height = (objectY - tileY) / TILE;
            if (width <= object.viewSize && height <= object.viewSize && width >= 0 && height >= 0){
                charMap[width][height] = tile.char;
            }
        }

        return charMap;
    }
    checkCollision(object){
        return this._currentTile(object) !== null;
    }
    onCollision(direction){
        this._currentTile(this._player).onCollision(this._player, direction);
    }
    set droppedWeapon(weapon){
        this._droppedWeapons.push(weapon);
    }

}