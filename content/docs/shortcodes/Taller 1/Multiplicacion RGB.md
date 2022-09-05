# Multiplicación RGB

## Problem statement

¿Qué sucede si multiplicamos dos colores RGB?

## Code

Pasos dentro del código:

1. Obtener los 2 valores RGB de la paleta
2. Calcular su multiplicación y mostrarla en pantalla

{{< details title="source code" open=false >}}
{{< highlight html >}}
let backgroundColor;
let color1, color2
function setup() {
  createCanvas(200, 200);
  let c1 = createInput("0,0,0",'color')
  let c2 = createInput("0,0,0",'color')
  
  
  c1.input(()=> setColor1(c1,c2))
  c2.input(()=> setColor1(c1,c2))
}

function setColor1(c1,c2){
  let color1 = color(red(c1.value()), green(c1.value()), blue(c1.value()))
 let black = color(0,0,0)
   fill(color1)
  rect(0,0, 130,130)
  let color2 = color(red(c2.value()), green(c2.value()), blue(c2.value()))
  fill(color2)
  rect(70,70, 130,130)
  
   //let white = color(255,255,255)
   
  const cred = (red(c1.value()) * red(c2.value())) / 255;
  const cblue = (blue(c1.value()) * blue(c2.value())) / 255;
  const cgreen = (green(c1.value()) * green(c2.value())) /255;
  fill(color(cred, cgreen,cblue))
  rect(70,70, 60,60)
  //background(cred,cgreen,cblue)

}
{{< /highlight >}}
{{< /details >}}

{{< p5-iframe sketch="/visual_computing/sketches/RGBmultiply.js" width="450" height="450" >}}

## Conclusions

La multiplicación RGB, bajo algunos casos, hacer ver que cuadrados tienen una cierta transparencia, y que los colores se combinan.
