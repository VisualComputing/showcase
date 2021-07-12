let mosaic;
let image;
let symbol1;
let debug;

function preload() {
  image = loadImage('/go-vc/sketches/mandrill.png');
  symbol1 = loadImage('/go-vc/sketches/omkara.png');
  mosaic = loadShader('/go-vc/sketches/shader.vert', '/go-vc/sketches/photomosaic.frag');
}

function setup() {
  createCanvas(600, 600, WEBGL);
  textureMode(NORMAL);
  noStroke();
  shader(mosaic);
  mosaic.setUniform('image', image);
  mosaic.setUniform('symbol1', symbol1);
  mosaic.setUniform('resolution', 30);
  debug = true;
  mosaic.setUniform('debug', debug);
}

function draw() {
  background(33);
  cover(true);
}

function cover(texture = false) {
  beginShape();
  if (texture) {
    vertex(-width / 2, -height / 2, 0, 0, 0);
    vertex(width / 2, -height / 2, 0, 1, 0);
    vertex(width / 2, height / 2, 0, 1, 1);
    vertex(-width / 2, height / 2, 0, 0, 1);
  }
  else {
    vertex(-width / 2, -height / 2, 0);
    vertex(width / 2, -height / 2, 0);
    vertex(width / 2, height / 2, 0);
    vertex(-width / 2, height / 2, 0);
  }
  endShape(CLOSE);
}

function keyPressed() {
  if (key === 'd') {
    debug = !debug;
    mosaic.setUniform('debug', debug);
  }
}