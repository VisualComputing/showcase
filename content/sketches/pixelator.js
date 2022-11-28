let myShader;
let shaderTexture;

let capture;
let dog;

function preload() {
  myShader = loadShader('/visual_computing/sketches/shaders/pixelator.vert', '/visual_computing/sketches/shaders/pixelator.frag');
  dog = loadImage('/visual_computing/imgs/casas/3.jpg');
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  
  shaderTexture = createGraphics(710, 400, WEBGL);

  shaderTexture.noStroke();
}

function draw() {
  shaderTexture.shader(myShader);
  
  myShader.setUniform('tex', dog);
  myShader.setUniform('tiles', map(mouseX, 0, width, 100, 1));

  background(220);
  //shaderTexture.rect(0,0,width,height);
}

function windowResized(){
    resizeCanvas(windowWidth, windowHeight);
}