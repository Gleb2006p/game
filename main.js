let SIZE = 5;

let startButton = document.getElementById("start");

startButton.addEventListener('click', ()=>{
    let game = document.querySelector(".game");
    let menu = document.querySelector(".menu");
    game.style.display = "flex";
    menu.style.display = "none";

});
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight ;
window.onresize = function (ev){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
const TILE =  100;
let world = new World();
let map = generate()();
world.parseStringMap(map);
document.onmousemove = (ev)=>{
    world.setDirection(ev);
};
document.onkeydown = (ev)=>{
    world.onKeyDown(ev);
}
document.onkeyup = (ev)=>{
    world.onKeyUp();
}
function startLoop(){
    let loop = setInterval(()=>{
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        world.draw();
        camera.move();
    }, 60);
    return function (){
        clearInterval(loop);
        let deathWindow = document.querySelector(".death-window");
        deathWindow.style.zIndex = "2";
        deathWindow.style.opacity = "1";
        deathWindow.clientWidth = canvas.width;
        deathWindow.clientHeight = canvas.height;
    }
}
let endGame = startLoop();