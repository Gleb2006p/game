let Debug = {
    drawPoint : (x, y)=>{
        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.arc(x, y, 10, 0, Math.PI * 2);
        ctx.fill();
    }
}