let theShader;
let shaderTexture;

let theta = 0;

let x;
let y;
let outsideRadius = 200;
let insideRadius = 100;


function preload(){
    
  theShader = loadShader('/visual_computing/sketches/shaders/shader.vert','/visual_computing/sketches/shaders/shader.frag');
}

function setup() {

  createCanvas(windowWidth*0.95, windowHeight*0.95, WEBGL);
  noStroke();

  shaderTexture = createGraphics(710, 400, WEBGL);

  shaderTexture.noStroke();

}

function draw() {

  shaderTexture.shader(theShader);

  theShader.setUniform("u_resolution", [width, height]);
  theShader.setUniform("u_mouse", [mouseX>0?mouseX:0.0, mouseY>0?mouseY:0.0]);

  
  shaderTexture.rect(0,0,width,height);

  background("blue");
  orbitControl();
  
  texture(shaderTexture);
  
  push();
  rotateZ(theta * mouseX * 0.0001);
  rotateX(theta * mouseX * 0.0001);
  rotateY(theta * mouseX * 0.0001);  
  theta += 0.01;
  sphere(125);
  pop();
}


function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}