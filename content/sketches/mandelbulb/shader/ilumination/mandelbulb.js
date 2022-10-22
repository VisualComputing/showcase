let rayMarchingShader;
let easycam;

let N = 8;
let deltaN = 1 / 100;

let MIN_MARCH_DISTANCE = 0.00001;

// vec3Picker
let ambientPosition;
let secondaryPosition;

// SLIDERS
let attenuationAngle
let attenuationIntensity
let fallout
let nSlider;
let marchDistance;
let deltaSlider;
let shiSlider;

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

    createUI();
}

function draw() {
    background(0);
    drawShader();

    updateParams();

    if (animate_cb.checked()) {
        N += deltaN;
        if (N < 2 || N >= 20)
            deltaN *= -1;
        nSlider.value(N);
    }
}

function drawShader() {
    push();

    shader(rayMarchingShader);


    rayMarchingShader.setUniform('showNormals', sn_cb.checked());
    rayMarchingShader.setUniform('AO', ao_cb.checked());
    rayMarchingShader.setUniform('specularLight', sl_cb.checked());
    rayMarchingShader.setUniform('lightAttenuation', la_cb.checked());
    rayMarchingShader.setUniform('diffuseLigth', dl_cb.checked());
    rayMarchingShader.setUniform('shapeColor', sc_cb.checked());
    rayMarchingShader.setUniform('ambientLight', al_cb.checked());

    rayMarchingShader.setUniform('diffuseLightC', getArrColor(dlPicker));
    rayMarchingShader.setUniform('diffuseLightP', ambientPosition.vec());
    rayMarchingShader.setUniform('gammaCorrection', gamma.value());
    rayMarchingShader.setUniform('diffuseIntensity', diffuseIntensity.value());

    rayMarchingShader.setUniform('ambientCoef', ambientCoefSlider.value());
    rayMarchingShader.setUniform('attenuationLight', attenuationSlider.value());
    rayMarchingShader.setUniform('exponentialTerm', exponentialSlider.value());
    rayMarchingShader.setUniform('numeratorTerm', numeratorSlider.value());

    rayMarchingShader.setUniform('falloutV', fallout.value());
    rayMarchingShader.setUniform('distancedNormal', dn_cb.checked());
    rayMarchingShader.setUniform('minhExp', minhSlider.value());
    rayMarchingShader.setUniform('maxhExp', maxhSlider.value());
    rayMarchingShader.setUniform('maxSamplingDistance', maxSamplingSlider.value());

    rayMarchingShader.setUniform('shapeColorC', getArrColor(scPicker));
    rayMarchingShader.setUniform('distanceColoring', scColorMode_cb.checked());
    rayMarchingShader.setUniform('specularColor', getArrColor(scsPicker));
    rayMarchingShader.setUniform('matShininess', shiSlider.value());
    rayMarchingShader.setUniform('specularIntensity', specularIntensity.value());

    rayMarchingShader.setUniform('N', N);
    rayMarchingShader.setUniform('rotate', rotate_cb.checked());

    rayMarchingShader.setUniform('cameraCenter', easycam.getCenter());
    rayMarchingShader.setUniform('cameraDistance', easycam.getDistance());
    rayMarchingShader.setUniform('dMatrix', dMatrix().mat3);
    rayMarchingShader.setUniform('MIN_MARCH_DISTANCE', minMarchSlider.value());
    rayMarchingShader.setUniform('sdfFactor', sdfFactor.value());

    rayMarchingShader.setUniform('time', frameCount);


    quad(-1, -1, 1, -1, 1, 1, -1, 1);

    pop();
}

function updateParams() {
    N = nSlider.value();
    deltaN = deltaSlider.value() / (deltaN > 0 ? 100 : -100);

    nSlider.update();
    fallout.update();
    deltaSlider.update();
    shiSlider.update();
    ambientCoefSlider.update();
    attenuationSlider.update();
    numeratorSlider.update();
    exponentialSlider.update();
    maxSamplingSlider.update();
    sdfFactor.update();
    gamma.update();
    diffuseIntensity.update();
    specularIntensity.update();


    minhSlider.txtValue((x) => `1e-${x}`);
    maxhSlider.txtValue((x) => `1e-${x}`);
    minMarchSlider.txtValue((x) => `1e-${x}`);
}

function getArrColor(c) {
    const co = c.color();
    return [red(co) / 255, green(co) / 255, blue(co) / 255];
}

function createUI() {
    // Panels

    let container = createDiv();
    container.id('mandelbulb-container')

    let onoffPanel = createElement('fieldset', ['<legend>On/Offf lights</legend>']);;

    let scPanel = createElement('fieldset', ['<legend>Material</legend>']);
    let dlPanel = createElement('fieldset', ['<legend>Light</legend>']);
    let slPanel = createElement('fieldset', ['<legend>Ambient/Attenuation</legend>']);
    let aoPanel = createElement('fieldset', ['<legend>AO/Normals</legend>']);
    let mdPanel = createElement('fieldset', ['<legend>Mandelbulb</legend>']);

    onoffPanel.id('onoff-panel');
    dlPanel.id('dl-panel');
    slPanel.id('sl-panel');
    scPanel.id('sc-panel');
    aoPanel.id('ao-panel');
    mdPanel.id('mandelbulb-panel');

    onoffPanel.class('panel');
    dlPanel.class('panel');
    slPanel.class('panel');
    aoPanel.class('panel');
    scPanel.class('panel');
    mdPanel.class('panel');

    container.child(onoffPanel);
    container.child(dlPanel);
    container.child(slPanel);
    container.child(aoPanel);
    container.child(scPanel);
    container.child(mdPanel);

    // ONOFFPANEL

    sc_cb = createCheckbox('Material color', false);
    sc_cb.class("checkbox-box");

    sn_cb = createCheckbox('Show normals', false);
    sn_cb.class("checkbox-box");

    al_cb = createCheckbox('Ambient light', false);
    al_cb.class("checkbox-box");

    dl_cb = createCheckbox('Diffuse light', false);
    dl_cb.class("checkbox-box");

    sl_cb = createCheckbox('Specular light', false);
    sl_cb.class("checkbox-box");

    la_cb = createCheckbox('Light attenuation', false);
    la_cb.class("checkbox-box");

    ao_cb = createCheckbox('Ambient Occlusion', true);
    ao_cb.class("checkbox-box");

    onoffPanel.child(sc_cb);
    onoffPanel.child(sn_cb);
    onoffPanel.child(al_cb);
    onoffPanel.child(dl_cb);
    onoffPanel.child(sl_cb);
    onoffPanel.child(la_cb)
    onoffPanel.child(ao_cb);

    // SCPANEL

    scPickerlbl = createElement("label", "Material color");
    scPicker = createColorPicker(color(177, 93, 234).toString('#rrggbb'));
    scPicker.class('color-picker');

    scColorMode_cb = createCheckbox('Distance coloring', false);
    scColorMode_cb.class("checkbox-box");

    scsPickerlbl = createElement("label", "Specular color");
    scsPicker = createColorPicker(color(57, 234, 175).toString('#rrggbb'));
    scsPicker.class('color-picker');

    shiSlider = uiSlider('Shininess', 'Shininess-slider', 0, 20, 10, 0.01);

    specularIntensity = uiSlider('Specular intensity', 'specularI-slider', 0., 2., 1.27, 0.001);

    scPanel.child(scPickerlbl);
    scPanel.child(scPicker);

    scPanel.child(scColorMode_cb);

    scPanel.child(scsPickerlbl);
    scPanel.child(scsPicker);

    scPanel.child(shiSlider.container);
    scPanel.child(specularIntensity.container)

    // DLPANEL

    dlPickerlbl = createElement("label", "Color");
    dlPicker = createColorPicker(color(142, 241, 239).toString('#rrggbb'));
    dlPicker.class('color-picker');

    ambientPosition = vec3Picker('Position', 'dl-pos-picker', -3., 2, -2);

    diffuseIntensity = uiSlider('Diffuse intensity', 'diffuseI-slider', 0., 2., 1., 0.001);

    gamma = uiSlider('Gamma', 'gamma-slider', 0., 4, 1., 0.01);

    dlPanel.child(dlPickerlbl);
    dlPanel.child(dlPicker);
    dlPanel.child(ambientPosition.container);
    dlPanel.child(diffuseIntensity.container);
    dlPanel.child(gamma.container);


    // SLPANEL

    ambientCoefSlider = uiSlider('Ambient intensity', 'ambientI-slider', 0, 2, 0.6, 0.001);
    attenuationSlider = uiSlider('Attenuation', 'attenuation-slider', 0, 0.2, 0.005, 0.0001);
    exponentialSlider = uiSlider('Eponential', 'expo-slider', 1, 10, 2, 0.1);
    numeratorSlider = uiSlider('Numerator', 'numerator-slider', 0.1, 10, 1, 0.1);

    slPanel.child(attenuationSlider.container);
    slPanel.child(exponentialSlider.container);
    slPanel.child(numeratorSlider.container);

    slPanel.child(ambientCoefSlider.container);

    // AOPANEL

    fallout = uiSlider('Fallout', 'fallout-slider', 0, 1, 0.46, 0.01);

    dn_cb = createCheckbox('Distance Normal', true);
    dn_cb.class("checkbox-box");

    minhSlider = uiSlider('Min h', 'minh-slider', 0, 10, 5, 0.1);
    maxhSlider = uiSlider('Max h', 'maxh-slider', 0, 10, 1.7, 0.1);

    maxSamplingSlider = uiSlider('Max sampling distance', 'maxt-slider', 0, 100, 3, 1);

    aoPanel.child(fallout.container);
    aoPanel.child(dn_cb);
    aoPanel.child(minhSlider.container);
    aoPanel.child(maxhSlider.container);
    aoPanel.child(maxSamplingSlider.container);

    // MDPANEL

    nSlider = uiSlider('N', 'n-slider', 2, 20, 8, 0.01);

    animate_cb = createCheckbox('Animate', true);
    animate_cb.class("checkbox-box");

    deltaSlider = uiSlider('delta', 'delta-slider', 1, 10, 1, 0.1);

    rotate_cb = createCheckbox('Rotate', true);
    rotate_cb.class("checkbox-box");

    minMarchSlider = uiSlider('Min march distance', 'minM-slider', 1, 30, 5, 0.5);

    sdfFactor = uiSlider('SDF factor', 'sdf-slider', 0.1, 10, 0.5, 0.01);
    // minMarchSlider = uiSlider('Min march distance', 'minM-slider', 1, 30, 5, 0.5);

    mdPanel.child(nSlider.container);
    mdPanel.child(animate_cb);
    mdPanel.child(deltaSlider.container);
    mdPanel.child(rotate_cb);
    mdPanel.child(minMarchSlider.container);
    mdPanel.child(sdfFactor.container);

    let wrapper = parent.getControlPanel();

    wrapper.appendChild(container.elt);
}

function uiSlider(lbl, id, min, max, value, step) {
    let ctd = createDiv();
    ctd.class('slider-container');
    ctd.id(id)

    let ctdLabel = createElement('label', lbl);
    ctdLabel.class('slider-label');

    let ctdContainer = createElement('div');
    ctdContainer.class('slider-box-container');

    let sld = createSlider(min, max, value, step);
    let sldV = createInput(sld.value(), 'text');

    ctdContainer.child(sldV);
    ctdContainer.child(sld);

    ctd.child(ctdLabel);
    ctd.child(ctdContainer);

    return {
        container: ctd,
        value: (x) => {
            if (x !== undefined) return float(sld.value(x));
            return float(sld.value())
        },
        update: () => { sldV.value(sld.value()) },
        txtValue: (f) => { sldV.value(f(sld.value())) }
    }
}

function vec3Picker(lbl, id, xv, yv, zv) {
    let xL = createElement('span', 'x:');
    let x = createInput(xv, 'number');

    let yL = createElement('span', 'y:');
    let y = createInput(yv, 'number');

    let zL = createElement('span', 'z:');
    let z = createInput(zv, 'number');

    let ctd = createDiv();
    ctd.class('vec3-container');
    ctd.id(id);

    let compCTD = createDiv();
    compCTD.class('vec3-label');

    let ctdLabel = createElement('label', lbl);
    compCTD.class('vec3-component-container')

    let xctd = createElement('label');
    xctd.class('vec3-component');
    xctd.child(xL);
    xctd.child(x);

    let yctd = createElement('label');
    yctd.class('vec3-component');
    yctd.child(yL);
    yctd.child(y);

    let zctd = createElement('label');
    zctd.class('vec3-component');
    zctd.child(zL);
    zctd.child(z);

    compCTD.child(xctd);
    compCTD.child(yctd);
    compCTD.child(zctd);

    ctd.child(ctdLabel);
    ctd.child(compCTD);

    return {
        container: ctd,
        x: () => float(x.value()),
        y: () => float(y.value()),
        z: () => float(z.value()),
        vec: () => [float(x.value()), float(y.value()), float(z.value())]
    };
}


// TODO: remove model panel, add shape panel. Make light model corrections
// https://www.shadertoy.com/view/4dXBD4