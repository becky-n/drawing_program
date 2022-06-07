console.log("control.js is called");

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
        this.w = 0;
        this.h = 0;

        this.objectSet = [];

        this.Ax = Ax;
        this.Ay = Ay;
        this.Aw = Aw;
        this.Ah = Ah;

        this.mouseIsDown = false;

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

        this.inBounds = false;

    }

    getRandomInt(min, max) {
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
            this.mouseIsDown = true;
        }
        console.log(this.inBounds)
    }

    inBoundsCheck(xM, yM, x, y, w, h){
        // check the boundaries
        // return true if inside boundaries
        // return false if outside boundaries
        return xM > x && xM < x + w && yM > y && yM < y + h;

    }

    mMove(e) {
        super.mMove(e);

        let name = InteractiveButton.selected.text;
        let colourname = Swatch.colour;
        let size = Size.selected.text;

        if (this.mouseIsDown === true && name === "Brush" && this.inBoundsCheck(this.xMouse, this.yMouse, this.Ax, this.Ay, this.Aw, this.Ah)) {

            // checks boundaries and only strokes if mouse is held down and moving
            if (size === "S") {
                // small brush
                let temp = new Brush(this.xMouse,this.yMouse,5,colourname)
                this.objectSet.push(temp)

            }
            if (size === "M") {
                // medium brush
                let temp_2 = new Brush(this.xMouse, this.yMouse, 20, colourname)
                this.objectSet.push(temp_2)
            }
            if (size === "L") {
                // large brush
                let temp_4 = new Brush(this.xMouse, this.yMouse, 50, colourname)
                this.objectSet.push(temp_4)
            }
        } else if (this.mouseIsDown === true && name === "Line Brush" && this.inBoundsCheck(this.xMouse, this.yMouse, this.Ax, this.Ay, this.Aw, this.Ah)) {

            if (size === "S") {
                // small brush
                let temp = new Line(this.xMouseStart, this.yMouseStart, this.xMouse, this.yMouse, colourname, 2)
                this.objectSet.push(temp)
            }
            if (size === "M") {
                // medium brush
                let temp_2 = new Line(this.xMouseStart, this.yMouseStart, this.xMouse, this.yMouse, colourname, 5)
                this.objectSet.push(temp_2)
            }
            if (size === "L") {
                // large brush
                let temp_4 = new Line(this.xMouseStart, this.yMouseStart, this.xMouse, this.yMouse, colourname, 10)
                this.objectSet.push(temp_4)
            }
        } else if (this.mouseIsDown === true && name === "Spray" && this.inBoundsCheck(this.xMouse, this.yMouse, this.Ax, this.Ay, this.Aw, this.Ah)) {
            if (size === "S") {
                // small spray
                let density = 100;
                for (let i = density; i--;) {
                    let radius = 50;
                    let offsetX = this.getRandomInt(-radius, radius);
                    let offsetY = this.getRandomInt(-radius, radius);
                    let temp = new Rectangle(e.clientX + offsetX, e.clientY + offsetY, 1.5, 1.5, colourname);
                    this.objectSet.push(temp)
                }
            }
            if (size === "M") {
                // medium spray
                let density = 100;
                for (let i = density; i--;) {
                    let radius = 70;
                    let offsetX = this.getRandomInt(-radius, radius);
                    let offsetY = this.getRandomInt(-radius, radius);
                    let temp = new Rectangle(e.clientX + offsetX, e.clientY + offsetY, 1.5, 1.5, colourname);
                    this.objectSet.push(temp)
                }
            }
            if (size === "L") {
                // large spray
                let density = 100;
                for (let i = density; i--;) {
                    let radius = 100;
                    let offsetX = this.getRandomInt(-radius, radius);
                    let offsetY = this.getRandomInt(-radius, radius);
                    let temp = new Rectangle(e.clientX + offsetX, e.clientY + offsetY, 1.5, 1.5, colourname);
                    this.objectSet.push(temp)
                }
            }
        }
        else if (this.mouseIsDown === true && name === "Funky Brush" && this.inBoundsCheck(this.xMouse, this.yMouse, this.Ax, this.Ay, this.Aw, this.Ah)){

            let temp_11 = new funkyBrush(this.xMouse,this.yMouse,this.getRandomInt(1,20),colourname)
            this.objectSet.push(temp_11)
        }
    }

    mUp(e){
        super.mUp(e);
        let name = InteractiveButton.selected.text;
        let colourname = Swatch.colour;
        let size = Size.selected.text;
        console.log(colourname)

        // if the shape selected is the same as name, draws specific shape
        if(this.mouseIsDown === true) {
            if (name === "Rectangle") {
                // draws rectangle
                let temp_2 = new Rectangle(this.xMouseStart, this.yMouseStart, this.w, this.h, colourname);
                this.objectSet.push(temp_2);
            } else if (name === "Ellipse") {
                // draws ellipse
                let temp = new Ellipse(this.xMouseStart + this.w / 2, this.yMouseStart + this.h / 2, Math.abs(this.w / 2), Math.abs(this.h / 2), colourname);
                this.objectSet.push(temp);
            } else if (name === "Star") {
                // draws star
                let temp_3 = new Star(this.xMouseStart, this.yMouseStart, this.w, 0.5,5, colourname)
                this.objectSet.push(temp_3);
            } else if (name === "Triangle") {
                // draws triangle
                let temp_4 = new Triangle(this.xMouseStart, this.yMouseStart, this.w, this.h, colourname)
                this.objectSet.push(temp_4);
            } else if (name === "Heart") {
                // draws heart
                let temp_5 = new Heart(this.xMouseStart + this.w / 2, this.yMouseStart, this.w, this.h, colourname)
                this.objectSet.push(temp_5);
            } else if (name === "Diamond") {
                // draws diamond
                let temp_6 = new Diamond(this.xMouseStart, this.yMouseStart, this.w, this.h, colourname)
                this.objectSet.push(temp_6);
            } else if (name === "Line"){
                // when line is selected, allows user to change width of line
                if (size === "S") {
                    let temp_7 = new Line(this.xMouseStart, this.yMouseStart, this.xMouse, this.yMouse, colourname, 2)
                    this.objectSet.push(temp_7);
                } else if (size === "M") {
                    let temp_8 = new Line(this.xMouseStart, this.yMouseStart, this.xMouse, this.yMouse, colourname, 5)
                    this.objectSet.push(temp_8);
                } else if (size === "L") {
                    let temp_9 = new Line(this.xMouseStart, this.yMouseStart, this.xMouse, this.yMouse, colourname, 10)
                    this.objectSet.push(temp_9);
                }
            }
        }
        this.mouseIsDown = false;
    }

    update(){
        ctx.save();
        // drawing space
        this.DrawingAreaRect(450, 25, 475, 600, colArray[0][0], colArray[0][2],4)
        ctx.clip();
        // clips all shapes outside rectangle

        // makes it so draggable guide can't leave drawing space
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


