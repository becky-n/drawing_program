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
        let name = InteractiveButton.selected.text;
        if (name === "Rectangle"){
            let temp_2 = new Rectangle(this.xMouseStart, this.yMouseStart, this.w, this.h, colArray[0][5]);
            this.objectSet.push(temp_2);
        }
       else if(name === "Ellipse"){
            let temp = new Ellipse(this.xMouseStart +this.w/2, this.yMouseStart + this.h/2, Math.abs(this.w/2),Math.abs(this.h/2), colArray[0][5]);
            this.objectSet.push(temp);
        }

    }

    update(){
        this.w = this.xMouse - this.xMouseStart;
        this.h = this.yMouse - this.yMouseStart;

        for (let i = 0; i < this.objectSet.length; i++) {
            this.objectSet[i].update();
        }

        if (this.mouseIsDown) {
            console.log("mouse is down");
            this.draw();
        }
    }

    draw(){
        let name = InteractiveButton.selected.text;
        if (name === "Rectangle"){
            this.strokeRect(this.xMouseStart,this.yMouseStart,this.w,this.h,colArray[0][2]);
        }
        else if(name === "Ellipse"){
            this.strokeRect(this.xMouseStart,this.yMouseStart,this.w,this.h,colArray[0][2]);
            this.basicEllipse(this.xMouseStart +this.w/2, this.yMouseStart + this.h/2, Math.abs(this.w/2),Math.abs(this.h/2), colArray[0][2]);
        }
    }

}

ControlObject.prototype.basicEllipse = basicEllipse;
ControlObject.prototype.strokeRect = strokeRect;