//console.log("control.js is called");

/**
 * Control
 * Includes all functions from interactive object
 * @param {number} w width
 * @param {number} h height
 * @param {array} objectSet list for shapes
 */

class ControlObject extends InteractiveObject{
    constructor(canvas, Ax, Ay, Aw, Ah) {
        super();

        // width and height for stroke guides
        this.w = 0;
        this.h = 0;

        // list to store all shapes
        this.objectSet = [];

        // x,y, width and height for drawing area
        this.Ax = Ax;
        this.Ay = Ay;
        this.Aw = Aw;
        this.Ah = Ah;

        // defines local variables
        this.xMouseStart = 0;
        this.yMouseStart = 0;
        this.xMouse = 0;
        this.yMouse = 0;
        this.mouseIsDown = false;

        // sets default setting as false
        this.inBounds = false;

    }

    getRandomInt(min, max) {
        // function for getting a random integer value
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }


    mDown(e){
        // returns offset coordinates for x and y
        this.xMouseStart = e.offsetX;
        this.yMouseStart = e.offsetY;

        // resets w and h to 0
       this.w=0;
       this.h=0;

        if (this.inBoundsCheck(this.xMouseStart, this.yMouseStart, this.Ax, this.Ay, this.Aw, this.Ah)){
            // checks if mouse is in boundaries
            this.mouseIsDown = true;
        }
       // console.log(this.inBounds)
    }

    inBoundsCheck(xM, yM, x, y, w, h){
        // check the boundaries
        // return true if inside boundaries
        // return false if outside boundaries
        return xM > x && xM < x + w && yM > y && yM < y + h;

    }

    mMove(e){
        super.mMove(e);

        // defining variables for buttons
        let name = InteractiveButton.selected.text;
        let colourname = Swatch.colour;
        let size = Size.selected.text;

        if (this.mouseIsDown === true && name === "Brush" && this.inBoundsCheck(this.xMouse, this.yMouse, this.Ax, this.Ay, this.Aw, this.Ah)) {
            // checks if mouse is in boundaries and only calls brush object if mouse is held down and moving
            // brush using repeating circles
            // brush only works if a size is selected
            if (size === "S") {
                // small circular brush
                let temp = new Brush(this.xMouse,this.yMouse,5,colourname)
                this.objectSet.push(temp)
                // adds object to array
            }
            else if (size === "M") {
                // medium circular brush
                let temp = new Brush(this.xMouse, this.yMouse, 20, colourname)
                this.objectSet.push(temp)
                // adds object to array
            }
            else if (size === "L") {
                // large circular brush
                let temp = new Brush(this.xMouse, this.yMouse, 50, colourname)
                this.objectSet.push(temp)
                // adds object to array
            }
        } else if (this.mouseIsDown === true && name === "Line Brush" && this.inBoundsCheck(this.xMouse, this.yMouse, this.Ax, this.Ay, this.Aw, this.Ah)) {
            // checks if mouse is in boundaries and only calls brush object if mouse is held down and moving
            // brush using lines that extend from the point where mouse clicks
            // brush only works if a size is selected
            if (size === "S") {
                // small line brush
                let temp = new Line(this.xMouseStart, this.yMouseStart, this.xMouse, this.yMouse, colourname, 2)
                this.objectSet.push(temp)
                // adds object to array
            }
            if (size === "M") {
                // medium line brush
                let temp = new Line(this.xMouseStart, this.yMouseStart, this.xMouse, this.yMouse, colourname, 5)
                this.objectSet.push(temp)
                // adds object to array
            }
            if (size === "L") {
                // large line brush
                let temp = new Line(this.xMouseStart, this.yMouseStart, this.xMouse, this.yMouse, colourname, 10)
                this.objectSet.push(temp)
                // adds object to array
            }
        } else if (this.mouseIsDown === true && name === "Spray" && this.inBoundsCheck(this.xMouse, this.yMouse, this.Ax, this.Ay, this.Aw, this.Ah)) {
            // checks if mouse is in boundaries and only calls brush object if mouse is held down and moving
            // brush using multiple small dots
            // brush only works if a size is selected
            if (size === "S") {
                // small spray brush
                let density = 100;
                // sets distance between dots
                for (let i = density; i--;) {
                    // sets width of outline of the dots
                    let radius = 50;
                    // sets x and y to be random
                    let offsetX = this.getRandomInt(-radius, radius);
                    let offsetY = this.getRandomInt(-radius, radius);
                    let temp = new Rectangle(this.xMouse+offsetX, this.yMouse+offsetY, 1.5, 1.5, colourname);
                    // spray brush has an outline of rectangular shape, fixed radius
                    this.objectSet.push(temp)
                    // adds object to array
                }
            }
            if (size === "M") {
                // medium spray brush
                let density = 100;
                // sets distance between dots
                for (let i = density; i--;) {
                    // sets width of outline of the dots
                    let radius = 70;
                    // sets x and y to be random
                    let offsetX = this.getRandomInt(-radius, radius);
                    let offsetY = this.getRandomInt(-radius, radius);
                    let temp = new Rectangle(this.xMouse+offsetX, this.yMouse+offsetY, 1.5, 1.5, colourname);
                    // spray brush has an outline of rectangular shape, fixed radius
                    this.objectSet.push(temp)
                    // adds object to array
                }
            }
            if (size === "L") {
                // large spray brush
                let density = 100;
                // sets distance between dots
                for (let i = density; i--;) {
                    // sets width of outline of the dots
                    let radius = 100;
                    // sets x and y to be random
                    let offsetX = this.getRandomInt(-radius, radius);
                    let offsetY = this.getRandomInt(-radius, radius);
                    let temp = new Rectangle(this.xMouse+offsetX, this.yMouse+offsetY, 1.5, 1.5, colourname);
                    // spray brush has an outline of rectangular shape, fixed radius
                    this.objectSet.push(temp)
                    // adds object to array
                }
            }
        }
        else if (this.mouseIsDown === true && name === "Funky Brush" && this.inBoundsCheck(this.xMouse, this.yMouse, this.Ax, this.Ay, this.Aw, this.Ah)){
            // checks if mouse is in boundaries and only calls brush object if mouse is held down and moving
            // brush using random sized circles and stroke outline
            let temp = new funkyBrush(this.xMouse,this.yMouse,this.getRandomInt(1,20),colourname, colArray[0][2],2)
            this.objectSet.push(temp)
            // adds object to array
        }
    }

    mUp(e){
        super.mUp(e);
        // defining variables
        let name = InteractiveButton.selected.text;
        let colourname = Swatch.colour;
        let size = Size.selected.text;
       // console.log(colourname)

        // draws specific shape if mouse is down and button is selected
        if(this.mouseIsDown === true && this.w>0 && this.h>0) {
            if (name === "Rectangle") {
                // draws rectangle
                let temp_2 = new Rectangle(this.xMouseStart, this.yMouseStart, this.w, this.h, colourname);
                this.objectSet.push(temp_2);
                // adds object to array
            } else if (name === "Ellipse") {
                // draws ellipse
                let temp = new Ellipse(this.xMouseStart + this.w / 2, this.yMouseStart + this.h / 2, Math.abs(this.w / 2), Math.abs(this.h / 2), colourname);
                this.objectSet.push(temp);
                // adds object to array
            } else if (name === "Star") {
                // draws star
                let temp_3 = new Star(this.xMouseStart, this.yMouseStart, this.w, 0.5,5, colourname)
                this.objectSet.push(temp_3);
                // adds object to array
            } else if (name === "Triangle") {
                // draws triangle
                let temp_4 = new Triangle(this.xMouseStart, this.yMouseStart, this.w, this.h, colourname)
                this.objectSet.push(temp_4);
                // adds object to array
            } else if (name === "Heart") {
                // draws heart
                let temp_5 = new Heart(this.xMouseStart + this.w / 2, this.yMouseStart, this.w, this.h, colourname)
                this.objectSet.push(temp_5);
                // adds object to array
            } else if (name === "Diamond") {
                // draws diamond
                let temp_6 = new Diamond(this.xMouseStart, this.yMouseStart, this.w, this.h, colourname)
                this.objectSet.push(temp_6);
                // adds object to array
            } else if (name === "Line"){
                // when line is selected, allows user to change width of line
                if (size === "S") {
                    // draws thin width line
                    let temp_7 = new Line(this.xMouseStart, this.yMouseStart, this.xMouse, this.yMouse, colourname, 2)
                    this.objectSet.push(temp_7);
                    // adds object to array
                } else if (size === "M") {
                    // draws medium width line
                    let temp_8 = new Line(this.xMouseStart, this.yMouseStart, this.xMouse, this.yMouse, colourname, 5)
                    this.objectSet.push(temp_8);
                    // adds object to array
                } else if (size === "L") {
                    // draws thick width line
                    let temp_9 = new Line(this.xMouseStart, this.yMouseStart, this.xMouse, this.yMouse, colourname, 10)
                    this.objectSet.push(temp_9);
                    // adds object to array
                }
            }
        }
        this.mouseIsDown = false;
    }

    update(){
        ctx.save();
        // makes rectangle for drawing space
        this.DrawingAreaRect(450, 25, 475, 600, colArray[0][0], colArray[0][2],4)
        ctx.clip();
        // clips all shapes outside rectangle

        // makes it so draggable guide and shapes can't leave drawing space
        if(this.xMouse < this.Ax ){
            this.xMouse = this.Ax
        }

        else if(this.xMouse > this.Ax + this.Aw){
            this.xMouse = this.Ax + this.Aw
        }

        if(this.yMouse < this.Ay){
            this.yMouse = this.Ay
        }

        else if(this.yMouse > this.Ay + this.Ah){
            this.yMouse = this.Ay + this.Ah
        }

        // set values for w and h
        this.w = this.xMouse - this.xMouseStart;
        this.h = this.yMouse - this.yMouseStart;


        // updates for length of objectSet
        for(let i = 0; i<this.objectSet.length; i++){
            this.objectSet[i].update();
        }

        // calls draw if mouse is down
        if (this.mouseIsDown) {
            this.draw();
        }

        //Undo and clear buttons
        let name = InteractiveButton.selected.text;
        if(name === "Undo"){
            // removes previous object from list
            this.objectSet.pop()
            InteractiveButton.selected=""
        }
        else if (name === "Clear"){
            // sets list to empty
            this.objectSet = []
        }
    }

    draw(){
        // defining variables
        let name = InteractiveButton.selected.text;
        let colourname = Swatch.colour;
        let size = Size.selected.text;

        // if shape name is selected, draws stroke drawing guide
        if (name === "Rectangle") {
            // draws stroke rectangle
            this.strokeRect(this.xMouseStart, this.yMouseStart, this.w, this.h, colArray[0][2]);
        } else if (name === "Ellipse") {
            // draws stroke rectangle and stroke ellipse
            this.strokeRect(this.xMouseStart, this.yMouseStart, this.w, this.h, colArray[0][2]);
            this.basicEllipse(this.xMouseStart + this.w / 2, this.yMouseStart + this.h / 2, Math.abs(this.w / 2), Math.abs(this.h / 2), colArray[0][2]);
        } else if (name === "Star") {
            // draws stroke rectangle and stroke star
           this.strokeRect(this.xMouseStart-this.w, this.yMouseStart-1.2*this.h, 2*this.w,2.2*this.h, colArray[0][2]);
            this.starStroke(this.xMouseStart, this.yMouseStart, this.w, 0.5,5, colArray[0][2],1.5);
        } else if (name === "Triangle") {
            // draws stroke rectangle and stroke triangle
            this.strokeRect(this.xMouseStart, this.yMouseStart, this.w, this.h, colArray[0][2]);
            this.strokeTriangle(this.xMouseStart, this.yMouseStart, this.w, this.h, colArray[0][2], 1.5);
        } else if (name === "Heart") {
            // draws stroke rectangle and stroke heart
            this.strokeRect(this.xMouseStart, this.yMouseStart, this.w, this.h, colArray[0][2]);
            this.strokeHeart(this.xMouseStart + this.w / 2, this.yMouseStart, this.w, this.h, colArray[0][2], 1.5);
        } else if (name === "Diamond") {
            // draws stroke rectangle and stroke diamond
            this.strokeRect(this.xMouseStart, this.yMouseStart, this.w, this.h, colArray[0][2]);
            this.strokeDiamond(this.xMouseStart, this.yMouseStart, this.w, this.h, colArray[0][2], 1.5);
        } else if (name === "Line") {
            // line drawing guides for different sizes
            if (size === "S") {
                this.drawLine(this.xMouseStart, this.yMouseStart, this.xMouse, this.yMouse, colourname, 2)
            } else if (size === "M") {
                this.drawLine(this.xMouseStart, this.yMouseStart, this.xMouse, this.yMouse, colourname, 5)
            } else if (size === "L") {
                this.drawLine(this.xMouseStart, this.yMouseStart, this.xMouse, this.yMouse, colourname, 10)
            }
        }

    }

}

ControlObject.prototype.basicEllipse = basicEllipse;
ControlObject.prototype.strokeRect = strokeRect;
ControlObject.prototype.DrawingAreaRect = DrawingAreaRect ;
ControlObject.prototype.starStroke = starStroke;
ControlObject.prototype.strokeTriangle = strokeTriangle;
ControlObject.prototype.strokeHeart = strokeHeart;
ControlObject.prototype.strokeDiamond = strokeDiamond;
ControlObject.prototype.drawLine = drawLine;


