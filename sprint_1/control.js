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
        // makes rectangle from rectangle function in init
        let temp = new Rectangle(this.xMouseStart, this.yMouseStart, this.w, this.h, colArray[0][5]);
        // pushes into objectSet list
        this.objectSet.push(temp);
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
        // makes stroke rectangle, lines and circle
        let x = this.xMouseStart;
        let y = this.yMouseStart;
        let w = this.w;
        let h = this.h;
        this.strokeRect(x,y,w,h,colArray[0][2]);
        this.drawLine(x,y,x+w, y+h, colArray[0][2]);
        this.drawLine(x,y+h,x+w,y, colArray[0][2]);
        this.drawStrokeCircle(x+ w/2, y +h/2, Math.abs(w/10), colArray[0][2]);
    }
}


ControlObject.prototype.strokeRect = strokeRect;
ControlObject.prototype.drawLine = drawLine;
ControlObject.prototype.drawStrokeCircle = drawStrokeCircle;