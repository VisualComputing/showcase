let testShader;

let cam1;
let cam2;

let pg1;
let pg2;

let slider;

function preload() {

    // Load shader with position2 varying
    const params = {
        precision: Tree.highp,
        matrices: Tree.NONE,
        varyings: Tree.position2
    }

    testShader = readShader('/showcase/sketches/mandelbulb/shader/setupTreegl/setup.frag', params);
}

function setup() {
    let canvas = createCanvas(725, 725);

    // Disable page scrolling when mouse over canvas
    parent.disableScroll(canvas.canvas);

    // Create cameras
    pg1 = createGraphics(width / 2, height, WEBGL);
    pg2 = createGraphics(width / 2, height, WEBGL);

    cam1 = createEasyCam(pg1._renderer, { distance: 500 });
    cam1.attachMouseListeners(this._renderer);

    cam2 = createEasyCam(pg2._renderer, { distance: 600 });
    cam2.attachMouseListeners(this._renderer);

    cam1.setViewport([0, 0, width / 2, height]);
    cam2.setViewport([width / 2, 0, width / 2, height]);

    cam1.IDX = 0;
    cam2.IDX = 1;

    // Create blue channel slider
    slider = createSlider(0, 255, 100);
    slider.position(width / 2 + 10, 10);
}

function draw() {
    background(0);

    // Pass uniforms to fragment shader
    testShader.setUniform('b', slider.value() / 255.);

    drawShader(cam1);
    drawShader(cam2);

    let vp1 = cam1.getViewport();
    image(pg1, vp1[0], vp1[1], vp1[2], vp1[3]);

    let vp2 = cam2.getViewport();
    image(pg2, vp2[0], vp2[1], vp2[2], vp2[3]);
}

// Draw scenes
function drawShader(cam) {
    pg = cam.graphics;

    pg.background(0);
    pg.reset();

    pg.push();

    // Set shader
    if (cam.IDX == 1)
        pg.shader(testShader);
    
    pg.quad(-pg.width / 2, -pg.height / 2, pg.width / 2, -pg.height / 2, pg.width / 2, pg.height / 2, -pg.width / 2, pg.height / 2);
    
    pg.pop();
}

