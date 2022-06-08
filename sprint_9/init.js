//console.log("init.js is called");

let colArray= [
    // colours used in program
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


// connecting code
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

// styling for canvas
let my_c = document.getElementById('myCanvas');
my_c.style.backgroundColor = "rgba(0, 0, 10,0.5)";
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
 */

class InteractiveObject{
    constructor(){
        this.element = canvas
        // listener is attached to canvas element

        // tracks movement of mouse
        this.element.addEventListener('mousedown', this.mDown.bind(this));
        // when mouse is held down
        this.element.addEventListener('mouseup', this.mUp.bind(this));
        // when mouse isn't held down
        this.element.addEventListener('mousemove', this.mMove.bind(this));
        // when mouse is moving
        this.element.addEventListener('click', this.mClick.bind(this));
        // when mouse clicks

        // defining local variables
        this.xMouseStart = 0;
        this.yMouseStart = 0;
        this.xMouse = 0;
        this.yMouse = 0;
    }

    mDown(e){
        // console logs the position of the mouse
       //let output = "This mouse went down at x = " + e.offsetX + "and y = " + e.offsetY;
       //console.log (output)
    }

    mUp(e){
      //  console logs position of mouse if mouse is up
       //let output = "This mouse went up at x = " + e.offsetX + "and y = " + e.offsetY;
       //console.log(output)
    }

    mMove(e){
        // returns offset coordinates for x and y
        this.xMouse = e.offsetX;
        this.yMouse = e.offsetY;
        //console.log("moving")
    }

    mClick(e){
       // console.log("click");
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
 * @param {number} strokeWidth width of stroke
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
        // draws line
        ctx.beginPath();
        ctx.moveTo(this.x,this.y);
        ctx.lineTo(this.x_1,this.y_1);
        ctx.lineCap = "round";
        ctx.strokeStyle = this.stroke;
        ctx.lineWidth = this.strokeWidth;
        ctx.stroke();
    }
    update(){
        // updates draw function
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
        // updates draw function
        this.draw();
    }

    draw(){
        // draws rectangle
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
        // draws ellipse
        ctx.beginPath();
        ctx.ellipse(this.x,this.y, this.xR, this.yR, 0, 0,2*Math.PI);
        ctx.fillStyle = this.fill;
        ctx.fill();
    }

    update(){
        // updates draw function
        this.draw();
    }

}

/**
 * Star
 * @param {number} x x position
 * @param {number} y y position
 * @param {number} r radius
 * @param {number} n number of points
 * @param {inset} inset controls rotation of shape
 * @param {string} fill fills shape
 */

class Star{
    constructor(x,y,r,inset, n, fill){
        this.x = x;
        this.y = y;
        this.r =r;
        this.n =n;
        this.inset = inset;
        this.fill = fill;
    }

    draw(){
        // draws star shape with changeable points
        ctx.beginPath();
        ctx.save();
        ctx.translate(this.x,this.y)
        //ctx.moveTo(0, 0 - this.r);
        for (let i = 0; i < this.n; i++) {
            // loops through drawing lines depending on number of points
            ctx.rotate(Math.PI / this.n);
            ctx.lineTo(0, 0 - (this.r * this.inset));
            ctx.rotate(Math.PI / this.n);
            ctx.lineTo(0, 0 - this.r);
        }
        ctx.restore();
        ctx.closePath();
        ctx.fillStyle= this.fill;
        ctx.fill();
    }
    update(){
        // updates draw function
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
        // draws triangle
        ctx.beginPath();
        ctx.moveTo(this.x + this.w/2, this.y);
        ctx.lineTo(this.x+this.w, this.y+this.h);
        ctx.lineTo(this.x, this.y+this.h);
        ctx.closePath();
        ctx.fillStyle = this.c;
        ctx.fill();
    }


    update(){
        // updates draw function
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
            // draws heart
            // 4 connecting curves
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
        // updates draw function
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
    constructor(x,y,w,h,fill){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.fill = fill;
    }

    draw(){
        // draws diamond
        ctx.beginPath();
        ctx.moveTo(this.x + this.w/2, this.y);
        ctx.lineTo(this.x+this.w, this.y+this.h/2);
        ctx.lineTo(this.x +this.w/2, this.y+this.h);
        ctx.lineTo(this.x, this.y+this.h/2);
        ctx.closePath();
        ctx.fillStyle = this.fill;
        ctx.fill();
    }

    update(){
        // updates draw function
        this.draw();

    }
}

/* Brushes */

/**
 * Brush
 * @param {number} x x position
 * @param {number} y y position
 * @param {number} r radius
 * @param {string} fill fills shape
 */

class Brush {
    constructor(x, y, r, fill) {
        this.y = y;
        this.x = x;
        this.r = r;
        this.fill = fill;
    }

    draw(){
        // draws brush
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
        ctx.lineJoin = ctx.lineCap = 'round';
        ctx.fillStyle = this.fill;
        ctx.fill();
    }

    update() {
        // updates draw function
        this.draw();
    }
}

/**
 * Brush
 * @param {number} x x position
 * @param {number} y y position
 * @param {number} r radius
 * @param {string} fill fills shape
 */

class funkyBrush {

    constructor(x, y, r,fill, stroke,lineW) {
        this.y = y;
        this.x = x;
        this.r = r;
        this.fill = fill;
        this.stroke = stroke;
        this.lineW = lineW
       // this.shadow = shadow;
        //this.shadBlur=shadBlur
    }

    draw() {
        // draws funky brush
        ctx.beginPath();
       // ctx.shadowColor = this.shadow;
      //  ctx.shadowBlur = this.shadBlur;
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
        ctx.lineJoin = ctx.lineCap = 'round';
        ctx.stroke();
        ctx.fillStyle = this.fill;
        ctx.strokeStyle = this.stroke;
        ctx.lineWidth= this.lineW;
        ctx.fill();
    }

    update() {
        // updates draw function
        this.draw();
    }
}



/*Stroke outlines for shapes*/

function starStroke(x,y,radius, inset, n,stroke,lineW) {
    // draws stroke star
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
    ctx.lineWidth = lineW;
    ctx.strokeStyle=stroke;
    ctx.stroke();

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
    // draws stroke line
    ctx.beginPath();
    ctx.moveTo(x,y);
    ctx.lineTo(x_1,y_1);
    ctx.lineCap = "round";
    ctx.strokeStyle = strokeColour;
    ctx.lineWidth = strokeWidth;
    ctx.stroke();
}



