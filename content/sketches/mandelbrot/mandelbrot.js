let mandel;
function preload() {
    // load the shader definitions from files

    mandel = loadShader('/showcase/sketches/mandelbrot/shaders/shader.vert', '/showcase/sketches/mandelbrot/shaders/shader.frag');
}
function setup() {
    createCanvas(725, 725, WEBGL);
    // use the shader
    shader(mandel);
    noStroke();
    mandel.setUniform('p', [-0.74364388703, 0.13182590421]);
    describe('zooming Mandelbrot set. a colorful, infinitely detailed fractal.');
}

function draw() {
    mandel.setUniform('r', 1.5 * exp(-6.5 * (1 + sin(millis() / 2000))));
    quad(-1, -1, 1, -1, 1, 1, -1, 1);
}