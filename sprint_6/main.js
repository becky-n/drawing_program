console.log("main.js is called")

// calls objects
let G = new Grid(width,height, 25, colArray[0][2],0.3);
let C = new ControlObject(canvas,425, 25, 450, 600);
let A_0 = new InteractiveButton(25,25,200,54,colArray[0][1],colArray[0][0], colArray[0][0], colArray[0][2], 'Rectangle', colArray[0][2])
let A_1 = new InteractiveButton(25,79,200,54,colArray[0][1],colArray[0][0], colArray[0][0], colArray[0][2], 'Ellipse', colArray[0][2])
let A_2 = new InteractiveButton(25,133,200,54,colArray[0][1],colArray[0][0], colArray[0][0], colArray[0][2], 'Star', colArray[0][2])
let A_3 = new InteractiveButton(25,187,200,54,colArray[0][1],colArray[0][0], colArray[0][0], colArray[0][2], 'Triangle', colArray[0][2])
let A_4 = new InteractiveButton(25,241,200,54,colArray[0][1],colArray[0][0], colArray[0][0], colArray[0][2], 'Heart', colArray[0][2])
let A_5 = new InteractiveButton(25,295,200,54,colArray[0][1],colArray[0][0], colArray[0][0], colArray[0][2], 'Diamond', colArray[0][2])
let C_1 = new Swatch(25,400,50,50, colArray[0][0], colArray[0][2], colArray[0][0], colArray[0][0])
let C_2 = new Swatch(75,400,50,50, colArray[0][1],  colArray[0][2], colArray[0][0], colArray[0][0])
let C_3 = new Swatch(125,400,50,50, colArray[0][2], colArray[0][2], colArray[0][0], colArray[0][0])
let C_4 = new Swatch(275,400,50,50, colArray[0][3],  colArray[0][2], colArray[0][0], colArray[0][0])
let C_5 = new Swatch(225,400,50,50, colArray[0][4], colArray[0][2], colArray[0][0], colArray[0][0])
let C_6 = new Swatch(175,400,50,50, colArray[0][5], colArray[0][2], colArray[0][0], colArray[0][0])
let C_7 = new Swatch(125,450,50,50,colArray[0][6], colArray[0][2], colArray[0][0], colArray[0][0])
let C_8 = new Swatch(25,450,50,50, colArray[0][7], colArray[0][2], colArray[0][0],colArray[0][0])
let C_9 = new Swatch(325,400,50,50, colArray[0][8], colArray[0][2], colArray[0][0], colArray[0][0])
let C_10 = new Swatch(275,450,50,50, colArray[0][9], colArray[0][2], colArray[0][0], colArray[0][0])
let C_11 = new Swatch(175,450,50,50, colArray[0][10], colArray[0][2], colArray[0][0], colArray[0][0])
let C_12 = new Swatch(225,450,50,50, colArray[0][11], colArray[0][2], colArray[0][0], colArray[0][0])
let C_13 = new Swatch(75,450,50,50, colArray[0][13], colArray[0][2], colArray[0][0], colArray[0][0])
let C_14 = new Swatch(325,450,50,50, colArray[0][14], colArray[0][2], colArray[0][0], colArray[0][0])
let U_1 = new InteractiveButton(25,550,150,50,colArray[0][1],colArray[0][0], colArray[0][0], colArray[0][2], 'Undo', colArray[0][2])
let U_2 = new InteractiveButton(225,550,150,50,colArray[0][1],colArray[0][0], colArray[0][0], colArray[0][2], 'Clear', colArray[0][2])


let buttonSet = [A_0, A_1,A_2,A_3, A_4,A_5]
let colSet = [C_1, C_2, C_3, C_4, C_5, C_6, C_7, C_8, C_9, C_10, C_11, C_12,C_13,C_14]
let undoSet = [U_1,U_2]

function animate(t){
    ctx.clearRect(0,0, width, height);
    //updates for canvas
    G.update();
    C.update();

    for(let i=0; i<buttonSet.length; i++){
        buttonSet[i].update();
    }

    for(let i=0; i<colSet.length; i++){
        colSet[i].update();
    }

    for(let i=0; i<undoSet.length; i++){
        undoSet[i].update();
    }

    window.requestAnimationFrame(animate);
}
animate();
