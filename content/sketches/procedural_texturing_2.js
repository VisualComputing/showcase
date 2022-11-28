let theShader;
let shaderTexture;

let theta = 0;

let x;
let y;
let outsideRadius = 200;
let insideRadius = 100;


function preload(){
  theShader = loadShader('/visual_computing/sketches/shaders/shader_2.vert','/visual_computing/sketches/shaders/shader_2.frag');
}

function setup() {
  
  createCanvas(windowWidth*0.95, windowHeight*0.95, WEBGL);
  noStroke();

  // initialize the createGraphics layers
  shaderTexture = createGraphics(710, 400, WEBGL);

  shaderTexture.noStroke();
}

function draw() {

  shaderTexture.shader(theShader);

  theShader.setUniform("u_resolution", [width, height]);
  theShader.setUniform("u_time", millis() / 1000.0);
  theShader.setUniform("u_mouse", [mouseX>0?mouseX:0.0, mouseY>0?mouseY:0.0]);

  
  shaderTexture.rect(0,0,width,height);

  background(40);
  
  orbitControl();
  
  texture(shaderTexture);
  
  push();  
  rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.005);
  box(width / 4);
  pop();
}


function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}