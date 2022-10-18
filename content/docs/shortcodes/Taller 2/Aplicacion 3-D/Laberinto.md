# Laberinto 3-D

## Problema

Implemente una aplicacion 3D con WebGL. Puede usar la libreria p5.treegl o cualquier otra libreria necesaria.

## Introduccion

Un **laberinto** es un lugar compuesto por un conjunto de calles y encrucijadas con una disposicion compleja. El Objetivo de los laberintos es confudir a quienes se adentren dentro del mismo. Historicamente, los laberintos han sido mencionados en la mitologia como retos para los heroes **["El laberinto de Creta"]** asi mismo como una representacion artistica para la inteligencia y destreza.

## Desarrollo

Para poder Cumplir el objetivo de la aplicacion, se presenta el siguiente curso de acción tomado para el desarrollo. 

* Crear los objetos con ayuda de **P5.js**.
* Migrar los objetos a **p5.treegl** .
* Inclinar un plano en **3D**.
* Creacion de **colisiones** entre objetos.
* Mover un objeto sujeto al plano y sobre el plano.
* Induccion de fuerzas y mecanicas [**Aceleracion,Gravedad**].

## Codigos

---

1. **Colisiones y Movimiento sobre la inclinacion del plano:** Haciendo uso de las libreria p5.treegl y los metodos nativos de p5, se consigue rotar un plano con base en el movimiento que dicte el cursor. Sobre este plano se encuentra una esfera la cual esta colisionando contra este. La esfera se movera sieguien el vector de rotacion y orientacion del plano.

{{< hint info >}}
**¿Como interactuar con el plano?**  
Para cambiar la inclinacion debe deslizar el mouse presionando el boton de click derecho sobre el Canvas. Para mover la esfera use las teclas **"a"** y **"d"**.
{{< /hint >}}


{{< details "**CODIGO:** Colisiones y Movimiento" close >}}
```javascript
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
```
{{< /details >}}
{{< p5-iframe srcdoc="lib3" srcdoc="lib4" sketch="/visual_computing/sketches/Inclination.js" width="625" height="625" >}}

---

2. **Aceleracion:** Con base en el ejercicio anterior, ahora la esfera se deplaza sujeta al plano pero con una aceleracion de caracter oscilatorio dado por la funcion **Seno**.

{{< hint info >}}
**¿Como interactuar con el plano?**  
Para cambiar la inclinacion debe deslizar el mouse presionando el boton de click derecho sobre el Canvas, la esfera puede salirse del plano y del area visible por lo cual puede usar el slider para ajustar el zoom o el boton central del mouse.
{{< /hint >}}


{{< details "**CODIGO:** Aceleracion" close >}}
```javascript
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

```
{{< /details >}}
{{< p5-iframe srcdoc="lib3" srcdoc="lib4" sketch="/visual_computing/sketches/Acceleration.js" width="625" height="625" >}}