# Efecto esteroquinético

## Problem statement

¿Qué sucede si multiplicamos dos colores RGB?

## Code

Pasos dentro del código:

1. Obtener los 2 valores RGB de la paleta
2. Calcular su multiplicación y mostrarla en pantalla

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

{{< p5-iframe sketch="/visual_computing/sketches/RGBmultiply.js" width="450" height="450" >}}

## Conclusions

La multiplicación RGB, bajo algunos casos, hacer ver que cuadrados tienen una cierta transparencia, y que los colores se combinan.
