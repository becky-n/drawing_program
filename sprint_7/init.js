console.log("init.js is called");

let colArray= [
    [
        "rgba(255,255,255,1)", "rgba(153,153,153,1)", "rgba(0,0,0,1)",
        "rgba(255, 255, 0,1)", "rgba(232, 136, 9,1)", "rgba(255, 23, 23,1)",
        "rgba(128, 37, 232,1)", "rgba(41, 166, 255,1)", "rgba(98,199,35,1)",
        "rgba(255,53,184,1)", "rgba(101,67,33,1)", "rgba(255,203,164,1)"
    ],
    [
        "rgba(255,255,255,0.5)", "rgba(153,153,153,0.5)", "rgba(0,0,0,0.5)",
        "rgba(255, 255, 0,0.5)", "rgba(232, 136, 9,0.5)", "rgba(255, 23, 23,0.5)",
        "rgba(128, 37, 232,0.5)", "rgba(41, 166, 255,0.5)","rgba(98,199,35,0.5)",
        "rgba(255,53,184,0.5)", "rgba(101,67,33,0.5)", "rgba(255,203,164,0.5)"
    ],
    [
        "rgba(255,255,255,0.3)", "rgba(153,153,153,0.3)", "rgba(0,0,0,0.3)",
        "rgba(255, 255, 0,0.3)", "rgba(232, 136, 9,0.3)", "rgba(255, 23, 23,0.3)",
        "rgba(128, 37, 232,0.3)", "rgba(41, 166, 255,0.3)", "rgba(98,199,35,0.3)",
        "rgba(255,53,184,0.3)", "rgba(101,67,33,0.3)", "rgba(255,203,164,0.3)"
    ]
]

/**
 * Grid
 * @param {number} w width of grid
 * @param {number} h height of grid
 * @param {number} intervalWidth interval width
 * @param {string} strokeColour colour of grid
 * @param {number} strokeWidth width of grid lines
 */

class Grid{
    constructor(w,h,intervalWidth,strokeColour,
                strokeWidth) {
        this.w =w;
        this.h =h;
        this.intervalWidth = intervalWidth;
        this.strokeColour = strokeColour;
        this.strokeWidth = strokeWidth;
    }
    update(){
        this.draw()
    }
    draw(){
        // loops to draw grid lines
        for(let i = -this.w; i <= this.w; i+=
            this.intervalWidth){
            this.drawLine(i, -this.h, i,
                this.h, this.strokeColour,
                this.strokeWidth);
        }
        for(let j = -this.h; j <= this.h; j +=
            this.intervalWidth){
            this.drawLine(-this.w,j, this.w,
                j, this.strokeColour,
                this.strokeWidth);
        }
    }

    // function for drawing the grid lines
    drawLine(x_1,y_1,x_2,y_2,strokeColour,strokeWidth){
        ctx.beginPath();
        ctx.moveTo(x_1,y_1);
        ctx.lineTo(x_2,y_2);
        ctx.lineCap = "round";
        ctx.strokeStyle = strokeColour;
        ctx.lineWidth = strokeWidth;
        ctx.stroke();
    }

}

canvas = document.querySelector('#myCanvas');
let ctx = canvas.getContext('2d');

// define height and width
let width = 950;
let height = 650;

// define scale of 1
let scale = 2;

// set the canvas width and height
canvas.width = width*scale;
canvas.height = height*scale;

//scale the canvas
ctx.scale(scale, scale);

// get the canvas element
// style here for consistency

let my_c = document.getElementById('myCanvas');
my_c.style.backgroundColor = "rgba(255, 255, 255,1)";
my_c.style.width = width+"px";
my_c.style.height = height+"px";
my_c.style.border = "8px solid rgba(0, 0, 0)";
my_c.style.display = "block";
my_c.style.margin = "auto";
document.body.style.backgroundColor = "rgba(153, 153, 153,1)";

/**
 * Interactive object
 * @param {number} xMouseStart sets position of x mouse start
 * @param {number} yMouseStart sets position of y mouse start
 * @param {number} xMouse sets position of x mouse
 * @param {number} yMouse sets position of y mouse
 * @param {boolean} mouseIsDown sets mouse down
 */

class InteractiveObject{
    constructor(){
        this.element = canvas
        // tracks movement of mouse
        this.element.addEventListener('mousedown', this.mDown.bind(this));
        this.element.addEventListener('mouseup', this.mUp.bind(this));
        this.element.addEventListener('mousemove', this.mMove.bind(this));
        this.element.addEventListener('mouseleave', this.mLeave.bind(this));
        this.element.addEventListener('click', this.mClick.bind(this));
        this.xMouseStart = 0;
        this.yMouseStart = 0;
        this.xMouse = 0;
        this.yMouse = 0;


    }
    mDown(e){
        // console logs the position of the mouse
       let output = "This mouse went down at x = " + e.offsetX + "and y = " + e.offsetY;
       console.log (output)
    }

    mUp(e){
      //  console logs position of mouse if mouse is up
       let output = "This mouse went up at x = " + e.offsetX + "and y = " + e.offsetY;
       console.log(output)
    }

    mMove(e){
        // returns offset coordinates for x and y
        this.xMouse = e.offsetX;
        this.yMouse = e.offsetY;
        //console.log("moving")
    }
    mLeave(e){
        console.log("Mouse has left the canvas")
    }

    mClick(e){
        console.log("click");
    }
}

/* Shape objects */

/**
 * Line
 * @param {number} x x position
 * @param {number} y y position
 * @param {number} x_1 x end point
 * @param {number} y_1 y end point
 * @param {string} fill fills shape
 */

class Line{
    constructor(x,y,x_1,y_1,stroke,strokeWidth){
        this.x = x;
        this.y = y;
        this.x_1 = x_1;
        this.y_1 = y_1;
        this.stroke = stroke;
        this.strokeWidth= strokeWidth;
    }
    draw(){
        ctx.beginPath();
        ctx.moveTo(this.x,this.y);
        ctx.lineTo(this.x_1,this.y_1);
        ctx.lineCap = "round";
        ctx.strokeStyle = this.stroke;
        ctx.lineWidth = this.strokeWidth;
        ctx.stroke();
    }
    update(){
        // draws line
        this.draw();
    }
}

/**
 * Rectangle
 * @param {number} x x position
 * @param {number} y y position
 * @param {number} w width
 * @param {number} h height
 * @param {string} fill fills shape
 */


class Rectangle{
    constructor(x,y,w,h,fill){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.fill = fill;
    }

    update(){
        // draws rectangle
        // updates draw function
        this.draw();
    }

    draw(){
        ctx.fillStyle = this.fill;
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.w, this.h);
        ctx.fill();
    }

}

/**
 * Ellipse
 * @param {number} x x position
 * @param {number} y y position
 * @param {number} xR vertical radius
 * @param {number} yR horizontal radius
 * @param {string} fill fills shape
 */

class Ellipse{
    constructor(x,y,w,h,fill) {
        this.x = x;
        this.y = y;
        this.xR = w;
        this.yR = h;
        this.fill = fill;
    }

    draw(){
        ctx.beginPath();
        ctx.ellipse(this.x,this.y, this.xR, this.yR, 0, 0,2*Math.PI);
        ctx.fillStyle = this.fill;
        ctx.fill();
    }

    update(){
        // draws ellipse
        this.draw();
    }

}

/**
 * Star
 * @param {number} x x position
 * @param {number} y y position
 * @param {number} w width
 * @param {number} h height
 * @param {string} fill fills shape
 */

class Star{
    constructor(x,y,w,h,fill) {
    this.x = x;
    this.y = y;
    this.w= w;
    this.h= h;
    this.fill = fill;
    }

    draw(){
        //ctx.moveTo(this.x+this.w/2,this.y+this.h/2)
        ctx.beginPath();
        // to draw the lines 5 times for an adjustable pointed star for later
        for (let i=0; i<5; i++){
            ctx.lineTo(Math.cos((18+i*72)/180*Math.PI)*this.w/2+this.x+this.w/2, Math.sin((18+i*72)/180*Math.PI)*this.h/2+this.y+this.h/2)
            ctx.lineTo(Math.cos((54+i*72)/180*Math.PI)*this.w/6+this.x+this.w/2, Math.sin((54+i*72)/180*Math.PI)*this.h/6+this.y+this.h/2)
        }
        ctx.lineTo(this.x+this.w/1.015, this.y+this.h/1.54)
        ctx.fillStyle = this.fill;
        ctx.fill()
    }
    update(){
        // draws 5 point star shape
        this.draw();
    }
}

/**
 * Triangle
 * @param {number} x x position
 * @param {number} y y position
 * @param {number} w width
 * @param {number} h height
 * @param {string} fill fills shape
 */

class Triangle{
    constructor(x,y,w,h,fillcolour){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.c = fillcolour;
    }

    draw(){
        ctx.beginPath();
        ctx.moveTo(this.x + this.w/2, this.y);
        ctx.lineTo(this.x+this.w, this.y+this.h);
        ctx.lineTo(this.x, this.y+this.h);
        ctx.closePath();
        ctx.fillStyle = this.c;
        ctx.fill();
    }


    update(){
        // draws triangle
        this.draw();

    }
}

/**
 * Heart
 * @param {number} x x position
 * @param {number} y y position
 * @param {number} w width
 * @param {number} h height
 * @param {string} fill fills shape
 */
class Heart{
    constructor(x, y, w, h, fill) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.fill = fill;
    }
        draw(){
            ctx.save();
            ctx.beginPath();
            let topCurveHeight = this.h * 0.3;
            ctx.moveTo(this.x, this.y + topCurveHeight);
            // top left curve
            ctx.bezierCurveTo(
                this.x, this.y,
                this.x - this.w / 2, this.y,
                this.x - this.w / 2, this.y + topCurveHeight
            );

            // bottom left curve
            ctx.bezierCurveTo(
                this.x - this.w / 2, this.y + (this.h + topCurveHeight) / 2,
                this.x, this.y + (this.h + topCurveHeight) / 2,
                this.x, this.y + this.h
            );

            // bottom right curve
            ctx.bezierCurveTo(
                this.x, this.y + (this.h + topCurveHeight) / 2,
                this.x + this.w / 2, this.y + (this.h + topCurveHeight) / 2,
                this.x + this.w / 2, this.y + topCurveHeight
            );

            // top right curve
            ctx.bezierCurveTo(
                this.x + this.w / 2, this.y,
                this.x, this.y,
                this.x, this.y + topCurveHeight
            );

            ctx.closePath();
            ctx.fillStyle = this.fill;
            ctx.fill();
            ctx.restore();
        }

    update() {
        // draw heart
        this.draw();
    }

}

/**
 * Diamond
 * @param {number} x x position
 * @param {number} y y position
 * @param {number} w width
 * @param {number} h height
 * @param {string} fill fills shape
 */

class Diamond{
    constructor(x,y,w,h,fillcolour){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.c = fillcolour;
    }

    draw(){
        ctx.beginPath();
        ctx.moveTo(this.x + this.w/2, this.y);
        ctx.lineTo(this.x+this.w, this.y+this.h/2);
        ctx.lineTo(this.x +this.w/2, this.y+this.h);
        ctx.lineTo(this.x, this.y+this.h/2);
        ctx.closePath();
        ctx.fillStyle = this.c;
        ctx.fill();
    }


    update(){
        // draws diamond
        this.draw();

    }
}


/*Stroke outlines for shapes*/

function starStroke(x,y,w,h,fill,l=1){
    // draws line
    ctx.moveTo(x+w/2,y-h/2)
    ctx.beginPath();
    // to draw the lines 5 times for an adjustable pointed star for later
    for (let i=0; i<5; i++){
        ctx.lineTo(Math.cos((18+i*72)/180*Math.PI)*w/2+x+w/2, Math.sin((18+i*72)/180*Math.PI)*h/2+y+h/2)
        ctx.lineTo(Math.cos((54+i*72)/180*Math.PI)*w/6+x+w/2, Math.sin((54+i*72)/180*Math.PI)*h/6+y+h/2)
    }
    ctx.lineTo(x+w/1.02, y+h/1.53)
    ctx.strokeStyle = fill;
    ctx.lineWidth = l;
    ctx.stroke()
}

function strokeRect(x,y,w,h,colour = "rgb(255,255,255,200",
                    l=1){
    // draws stroke rectangle
    ctx.beginPath();
    ctx.rect(x,y,w,h);
    ctx.lineWidth = l;
    ctx.strokeStyle = colour;
    ctx.stroke();
}


function basicEllipse(x,y,w,h,fill){
    // draws stroke ellipse
    ctx.beginPath();
    ctx.ellipse(x,y, w, h, 0, 0,2*Math.PI);
    ctx.strokeStyle = fill;
    ctx.stroke();
}

function DrawingAreaRect(x,y,w,h,fill, strokeR, lineW){
    // rectangle for drawing space
    ctx.beginPath();
    ctx.rect(x,y,w,h);
    ctx.fillStyle = fill;
    ctx.fill();
    ctx.lineWidth = lineW;
    ctx.strokeStyle = strokeR;
    ctx.stroke();
}

function strokeTriangle(x,y,w,h,fill, lineW){
    // draws stroke triangle
    ctx.beginPath();
    ctx.moveTo(x + w/2, y);
    ctx.lineTo(x+w, y+h);
    ctx.lineTo(x, y+h);
    ctx.closePath();
    ctx.lineWidth = lineW;
    ctx.strokeStyle = fill;
    ctx.stroke();
}

function strokeHeart(x,y,w,h,fill,lineW){
    // draws stroke heart
    ctx.beginPath();
    let topCurveHeight = h * 0.3;
    ctx.moveTo(x, y + topCurveHeight);
    // top left curve
    ctx.bezierCurveTo(
        x, y,
        x - w / 2, y,
        x - w / 2, y + topCurveHeight
    );

    // bottom left curve
    ctx.bezierCurveTo(
        x - w / 2, y + (h + topCurveHeight) / 2,
        x, y + (h + topCurveHeight) / 2,
        x, y + h
    );

    // bottom right curve
    ctx.bezierCurveTo(
        x, y + (h + topCurveHeight) / 2,
        x + w / 2, y + (h + topCurveHeight) / 2,
        x + w / 2, y + topCurveHeight
    );

    // top right curve
    ctx.bezierCurveTo(
        x + w / 2, y,
        x, y,
        x, y + topCurveHeight
    );

    ctx.closePath();
    ctx.lineWidth = lineW;
    ctx.strokeStyle = fill;
    ctx.stroke();

}

function strokeDiamond(x,y,w,h,fill, lineW){
    // draws stroke diamond
    ctx.beginPath();
    ctx.moveTo(x + w/2, y);
    ctx.lineTo(x+w, y+h/2);
    ctx.lineTo(x +w/2, y+h);
    ctx.lineTo(x, y+h/2);
    ctx.closePath();
    ctx.lineWidth = lineW;
    ctx.strokeStyle = fill;
    ctx.stroke();
}

function drawLine(x,y,x_1,y_1,strokeColour,strokeWidth){
    ctx.beginPath();
    ctx.moveTo(x,y);
    ctx.lineTo(x_1,y_1);
    ctx.lineCap = "round";
    ctx.strokeStyle = strokeColour;
    ctx.lineWidth = strokeWidth;
    ctx.stroke();
}