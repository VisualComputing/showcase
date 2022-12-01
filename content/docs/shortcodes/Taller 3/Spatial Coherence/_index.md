# Spatial Coherence

## Problem statement

La coherencia espacial es el efecto visual por el cual los colores percibidos tienden a variar de manera proporcional a la distancia dentro de una determinada región de interes en la escena.

## Background

Por otra parte desde la perspectiva de la fisica, la coherencia espacial es la relación cruzada entre dos puntos en una onda en todo momento. Además de tambien ser una fuerte correlación entre los campos electricos en diferentes lugares, los cuales oscilan de forma correlacionada incluso si la estructura temporal se complica por una superposición de diferentes componentes de frecuencia. Este es un requisito fundamental para la direccionalidad de los rayos laser.

### Ejemplo
![](/visual_computing/imgs/resultado.JPG)

## Codigo

https://editor.p5js.org/acardenaso/sketches/KHkc3J1pF

{{< details "**CODIGO:** sketch.js" close >}}
**C**odigo generado usando el editor web de **P5.js**.
```javascript
let myShader
let img;

function preload(){
myShader = loadShader('shader.vert', 'shader.frag');
  let num = int(random(1, 31));
  //if(num == 1){
    img = loadImage('1.jpg'); 
  //} 
  
  /*if(num == 2){
    img = loadImage('2.jpg');
  }
  
  if(num == 3){
    img = loadImage('3.jpg');
  }*/
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  noStroke();
}

function draw() {
  background(220);
  
  myShader.setUniform('tex', img);
  myShader.setUniform('tiles', map(mouseX, 0, width, 100, 1));
  
  shader(myShader);
  rect(0, 0, width, height);
}
```
{{< /details >}}

{{< details "**CODIGO:** shader.js" close >}}
**C**odigo generado usando el editor web de **P5.js**.
```javascript
precision highp float;

varying vec2 vUV;

uniform sampler2D tex;
uniform float tiles;

void main() {
  vec2 uv = vUV;
  uv.y = 1.0 - uv.y;
  
  uv *= tiles;
  
  uv = floor(uv);
  
  uv /= tiles;
  
  vec4 texColor = texture2D(tex, uv);
  
  gl_FragColor = texColor;
}
```
{{< /details >}}

## Referencias

https://editor.p5js.org/oshoham/sketches/aAc4D3BBma

https://byjus.com/jee/coherence-and-coherent-sources/#:~:text=Spatial%20coherence%20can%2C%20therefore%2C%20be,a%20wave%20at%20all%20times.

https://www.rp-photonics.com/coherence.html