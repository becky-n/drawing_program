//console.log("main.js is called")

let C = new ControlObject(canvas,450, 25, 475, 600);
// defining canvas

// defining shape buttons
let A_0 = new InteractiveButton(25,25,200,60,colArray[0][1],colArray[0][0], colArray[0][0], colArray[0][2], 'Rectangle', colArray[0][2])
let A_1 = new InteractiveButton(25,85,200,60,colArray[0][1],colArray[0][0], colArray[0][0], colArray[0][2], 'Ellipse', colArray[0][2])
let A_2 = new InteractiveButton(25,145,200,60,colArray[0][1],colArray[0][0], colArray[0][0], colArray[0][2], 'Star', colArray[0][2])
let A_3 = new InteractiveButton(25,205,200,60,colArray[0][1],colArray[0][0], colArray[0][0], colArray[0][2], 'Triangle', colArray[0][2])
let A_4 = new InteractiveButton(25,265,200,60,colArray[0][1],colArray[0][0], colArray[0][0], colArray[0][2], 'Heart', colArray[0][2])
let A_5 = new InteractiveButton(25,325,200,60,colArray[0][1],colArray[0][0], colArray[0][0], colArray[0][2], 'Diamond', colArray[0][2])
let A_6 = new InteractiveButton(275,25,150,54,colArray[0][1],colArray[0][0], colArray[0][0], colArray[0][2], 'Line', colArray[0][2])

// defining brush buttons
let A_7 = new InteractiveButton(275,180,150,54,colArray[0][1],colArray[0][0], colArray[0][0], colArray[0][2], 'Brush', colArray[0][2])
let A_8 = new InteractiveButton(275,230,150,54,colArray[0][1],colArray[0][0], colArray[0][0], colArray[0][2], 'Line Brush', colArray[0][2])
let A_9 = new InteractiveButton(275,280,150,54,colArray[0][1],colArray[0][0], colArray[0][0], colArray[0][2], 'Spray', colArray[0][2])
let A_10 = new InteractiveButton(275,330,150,54,colArray[0][1],colArray[0][0], colArray[0][0], colArray[0][2], 'Funky Brush', colArray[0][2])

// defining undo and clear buttons
let U_1 = new InteractiveButton(50,550,150,50,colArray[0][1],colArray[0][0], colArray[0][0], colArray[0][2], 'Undo', colArray[0][2])
let U_2 = new InteractiveButton(250,550,150,50,colArray[0][1],colArray[0][0], colArray[0][0], colArray[0][2], 'Clear', colArray[0][2])

// defining shape buttons
let S_1 = new Size(275,105,50,50,colArray[0][1],colArray[0][0], colArray[0][0], colArray[0][2], 'S', colArray[0][2],0.5)
let S_2 = new Size(325,105,50,50,colArray[0][1],colArray[0][0], colArray[0][0], colArray[0][2], 'M', colArray[0][2],1)
let S_3 = new Size(375,105,50,50,colArray[0][1],colArray[0][0], colArray[0][0], colArray[0][2], 'L', colArray[0][2],3)

// defining swatch set
let swatch_set = []

for(let i = 0; i<colArray.length; i++) {
    for (let j = 0; j < colArray[i].length; j++) {
        let temp = new Swatch(25 + 33.33 * j, 422+33.33 * i, 33.33, 33.33, colArray[i][j],colArray[0][1],colArray[0][2],colArray[0][2])
        swatch_set.push(temp);
    }
}

// defining sets
let buttonSet = [A_0, A_1,A_2,A_3, A_4,A_5,A_6,A_7,A_8,A_9,A_10]
let undoSet = [U_1,U_2]
let sizeSet = [S_1,S_2,S_3]

function animate(){
    // clears canvas
    ctx.clearRect(0,0, width, height);

    // updates canvas
    // G.update();
    C.update();
    ctx.restore();

    for(let i=0; i<buttonSet.length; i++){
        buttonSet[i].update();
    }

    for(let i=0; i<sizeSet.length; i++){
        sizeSet[i].update();
    }

    for(let i=0; i<undoSet.length; i++){
        undoSet[i].update();
    }

    for(let i = 0; i<swatch_set.length; i++){
        swatch_set[i].update()
    }

    window.requestAnimationFrame(animate);
}
animate();
