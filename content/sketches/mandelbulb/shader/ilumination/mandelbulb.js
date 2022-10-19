let rayMarchingShader;
let easycam;

let N = 8;

let MIN_MARCH_DISTANCE = 0.00001;

function preload() {

    // Load shader with position2 varying
    params = {
        precision: Tree.highp, 
        matrices: Tree.NONE, 
        varyings: Tree.position2
    }
    
    rayMarchingShader = readShader('/showcase/sketches/mandelbulb/shader/ilumination/mandelbulb.frag', params);
}

function setup() {
    let canvas = createCanvas(725, 725, WEBGL);

    parent.disableScroll(canvas.canvas);

    easycam = createEasyCam({ distance: 500 });

    textureMode(NORMAL);
    noStroke();

    sc_cb = createCheckbox('Shape color', true);
    sc_cb.position(10, 10);
    sc_cb.class("checkbox-box");

    sn_cb = createCheckbox('Show mormals', false);
    sn_cb.position(10, 50);
    sn_cb.class("checkbox-box")

    dl_cb = createCheckbox('Diffuse light', false);
    dl_cb.position(10, 90);
    dl_cb.class("checkbox-box")

    sl_cb = createCheckbox('Seccondary light', false);
    sl_cb.position(10, 130);
    sl_cb.class("checkbox-box");

    ao_cb = createCheckbox('Ambient Occlusion', false);
    ao_cb.position(10, 170);
    ao_cb.class("checkbox-box");
}

function draw() {
    background(0);
    drawShader();
}

function drawShader() {
    push();

    shader(rayMarchingShader);

    rayMarchingShader.setUniform('cameraCenter', easycam.getCenter());
    rayMarchingShader.setUniform('cameraDistance', easycam.getDistance());
    rayMarchingShader.setUniform('dMatrix', dMatrix().mat3);
    rayMarchingShader.setUniform('N', N);
    rayMarchingShader.setUniform('MIN_MARCH_DISTANCE', MIN_MARCH_DISTANCE);
    
    rayMarchingShader.setUniform('showNormals', sn_cb.checked());
    rayMarchingShader.setUniform('AO', ao_cb.checked());
    rayMarchingShader.setUniform('secondaryLigth', sl_cb.checked());
    rayMarchingShader.setUniform('diffuseLigth', dl_cb.checked());
    rayMarchingShader.setUniform('shapeColor', sc_cb.checked());

    quad(-1, -1, 1, -1, 1, 1, -1, 1);

    pop();
}