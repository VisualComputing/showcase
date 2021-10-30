var tamano=200

function setup() {
  createCanvas((tamano*2), tamano);
  colorMode(RGB,1)
  frameRate(100)
}

function draw() {  
  dibujoCuadrado(0,0,color(4/255, 252/255, 4/255))
  dibujoCuadrado(tamano,0,color(4/255, 252/255, 252/255))
  dibujoElipse(tamano/2,tamano/2,color(1,1,1))
  dibujoElipse(tamano+(tamano/2),tamano/2,color(1,1,1))
  if (!mouseIsPressed){ 
  cuadricula(0,0,color(4/255, 252/255, 252/255))
  cuadricula(tamano,0,color(4/255, 252/255, 4/255))}
  console.log(frameRate);
}
function dibujoElipse(x,y,tinte){
  push();
  noStroke();
  fill(tinte);
  ellipse(x,y,tamano/2,tamano/2);
  pop();
}
function dibujoCuadrado(x,y,tinte){
  push();
  noStroke();
  fill(tinte);
  rect(x,y,tamano,tamano);
  pop();
}
function cuadricula(x,y,tinte){
  push();
  noStroke();
  grueso=tamano/80
  espacio=tamano/20  
  for(i=0;i<tamano;i++){
    fill(color(0,0,0,0));
    rect(x,i,tamano,espacio);
    fill(tinte);
    rect(x,i+10,tamano,grueso)
    i=i+(espacio-1)    
  }
  for(i=x;i<x+tamano;i++){
    fill(color(0,0,0,0));
    rect(i,y,espacio,tamano);
    fill(tinte);
    rect(i+10,y,grueso,tamano)
    i=i+(espacio-1)    
  }
  pop();
}