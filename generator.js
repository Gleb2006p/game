function generate() {
    const TILE = 100;

    class Cell {
        constructor(x, y) {
            this._charSize = 14;
            this._x = x * TILE;
            this._y = y * TILE;
            this._sides = [true, true, true, true];

        }

        get x() {
            return this._x / TILE;
        }

        get y() {
            return this._y / TILE;
        }

        getCharMap() {
            const monsterInBlock = 2;

            let array = [];
            for (let x = 0; x < this._charSize; x++) {
                let localString = "";
                for (let y = 0; y < this._charSize; y++) {
                    let bottom = (y === this._charSize - 1) && this._sides[3];
                    let top = (y === 0) && this._sides[1];
                    let left = (x === 0) && this._sides[2];
                    let right = (x === this._charSize - 1) && this._sides[0];
                    if (bottom || top || left || right) {
                        localString += '#';
                        continue;
                    }
                    localString += '_';
                }
                array.push(localString);
            }
            for (let i = 0; i < monsterInBlock; i ++ ) {

                while (true) {
                    let randomX = 1 + Math.floor(Math.random() * (array.length - 3));
                    let randomY = 1 + Math.floor(Math.random() * (array[0].length - 3));

                    if (array[randomX].charAt(randomY) !== '#') {
                        array[randomX] = replaceAt(array[randomX], '^', randomY);
                        break;
                    }
                }
            }
            return array;
        }

        draw(i) {
            if (this._sides[0]) {
                ctx.fillStyle = "blue";
                ctx.fillRect(this._x + 100, this._y + 100, TILE, 1);
            }
            if (this._sides[1]) {
                ctx.fillStyle = "blue";
                ctx.fillRect(this._x + TILE + 100, this._y + 100, 1, TILE);
            }
            if (this._sides[2]) {
                ctx.fillStyle = "blue";
                ctx.fillRect(this._x + 100, this._y + TILE + 100, TILE, 1);
            }
            if (this._sides[3]) {
                ctx.fillStyle = "blue";
                ctx.fillRect(this._x + 100, this._y + 100, 1, TILE);
            }
            ctx.fillStyle = "red";
            ctx.fillText(i, this._x + 100, this._y + TILE / 2 + 100);
        }

        destroyCell(direction) {
            if (direction.x === -1) {
                this._sides[1] = false;
            } else if (direction.x === 1) {
                this._sides[3] = false;
            } else if (direction.y === 1) {
                this._sides[0] = false;
            } else if (direction.y === -1) {
                this._sides[2] = false;
            }
        }
    }

    let table = [];
    for (let x = 0; x < SIZE; x++) {
        for (let y = 0; y < SIZE; y++) {
            let cell = new Cell(x, y);
            table.push(cell);
        }
    }
    class Generator {
        constructor() {
            this._x = 0;
            this._y = 0;
            this._visited = [{
                x : this._x,
                y : this._y,
            }];
            this._stack  = [{
                x : this._x,
                y : this._y,
            }]
        }
        draw(){
            ctx.fillStyle = "green";
            ctx.fillRect(this._x * TILE + 100, this._y * TILE + 100, TILE, TILE);
            this._move();
        }
        _checkValueInRage(max, value, min){
            return value <= max && value >= min;
        }
        _checkInVisited(){
            for (let position of this._visited){
                if (this._x === position.x && this._y === position.y){
                    return true;
                }
            }
            return false;
        }
        _getCurrentCell(){
            return table[this._x * (SIZE) + this._y];
        }
        move(){
            let allowedDirection = [
                {
                    x : 1,
                    y : 0
                },
                {
                    x : 0,
                    y : 1
                },
                {
                    x : -1,
                    y : 0
                },
                {
                    x : 0,
                    y  : -1
                }
            ];
            while (true) {
                let randomIndex = Math.floor(Math.random() * allowedDirection.length);
                let randomDirection = allowedDirection[randomIndex];

                let oldCell = this._getCurrentCell();
                this._x += randomDirection.x;
                this._y += randomDirection.y;
                if (this._checkValueInRage(SIZE  - 1, this._x, 0) && this._checkValueInRage(SIZE  - 1, this._y, 0) && !this._checkInVisited()){
                    let cell = this._getCurrentCell();
                    let reverseDirection = {
                        x : -randomDirection.x,
                        y : -randomDirection.y
                    }
                    cell.destroyCell(randomDirection);
                    oldCell.destroyCell(reverseDirection);
                    let position = {

                        x  : this._x,
                        y : this._y,
                    }

                    this._visited.push(position);
                    this._stack.push(position);
                    break;

                }
                this._x -= randomDirection.x;
                this._y -= randomDirection.y;
                if (allowedDirection.length === 1){
                    try {
                        let position = this._stack.pop();
                        this._x = position.x;
                        this._y = position.y;
                        continue;
                    }
                    catch {
                        return;
                    }
                }
                allowedDirection.splice(randomIndex, 1);

            }
        }
        checkEnd(){
            return this._stack.length === 0;
        }

    }
    function getBlocks(){
        let stringBlocks = [];
        for (let cell of table){
            stringBlocks.push(cell.getCharMap());
        }
        return stringBlocks;
    }
    let generator = new Generator();
    return function (){
        while (true) {
            if (generator.checkEnd()) {
                return getBlocks();
            }
            generator.move();
        }
    }
}