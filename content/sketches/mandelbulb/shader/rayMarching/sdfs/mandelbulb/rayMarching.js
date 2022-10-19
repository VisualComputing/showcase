let rayMarchingShader;
let easycam;

let N = 8;

function preload() {

    // Load shader with position2 varying
    params = {
        precision: Tree.highp, 
        matrices: Tree.NONE, 
        varyings: Tree.position2
    }
    
    rayMarchingShader = readShader('/showcase/sketches/mandelbulb/shader/rayMarching/sdfs/mandelbulb/raymarching.frag', params);
}

function setup() {
    let canvas = createCanvas(725, 725, WEBGL);

    parent.disableScroll(canvas.canvas);

    easycam = createEasyCam({ distance: 500 });

    textureMode(NORMAL);
    noStroke();
}

function draw() {
    background(0);
    drawShader();
}

function drawShader() {
    push();

    shader(rayMarchingShader);

    rayMarchingShader.setUniform('cameraDistance', easycam.getDistance());
    rayMarchingShader.setUniform('dMatrix', dMatrix().mat3);
    rayMarchingShader.setUniform('N', N);

    quad(-1, -1, 1, -1, 1, 1, -1, 1);

    pop();
}