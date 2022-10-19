

let planePosition,planeSize,planeColor,planeRotateV,planeMagnitudeR,planeMaxMagR;
let spherePosition,sphereMoveVector,sphereRadius,maxVertex,minVertex;
let fbo1,cam1,length = 600,boxes,box_key;
let mouseInitialV,mouseCurrentV,fovy;

const SPEED = 5;

function createPlane(){
  planeMaxMagR = 25;
  planeColor = "black";
  planeMagnitudeR = 0;
  
  planeRotateV = createVector(1,0,0)
  planeSize = createVector(100,50,0) //ancho y alto
  planePosition = createVector(0,0,0)
}

function createSphere(){
  
  sphereMoveVector = createVector(0,1,0);
  sphereRadius = 10;
  spherePosition = createVector(0,0,sphereRadius);
  
  minVertex = createVector(-planeSize.x/2,-planeSize.y/2,0);
  maxVertex = createVector(planeSize.x/2,planeSize.y/2,0);
}

function setup() {

  createCanvas(length, length);
  fbo1 = createGraphics(width, height, WEBGL);
  
  // FBO camera
  cam1 = new Dw.EasyCam(fbo1._renderer, { distance: 200 });
  let state1 = cam1.getState();
  cam1.state_reset = state1;   // state to use on reset (double-click/tap)
  cam1.setViewport([0, 0, width / 2, height]);
  document.oncontextmenu = function () { return false; }
  
  //Interactive elements
  createPlane();
  createSphere();
  
  
  // scene interactions
  fovy = createSlider(PI / 12, PI * (11 / 12), PI / 3, PI / 48);
  fovy.position(10, 10);
  fovy.style('width', '80px');
}

function draw() {
  //Background elements
  fbo1.background(120, 125, 115);
  fbo1.reset();
  fbo1.perspective(fovy.value());
  fbo1.axes();
  fbo1.grid();
  fbo1.rotate((PI/100)*planeMagnitudeR, planeRotateV)
  
  //Dibujar el plano
  fbo1.push();
  fbo1.fill(planeColor);
  fbo1.translate(planePosition);
  fbo1.plane(planeSize.x,planeSize.y)
  fbo1.pop()

  //Dibujar la esfera
  fbo1.push();
  fbo1.fill("white");
  fbo1.translate(spherePosition);
  fbo1.sphere(sphereRadius)
  fbo1.pop()
  
  // movimiento de la esfera
  if(keyIsPressed && key == "a"){
    spherePosition = createVector(sphereMoveVector.x*2+spherePosition.x, 
                                  sphereMoveVector.y*2+spherePosition.y, 
                                  sphereMoveVector.z*2+spherePosition.z)
    //spherePosition.z += 1
  }
  else if(keyIsPressed && key == "d"){
    spherePosition = createVector(sphereMoveVector.x*-2+spherePosition.x, 
                                  sphereMoveVector.y*-2+spherePosition.y, 
                                  sphereMoveVector.z*-2+spherePosition.z)
  }
  
  //Colisión
  if(spherePosition.x >= minVertex.x && spherePosition.y >= minVertex.y && spherePosition.z-10 >= minVertex.z &&
     spherePosition.x <= maxVertex.x && spherePosition.y <= maxVertex.y && spherePosition.z-10 <= maxVertex.z){
      planeColor = "white"    
  }
  else{
    planeColor = "black"
  }
  beginHUD();
  image(fbo1, 0, 0);
  endHUD();
  
}

function getVectorModule(vector){
  return Math.sqrt(vector.x**2 +vector.y**2 +vector.z**2)
}

function mousePressed() {
  mouseInitialV = createVector(mouseX, mouseY, 0)
}


function mouseDragged(){
  mouseCurrentV = createVector(mouseX, mouseY, 0)

  let vectorSubstra =  createVector(mouseInitialV.x - mouseCurrentV.x,mouseInitialV.y - mouseCurrentV.y,mouseInitialV.z - mouseCurrentV.z)
  let mod = getVectorModule(vectorSubstra)
  
  let vectorDir = createVector(vectorSubstra.x/mod,vectorSubstra.y/mod,vectorSubstra.z/mod )
  sphereMoveVector = createVector(vectorDir.x, vectorDir.y, vectorDir.z)
  
  let aux = vectorDir.x
  vectorDir.x = vectorDir.y
  vectorDir.y = -aux
  
  if (mod < planeMaxMagR){
    planeMagnitudeR = mod
  }
  planeRotateV = vectorDir
}