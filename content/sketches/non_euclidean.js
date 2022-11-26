'use strict';

let easycam;
let edge = 120;
let teapot;
let teapotTex;
let bunny;
let bunnyTex;
let ferrari;
let ferrariTex;
let mustang;
let mustangTex;
let texShader;

function preload() {
  // no varyings need to be emitted from the vertex shader
  texShader = readShader(
    '/visual_computing/sketches/shaders/non_euclidean.frag',
    {
      varyings: Tree.NONE,
    }
  );
  teapot = loadModel('/visual_computing/sketches/shaders/teapot.obj', true);
  bunny = loadModel('/visual_computing/sketches/shaders/bunny.obj', true);
  ferrari = loadModel('/visual_computing/sketches/shaders/ferrari.obj', true);
  mustang = loadModel('/visual_computing/sketches/shaders/mustang.obj', true);
}

function setup() {
  createCanvas(600, 600, WEBGL);
  // no need to normalize the texture
  // textureMode(NORMAL);
  shader(texShader);
  // resolution will be used to sample the offscreen textures
  emitResolution(texShader);
  easycam = createEasyCam();
  teapotTex = createGraphics(width, height, WEBGL);
  bunnyTex = createGraphics(width, height, WEBGL);
  ferrariTex = createGraphics(width, height, WEBGL);
  mustangTex = createGraphics(width, height, WEBGL);
}

function draw() {
  // 1. compute current main canvas camera params
  let position = treeLocation();
  let center = p5.Vector.add(position, treeDisplacement());
  let up = treeDisplacement(Tree.j);
  // in case the current camera projection params are needed check:
  // https://github.com/VisualComputing/p5.treegl#frustum-queries
  // 2. offscreen rendering
  // bunny graphics
  bunnyTex.background(200);
  bunnyTex.reset();
  bunnyTex.camera(
    position.x,
    position.y,
    position.z,
    center.x,
    center.y,
    center.z,
    up.x,
    up.y,
    up.z
  );
  bunnyTex.push();
  bunnyTex.fill('red');
  // most models use positive y-coordinates
  bunnyTex.scale(1, -1);
  bunnyTex.scale(0.6); // only bunny
  bunnyTex.model(bunny);
  bunnyTex.pop();
  // teapot graphics
  teapotTex.background(200);
  teapotTex.reset();
  teapotTex.camera(
    position.x,
    position.y,
    position.z,
    center.x,
    center.y,
    center.z,
    up.x,
    up.y,
    up.z
  );
  teapotTex.push();
  teapotTex.scale(1, -1);
  teapotTex.model(teapot);
  teapotTex.pop();

  // ferrari graphics
  ferrariTex.background(200);
  ferrariTex.reset();
  ferrariTex.camera(
    position.x,
    position.y,
    position.z,
    center.x,
    center.y,
    center.z,
    up.x,
    up.y,
    up.z
  );
  ferrariTex.push();
  ferrariTex.scale(1, -1);
  ferrariTex.model(ferrari);
  ferrariTex.pop();

  // mustang graphics
  mustangTex.background(200);
  mustangTex.reset();
  mustangTex.camera(
    position.x,
    position.y,
    position.z,
    center.x,
    center.y,
    center.z,
    up.x,
    up.y,
    up.z
  );
  mustangTex.push();
  mustangTex.scale(1, -1);
  mustangTex.scale(1.5);
  mustangTex.model(mustang);
  mustangTex.pop();

  // 3. main canvas
  background(0);
  push();
  // front (+z)
  stroke('purple');
  strokeWeight(1);
  texShader.setUniform('texture', bunnyTex);
  beginShape();
  vertex(-0, -edge, +0);
  // vertex(+edge, -edge, +edge);
  vertex(+edge, +edge, +edge);
  vertex(-edge, +edge, +edge);
  endShape(CLOSE);
  // top (+y)
  texShader.setUniform('texture', ferrariTex);

  beginShape();
  vertex(+0, -edge, +0); //upl
  vertex(+edge, +edge, -edge); //bl
  vertex(-edge, +edge, -edge); //br
  // vertex(-edge, -edge, +edge);
  endShape(CLOSE);

  // right (+x)
  texShader.setUniform('texture', teapotTex);
  beginShape();
  vertex(0, -edge, 0);
  // vertex(+edge, -edge, -edge);
  vertex(+edge, +edge, -edge);
  vertex(+edge, +edge, +edge);
  endShape(CLOSE);

  // bottom (+y)
  texShader.setUniform('texture', mustangTex);

  beginShape();
  vertex(-edge, +edge, +edge); //upl
  vertex(-edge, +edge, -edge); //upr
  vertex(0, -edge, 0); //u
  // vertex(-edge, -edge, +edge);
  endShape(CLOSE);


  texShader.setUniform('texture', ferrariTex);
  beginShape();
  vertex(-edge, +edge, -edge);
  vertex(+edge, +edge, -edge);
  vertex(+edge, +edge, +edge);
  vertex(-edge, +edge, +edge);
  endShape(CLOSE);
  pop();
}

function mouseWheel() {
  return false;
}
