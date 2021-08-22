let canvas = document.getElementById("canvas");
let ctx = canvas.getContext('2d');

canvas.width = window.innerWidth - 30;
canvas.height = window.innerHeight - 30;

let image = document.getElementById("person");
let pixelArray = ctx.getImageData(0,0, 40, 40);
let pixelData = pixelArray.data;
let i = 0;
for (let x = 0; x < pixelArray.width; x++){
    for (let y = 0; y < pixelArray.height; y ++){
        pixelData[i] = 255 - pixelData[i];
        pixelData[i + 1] = 255 - pixelData[i + 1];
        pixelData[i + 2] = 255 - pixelData[i + 2];
        i += 4;
    }
}
ctx.putImageData(pixelArray, 0, 0);
