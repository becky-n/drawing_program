console.log("main.js is called")

// calls objects
let G = new Grid(width,height, 25, colArray[0][2],0.3);
let C = new ControlObject(canvas,350, 50, 400, 500);
let A_0 = new InteractiveButton(80,100,200,50,colArray[0][1],colArray[0][0], colArray[0][0], colArray[0][2], 'Rectangle', colArray[0][2])
let A_1 = new InteractiveButton(80,150,200,50,colArray[0][1],colArray[0][0], colArray[0][0], colArray[0][2], 'Ellipse', colArray[0][2])
let C_1 = new Swatch(80,200,50,50, colArray[0][0], colArray[0][2], colArray[0][0], colArray[0][0])
let C_2 = new Swatch(130,200,50,50, colArray[0][1],  colArray[0][2], colArray[0][0], colArray[0][0])
let C_3 = new Swatch(180,200,50,50, colArray[0][2], colArray[0][2], colArray[0][0], colArray[0][0])
let C_4 = new Swatch(230,200,50,50, colArray[0][3],  colArray[0][2], colArray[0][0], colArray[0][0])
let C_5 = new Swatch(80,250,50,50, colArray[0][4], colArray[0][2], colArray[0][0], colArray[0][0])
let C_6 = new Swatch(130,250,50,50, colArray[0][5], colArray[0][2], colArray[0][0], colArray[0][0])
let C_7 = new Swatch(180,250,50,50,colArray[0][6], colArray[0][2], colArray[0][0], colArray[0][0])
let C_8 = new Swatch(230,250,50,50, colArray[0][7], colArray[0][2], colArray[0][0],colArray[0][0])
let C_9 = new Swatch(80,300,50,50, colArray[0][8], colArray[0][2], colArray[0][0], colArray[0][0])
let C_10 = new Swatch(130,300,50,50, colArray[0][9], colArray[0][2], colArray[0][0], colArray[0][0])
let C_11 = new Swatch(180,300,50,50, colArray[0][10], colArray[0][2], colArray[0][0], colArray[0][0])
let C_12 = new Swatch(230,300,50,50, colArray[0][11], colArray[0][2], colArray[0][0], colArray[0][0])


let buttonSet = [A_0, A_1]
let colSet = [C_1, C_2, C_3, C_4, C_5, C_6, C_7, C_8, C_9, C_10, C_11, C_12]

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

    window.requestAnimationFrame(animate);
}
animate();
