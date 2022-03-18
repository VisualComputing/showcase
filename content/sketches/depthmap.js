// scene adapted from here: https://github.com/freshfork/p5.EasyCam/blob/master/examples/RandomBoxes/RandomBoxes.js

var depthShader;
var near, far;
var easycam;

function preload() {
  depthShader = loadShader('/showcase/sketches/shader.vert', '/showcase/sketches/depthmap.frag');
}

function setup () {  
  pixelDensity(1);  
  createCanvas(700, 600, WEBGL);
  setAttributes('antialias', true);
 
  // define initial state
  var state = {
    distance : 164.411,
    center   : [0, 0, 0],
    rotation : [-0.285, -0.257, -0.619, 0.685],
  };
  
  console.log(Dw.EasyCam.INFO);
  
  easycam = new Dw.EasyCam(this._renderer);
  easycam.state_reset = state;   // state to use on reset (double-click/tap)
  easycam.setState(state, 2000); // now animate to that state

  shader(depthShader);
  near = 1;
  far = 500;
  depthShader.setUniform('near', near);
  depthShader.setUniform('far', far);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  easycam.setViewport([0,0,windowWidth, windowHeight]);
}

function draw () {
  // projection
  perspective(60 * PI/180, width/height, near, far);
  
  // clear BG
  background(0);
  noStroke();
  
  rand.seed = 0;
  var count = 100;
  var trange = 100;
  for(var i = 0; i < count; i++){
      var dx = rand() * 25 + 8;
      var tx = (rand() * 2 - 1) * trange;
      var ty = (rand() * 2 - 1) * trange;
      var tz = (rand() * 2 - 1) * trange;

    push();
    translate(tx, ty, tz);
    box(dx);
    pop();
  }
}

var rand = function(){
  this.x = ++rand.seed;
  this.y = ++rand.seed;
  var val = Math.sin(this.x * 12.9898 + this.y * 78.233) * 43758.545;
  return (val - Math.floor(val));
}

rand.seed = 0;
