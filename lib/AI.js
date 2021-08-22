function generateGraph(map){
    let graph = {};
    const WALL = 10024;
    const NULL = 0;
    let mapLegend = {
        '#' : WALL,
        '_' : NULL
    }
    for (let x = 0; x < map.length; x ++){
        for (let y = 0; y < map[x].length; y ++){
            let cordsInString = `[${x}, ${y}]`;
            let vertexArray = [];

            for (let dx = -1; dx < 2; dx ++){
                for (let dy = -1;dy < 2; dy ++){
                    if (dx === 0 && dy === 0){
                        continue;
                    }
                    if (Math.abs(dx) === 1 && Math.abs(dy) === 1){
                        continue;
                    }
                    if (x + dx < 0 ||  y + dy < 0 || y + dy > map.length - 1 || x + dx > map.length - 1){
                        continue;
                    }
                    let point = map[x + dx][y + dy];
                    if (mapLegend[point] === WALL){
                        continue;
                    }
                    let nextCordsInString = `[${dx + x}, ${dy + y}]`;
                    vertexArray.push(nextCordsInString);


                }
            }
            graph[cordsInString] = vertexArray;
        }
    }
    return graph;
}
function find(start, finish, graph){
    let visited = [start];
    function checkVertexInVisited(vertex){
        for (let currentVertex of visited){
            if (currentVertex === vertex){
                return true;
            }
        }
        return false;
    }
    let paths = [[start]];
    function checkFinish(){
        for (let path of paths){
            for (let vertex of path){
                if (vertex === finish){
                    return true;
                }
            }
        }
        return false;
    }
    while (!checkFinish()) {
        let newPaths = [];
        for (let path of paths) {
            let vertex = path[path.length - 1];
            let nextVertexes = graph[vertex];
            for (let nextVertex of nextVertexes) {
                if (checkVertexInVisited(nextVertex)){
                    continue;
                }
                let newPath = [...path]
                newPath.push(nextVertex);
                newPaths.push(newPath);
                visited.push(nextVertex);
            }
        }
        paths = Object.assign(newPaths);
    }
    for (let path of paths){
        for (let vertex of path){
            if (vertex === finish){
                return path;
            }
        }
    }
}