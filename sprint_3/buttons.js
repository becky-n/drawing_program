/**
 * Clickable Button
 * Includes all functions from interactive object
 * @param {number} x centre x
 * @param {number} y centre y
 * @param {number} w width
 * @param {number} h height
 * @param {number} fill fill colour
 * @param {number} over hover over colour
 * @param {number} selected button has been clicked colour
 * @param {number} stroke stroke colour
 * @param {number} text button text
 * @param {number} textColour button text colour
 */

class InteractiveButton extends InteractiveObject {
    constructor(x, y, w, h, fill, over, selected, stroke, text, textColour) {
        super();
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.fill = fill;
        this.over = over;
        this.selected = selected;
        this.stroke = stroke;
        this.text = text;
        this.textColour = textColour;
        this.inBounds = false;
    }
    update(){
        // if mouse is on button, changes colour
        this.inBounds = this.getBoundary(this.x,this.y, this.w, this.h,
            this.xMouse, this.yMouse)
        let fill = this.fill;
        if(InteractiveButton.selected ===this){
            fill = this.selected
        }else if (this.inBounds){
            fill =this.over
        }
        this.draw(this.x,this.y,this.w,this.h,fill, this.stroke,this.text,
            this.textColour)
    }
    mClick(){
        // registers click on button
        if(this.inBounds){
            InteractiveButton.selected = this;
        }
    }
    getBoundary(x,y,w,h,x_m,y_m){
        return x_m > x && x_m < x + w && y_m > y && y_m < y + h;
    }

    draw(x,y,w,h,c,s, txt, txtCol){
        // draws button and sets font etc
        ctx.beginPath();
        ctx.rect(x,y,w,h);
        ctx.lineWidth = 2;
        ctx.strokeStyle = s;
        ctx.fillStyle =c;
        ctx.fill();
        ctx.stroke();

        let myFont = "bold 50 px 'Trebuchet MS', Verdana, sans-serif";
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'center';
        ctx.font = myFont;

        ctx.fillStyle = txtCol;
        ctx.fillText(txt, x + w/2, y + h/2)
    }
}

// placeholder if button is selected (values fill this)
InteractiveButton.selected = "Placeholder";


