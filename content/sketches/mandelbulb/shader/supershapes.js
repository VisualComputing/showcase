const LIMIT = 2;

let N = 2;

let mandelbulbShader;

let easycam;

let deltaN = 0.008;

function preload() {
    mandelbulbShader = readShader('/showcase/sketches/mandelbulb/shader/mandelbulb.frag', { precision: Tree.highp, matrices: Tree.NONE, varyings: [Tree.position2 | Tree.texcoords2] });
}

function setup() {
    createCanvas(725, 725, WEBGL);
    easycam = createEasyCam({ distance: 500 });
    textureMode(NORMAL);
    noStroke();
}

function draw() {
    background(0);

    drawShader();

    N += deltaN;
    if (N < 2 || N >= 24)
        deltaN *= -1;
}

function drawShader() {
    push();

    shader(mandelbulbShader);
    mandelbulbShader.setUniform('LIMIT', LIMIT);
    mandelbulbShader.setUniform('N', N);

    mandelbulbShader.setUniform('WIDTH', width);
    mandelbulbShader.setUniform('HEIGHT', height);

    mandelbulbShader.setUniform('VOLUMETRIC_RENDER', false);

    mandelbulbShader.setUniform('cameraRotation', easycam.getRotation());
    mandelbulbShader.setUniform('cameraCenter', easycam.getCenter());
    mandelbulbShader.setUniform('cameraDistance', easycam.getDistance());

    mandelbulbShader.setUniform('mMatrix', dMatrix().mat3);
    mandelbulbShader.setUniform('mouseX', mouseX)

    mandelbulbShader.setUniform('time', frameCount);

    quad(-width / 2, -height / 2, width / 2, -height / 2, width / 2, height / 2, -width / 2, height / 2);

    pop();
}

function keyPressed() {
    if (keyCode === LEFT_ARROW) {
        if(isCapturing())  stopCapturing();
    } if(keyCode === RIGHT_ARROW){
        startCapturing();
    }
}
