function normalize(vector){
    let dx = vector.x;
    let dy = vector.y;

    let distance = Math.hypot(dx, dy);

    dx /= distance;
    dy /= distance;


    return {
        x : dx,
        y : dy
    }
}