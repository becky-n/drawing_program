console.log("init.js is called");

let colArray= [
    [
        "rgba(255,255,255,1)", "rgba(153,153,153,1)", "rgba(0,0,0,1)",
        "rgba(255, 247, 10,1)", "rgba(232, 136, 9,1)", "rgba(255, 23, 23,1)",
        "rgba(128, 37, 232,1)", "rgba(41, 166, 255,1)", "rgba(98,199,35,1)"
    ],
    [
        "rgba(255,255,255,0.5)", "rgba(153,153,153,0.5)", "rgba(0,0,0,0.5)",
        "rgba(255, 247, 10,0.5)", "rgba(232, 136, 9,0.5)", "rgba(255, 23, 23,0.5)",
        "rgba(128, 37, 232,0.5)", "rgba(41, 166, 255,0.5)","rgba(98,199,35,0.5)"
    ],
    [
        "rgba(255,255,255,0.3)", "rgba(153,153,153,0.3)", "rgba(0,0,0,0.3)",
        "rgba(255, 247, 10,0.3)", "rgba(232, 136, 9,0.3)", "rgba(255, 23, 23,0.3)",
        "rgba(128, 37, 232,0.3)", "rgba(41, 166, 255,0.3)", "rgba(98,199,35,0.3)"
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
let width = 800;
let height = 600;

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
        // tracks movement of mouse
        canvas.addEventListener('mousedown', this.mDown.bind(this));
        canvas.addEventListener('mouseup', this.mUp.bind(this));
        canvas.addEventListener('mousemove', this.mMove.bind(this));
        canvas.addEventListener('mouseleave', this.mLeave.bind(this));
        canvas.addEventListener('click', this.mClick.bind(this));
        this.xMouseStart = 0;
        this.yMouseStart = 0;
        this.xMouse = 0;
        this.yMouse = 0;
        this.mouseIsDown = false;
    }
    mDown(e){
        // returns offset coordinates for x and y
        this.xMouseStart = e.offsetX;
        this.yMouseStart = e.offsetY;
        this.mouseIsDown = true;
        // console logs the position of the mouse
        let output = "This mouse went down at x = " + e.offsetX + "and y = " + e.offsetY;
        console.log (output)
    }

    mUp(e){
        this.mouseIsDown = false;
        // console logs position of mouse if mouse is up
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
        this.draw();
    }

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
