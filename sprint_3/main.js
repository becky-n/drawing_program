console.log("main.js is called")

// calls objects
let G = new Grid(width,height, 25, colArray[0][2],0.3);
let C = new ControlObject(canvas,350, 50, 400, 500);
let A_0 = new InteractiveButton(80,100,200,50,"rgb(255,0,0)",colArray[0][1], "rgb(255,0,0)", colArray[0][2], 'Rectangle', colArray[0][2])
let A_1 = new InteractiveButton(80,150,200,50,"rgb(255,121,0)",colArray[0][1], "rgb(255,121,0)", colArray[0][2], 'Ellipse', colArray[0][2])


let buttonSet = [A_0, A_1]

function animate(t){
    ctx.clearRect(0,0, width, height);
    //updates for canvas
    G.update();
    C.update();

    for(let i=0; i<buttonSet.length; i++){
        buttonSet[i].update();
    }

    window.requestAnimationFrame(animate);
}
animate();
