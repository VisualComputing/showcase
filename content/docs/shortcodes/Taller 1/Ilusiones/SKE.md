# Efecto esteroquinético

## Problem statement

El efecto esteroquinético es una ilusión visual de la profundidad. Es un efecto ilusorio que depende del movimiento. Se basa en que la rotación de figuras adecuadas crea una ilusión tridimensional

## Code

Pasos dentro del código:

1. Dibujar el primer circulo
2. Iterar por cada círculo definiendo su rotación y su posición.

{{< details title="source code" open=false >}}
{{< highlight html >}}
let angle = 0;
let speed = 0.05;
let circleColor = true;

function setup() {
createCanvas(400, 400);
}

function draw() {
background(220);
angle += speed;
strokeWeight(1)
circle(200,200,400);
cirrcle(375)
}

function cirrcle(size){
fill(255,255,0)
if(circleColor){
fill(0,0,255)  
 }
circleColor = !circleColor

if(size>100){
translate(p5.Vector.fromAngle(millis() / 1000, 12.5));
strokeWeight(0)
circle(200,200, size);
cirrcle(size-25)
}else if(size>0){
translate(p5.Vector.fromAngle(millis() / 1000, -12.5));
circle(200,200, size);  
 cirrcle(size-25)
}
return
}
{{< /highlight >}}
{{< /details >}}

{{< p5-iframe sketch="/showcase/sketches/illusion3d.js" width="450" height="450" >}}

## Conclusions

Es una manera muy interesante de crear la ilusión de la tercera dimensión, estos conceptos van encaminados hacia la creación de gráficas en 3D.
