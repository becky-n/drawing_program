/**
 * Clickable Button
 * Includes all functions from interactive object
 * @param {number} x ball centre x
 * @param {number} y ball centre y
 * @param {number} w radius of ball
 * @param {number} h radius of ball
 * @param {string} fill fill colour
 * @param {string} over hover over colour
 * @param {string} selected button has been clicked colour
 * @param {string} stroke stroke colour
 * @param {string} text button text
 * @param {string} text button text colour
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



/**
 * Clickable Button
 * Includes all functions from interactive object
 * @param {number} x ball centre x
 * @param {number} y ball centre y
 * @param {number} w radius of ball
 * @param {number} h radius of ball
 * @param {string} fill fill colour
 * @param {string} stroke stroke colour
 * @param {string} strokeSel stroke selected colour
 */

class Swatch extends InteractiveObject {
    constructor(x, y, w, h, fill, stroke, strokeSel, overSel) {
        super();
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.fill = fill;
        this.stroke = stroke;
        this.strokeSel = strokeSel;
        this.overSel = overSel;
        this.inBounds = false;
    }
    update(){
        // if mouse is on button, changes colour
        this.inBounds = this.getBoundary(this.x,this.y, this.w, this.h,
            this.xMouse, this.yMouse)

       let stroke = this.stroke;
       let fill = this.fill;

        if(Swatch.selected ===this){
           stroke = this.strokeSel;
        }
        else if (this.inBounds){
            stroke =this.overSel
        }
        this.draw(this.x,this.y,this.w,this.h,fill,stroke)
    }
    mClick(){
        // registers click on button
        if(this.inBounds){
            Swatch.selected = this;
            Swatch.strokeSel = this.stroke;
            Swatch.colour = this.fill
        }
    }
    getBoundary(x,y,w,h,x_m,y_m){
        return x_m > x && x_m < x + w && y_m > y && y_m < y + h;
    }

    draw(x,y,w,h,c,s){
        // draws button
        ctx.beginPath();
        ctx.rect(x,y,w,h);
        ctx.lineWidth = 2;
       ctx.strokeStyle = s;
        ctx.fillStyle =c;
        ctx.fill();
        ctx.stroke();
    }
}

// placeholder if button is selected (values fill this)
Swatch.selected = "Placeholder";
Swatch.colour = "rgb(0,0,0)";
Swatch.strokeSel = "rgb(255,255,255)";


