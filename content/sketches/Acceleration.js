let fbo1, cam1, fovy
let P,B
let mouseInitialV,mouseCurrentV

function Plane(){
  this.planeMaxMagR = 25;
  this.planeColor = "black";
  this.planeMagnitudeR = 0;
  
  this.planeRotateV = createVector(1,0,0);
  this.planeSize = createVector(100,100,0); //ancho y alto
  this.planePosition = createVector(0,0,0);
  
  this.draw = function(fbo){
    fbo.push();
      fbo.fill(this.planeColor);
      fbo.translate(this.planePosition);
      fbo.plane(this.planeSize.x,this.planeSize.y)
    fbo.pop()
  };
}

function Ball(P){
  this.sphereMoveVector = createVector(0,0,0);
  this.acceleration = createVector(0,0,0)
  this.sphereRadius = 10;
  this.spherePosition = createVector(0,0,this.sphereRadius);
 
  this.minVertex = createVector(-P.planeSize.x/2,-P.planeSize.y/2,0);
  this.maxVertex = createVector(P.planeSize.x/2,P.planeSize.y/2,0);
 
  this.draw = function(fbo){
    fbo.push();
      fbo.fill("white");
      fbo.translate(this.spherePosition);
      fbo.sphere(this.sphereRadius)
    fbo.pop()
  }
}
 
function setup() {
 
  createCanvas(600, 600);
  fbo1 = createGraphics(width, height, WEBGL);
 
  // FBO camera
  cam1 = new Dw.EasyCam(fbo1._renderer, { distance: 200 });
  let state1 = cam1.getState();
  cam1.state_reset = state1;   // state to use on reset (double-click/tap)
  cam1.setViewport([0, 0, width / 2, height]);
  document.oncontextmenu = function () { return false; }
 
  // scene interactions
  fovy = createSlider(PI / 12, PI * (11 / 12), PI / 3, PI / 48);
  fovy.position(10, 10);
  fovy.style('width', '80px');
 
  P = new Plane();
  B = new Ball(P);
 
}
 
function draw() {
 
  fbo1.background(120, 125, 115);
  fbo1.reset();
  fbo1.perspective(fovy.value());
  fbo1.axes();
  fbo1.grid();
  fbo1.rotate((PI/180)*P.planeMagnitudeR, P.planeRotateV);
  fbo1.strokeWeight(0.5)
 
 
  P.draw(fbo1);
  B.draw(fbo1);
 
  // movimiento de la esfera 
  if(P.planeRotateV.x != 0 || P.planeRotateV.y != 0){
    B.sphereMoveVector.x = (B.acceleration.x*0.15) + B.sphereMoveVector.x;
    B.sphereMoveVector.y = (B.acceleration.y*0.15) + B.sphereMoveVector.y;
 
    B.spherePosition.x = (B.sphereMoveVector.x*0.15) + B.spherePosition.x
    B.spherePosition.y = (B.sphereMoveVector.y*0.15) + B.spherePosition.y;
 
  }else if(P.planeRotateV.x == 0 && P.planeRotateV.y == 0){
    B.sphereMoveVector = createVector(0,0,0);
    B.acceleration = createVector(0,0,0);
  }
 
  //Colisión
  if(B.spherePosition.x >= B.minVertex.x && 
     B.spherePosition.y >= B.minVertex.y && 
     B.spherePosition.z-10 >= B.minVertex.z &&
     B.spherePosition.x <= B.maxVertex.x && 
     B.spherePosition.y <= B.maxVertex.y && 
     B.spherePosition.z-10 <= B.maxVertex.z){
 
      P.planeColor = "white"    
  }
  else{
    P.planeColor = "black"
  }
 
 
  beginHUD();
  image(fbo1, 0, 0);
  endHUD();
 
}
 
 
function getVectorModule(vector){
  return Math.sqrt(vector.x**2 +vector.y**2 +vector.z**2);
}
 
function mousePressed() {
  mouseInitialV = createVector(mouseX, mouseY, 0);
}
 
 
function mouseDragged(){
  
  mouseCurrentV = createVector(mouseX, mouseY, 0);
  let vectorSubstra =  createVector(mouseInitialV.x - mouseCurrentV.x,
                                    mouseInitialV.y - mouseCurrentV.y,
                                    mouseInitialV.z - mouseCurrentV.z);
  let mod = getVectorModule(vectorSubstra);
  let vectorDir = createVector(vectorSubstra.x/mod,
                               vectorSubstra.y/mod,
                               vectorSubstra.z/mod );
  let sine = sqrt(1-sq(vectorDir.z));
 
  B.acceleration = createVector(-sine*vectorDir.x, -sine*vectorDir.y, sine*vectorDir.z);
 
  let aux = vectorDir.x;
  vectorDir.x = vectorDir.y;
  vectorDir.y = -aux;
 
  if (mod < P.planeMaxMagR){
    P.planeMagnitudeR = mod
  }
  P.planeRotateV = vectorDir;
  P.planeRotateV.z = 0;

}