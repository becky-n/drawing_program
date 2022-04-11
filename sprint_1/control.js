console.log("control.js is called");

class ControlObject extends InteractiveObject{
    constructor(canvas) {
        super();
        this.w = 0;
        this.h = 0;
        this.objectSet = [];
    }
    mUp(e){
        super.mUp(e);
        let temp = new Rectangle(this.xMouseStart, this.yMouseStart, this.w, this.h, colArray[0][5]);
        this.objectSet.push(temp);
    }

    update(){
        this.w = this.xMouse - this.xMouseStart;
        this.h = this.yMouse - this.yMouseStart;
        for(let i = 0; i<this.objectSet.length; i++){
            this.objectSet[i].update();
        }
        if (this.mouseIsDown) {
            console.log("mouse is down");
            this.draw();
        }
    }

    draw(){
        this.strokeRect(this.xMouseStart,this.yMouseStart,this.w,this.h,colArray[0][2]);
    }
}

ControlObject.prototype.strokeRect = strokeRect;
