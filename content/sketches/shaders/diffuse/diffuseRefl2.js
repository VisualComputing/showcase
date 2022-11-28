// Goal in the 3d Brush is double, to implement:
// 1. a gesture parser to deal with depth, i.e.,
// replace the depth slider with something really
// meaningful. You may use a 3d sensor hardware
// such as: https://en.wikipedia.org/wiki/Leap_Motion
// or machine learning software to parse hand (or
// body) gestures from a (video) / image, such as:
// https://ml5js.org/
// 2. other brushes to stylize the 3d brush, taking
// into account its shape and alpha channel, gesture
// speed, etc.

// Brush controls
let lightShader;
let ambient;
function preload() {
  lightShader = readShader('../../../../sketches/shaders/diffuse/ambient.frag',
                           { varyings: Tree.NONE });
}

function setup() {
  createCanvas(600, 450, WEBGL);
  // easycam stuff
  let state = {
    distance: 250,           // scalar
    center: [0, 0, 0],       // vector
    rotation: [0, 0, 0, 1],  // quaternion
  };
  easycam = createEasyCam();
  easycam.state_reset = state;   // state to use on reset (double-click/tap)
  easycam.setState(state, 2000); // now animate to that state
  perspective();

  colorMode(RGB,1);
  // disable p5 lightning
  noLights();
  ambient = createSlider(0, 1, 1.0, 0.05);
  ambient.position(420, 10);
  ambient.style('width', '80px');
  ambient.input(() => { lightShader.setUniform('ambient', ambient.value()) });
  
  lightShader.setUniform('ambient', 0);

  colorPicker = createColorPicker(color(1,1,1));
  colorPicker.position(420,50)
  colorPicker.input(() => { lightShader.setUniform('uColor', 
 [red(colorPicker.color()),
  green(colorPicker.color()),
  blue(colorPicker.color()),
  1.0]) })
  lightShader.setUniform('uColor', 
 [red(colorPicker.color()),
  green(colorPicker.color()),
  blue(colorPicker.color()),
  1.0]) 
  shader(lightShader);
  // ...
  // select initial brush
}

function draw() {

  background(120);
  push();
  strokeWeight(0.8);
  stroke('magenta');
  grid({ dotted: false });
  pop();
  axes();

  noStroke();
  fill(1,0,1)
  push()
  translate(0,0,5)
  box(10,200,10);
  pop()

  
  fill(1,0,1)
  push()
  translate(0,0,5)
  box(200,10,10);
  pop()

  fill(0.8,0.3,0.3)
  push()
  translate(0,100,100)
  box(200,10,200);
  pop()

  fill(1,1,0)
  push()
  translate(100,0,100)
  box(10,200,200);
  pop()
  
}


function mouseWheel(event) {
  //comment to enable page scrolling
  return false;
}

function hexToRgb(hex) {
    hex = hex.replace('#', '');

    var bigint = parseInt(hex, 16);

    var r = (bigint >> 16) & 255;
    var g = (bigint >> 8) & 255;
    var b = bigint & 255;

    return color(r, g, b);
}