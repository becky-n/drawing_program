let my_c = document.getElementById('myCanvas');
canvas = document.querySelector('#myCanvas');
let ctx = canvas.getContext('2d');
canvas.height = window.innerHeight
canvas.width = window.innerWidth


function draw(x,y,radius, inset, n) {
        ctx.beginPath();
        ctx.save();
        ctx.translate(x,y)
        ctx.moveTo(0, 0 - radius);
        for (let i = 0; i < n; i++) {
            ctx.rotate(Math.PI / n);
            ctx.lineTo(0, 0 - (radius * inset));
            ctx.rotate(Math.PI / n);
            ctx.lineTo(0, 0 - radius);
        }
        ctx.restore();
        ctx.closePath();
        ctx.stroke();
        ctx.fillStyle = "rgb(225,200,50)"
        ctx.fill();
}

draw(120,120,100,0.5,5)

window.addEventListener('mousemove',function(e){
    draw(e.x,e.y,100,0.5,5)
})



/*
function circle(x,y,r){

    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI, false);
    ctx.fillStyle="rgb(245,200,3)";
    ctx.fill();
}

circle(120,120,50)
window.addEventListener('mousemove',function(e){
    circle(e.x,e.y,50)
})

 */
/*
function drawLine(x,y,x_1,y_1,strokeColour,strokeWidth){
    ctx.beginPath();
    ctx.moveTo(x,y);
    ctx.lineTo(x_1,y_1);
    ctx.lineCap = "round";
    ctx.strokeStyle = strokeColour;
    ctx.lineWidth = strokeWidth;
    ctx.stroke();
}

window.addEventListener('mousemove',function(e){
    drawLine(e.x,e.y,50,10,"rgb(255,2,32)",20)
})

 */
