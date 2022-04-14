console.log("control.js is called");

/**
 * Control
 * Includes all functions from interactive object
 * @param {number} w width
 * @param {number} h height
 * @param {array} objectSet list for shapes
 */

class ControlObject extends InteractiveObject{
    constructor(canvas) {
        super();
        this.w = 0;
        this.h = 0;

        this.objectSet = [];
    }

    mUp(e){
        super.mUp(e);
        let name = InteractiveButton.selected.text;

        // if the shape selected is the same as name, draws specific shape
        if (name === "Rectangle"){
            // draws rectangle
            let temp_2 = new Rectangle(this.xMouseStart, this.yMouseStart, this.w, this.h, colArray[0][5]);
            this.objectSet.push(temp_2);
        }
        else if(name === "Ellipse"){
            // draws ellipse
            let temp = new Ellipse(this.xMouseStart +this.w/2, this.yMouseStart + this.h/2, Math.abs(this.w/2),Math.abs(this.h/2), colArray[0][5]);
            this.objectSet.push(temp);
        }

    }

    update(){
        // set values for w and h
        this.w = this.xMouse - this.xMouseStart;
        this.h = this.yMouse - this.yMouseStart;

        // updates for length of objectSet
        for(let i = 0; i<this.objectSet.length; i++){
            this.objectSet[i].update();
        }

        // calls draw if mouse is down
        if (this.mouseIsDown) {
            console.log("mouse is down");
            this.draw();
        }
    }

    draw(){
        let name = InteractiveButton.selected.text;
        // if shape name is selected, draws stroke drawing guide
        if (name === "Rectangle"){
            // draws stroke rectangle
            this.strokeRect(this.xMouseStart,this.yMouseStart,this.w,this.h,colArray[0][2]);
        }
        else if(name === "Ellipse"){
            // draws stroke rectangle and stroke ellipse
            this.strokeRect(this.xMouseStart,this.yMouseStart,this.w,this.h,colArray[0][2]);
            this.basicEllipse(this.xMouseStart +this.w/2, this.yMouseStart + this.h/2, Math.abs(this.w/2),Math.abs(this.h/2), colArray[0][2]);
        }


    }

}

ControlObject.prototype.basicEllipse = basicEllipse;
ControlObject.prototype.strokeRect = strokeRect;
