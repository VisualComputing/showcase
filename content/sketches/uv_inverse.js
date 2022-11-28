let uvShader;

function preload() {
  uvShader = readShader('/visual_computing/sketches/shaders/uv.frag', { matrices: Tree.NONE, varyings: Tree.texcoords2 });
}

function setup() {
  createCanvas(300, 300, WEBGL);
  noStroke();
  shader(uvShader);
  textureMode(NORMAL);
}

function draw() {
  background(0);
  beginShape();
  vertex(-1, -1, 0, 0, 1);
  vertex( 1, -1, 0, 1, 1);
  vertex( 1,  1, 0, 1, 0);
  vertex(-1,  1, 0, 0, 0);
  endShape();
}