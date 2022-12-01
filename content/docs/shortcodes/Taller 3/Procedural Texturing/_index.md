# Procedural Texturing

## Problem statement

El texturizado procedimental es un método para generar texturas superficiales utilizando procedimientos o algoritmos matemáticos. Esta tecnica tiene muchas ventajas como: el bajo costo de almacenamiento, la resolución ilimitada de texturas y el facil mapeo de texturas.

Este metodo tiene varios usos como: crear efectos esteticos, aumentar el agarre mecanico, disminuir la resistencia aerodinamica y modelar superficies o representaciones volumétricas de elementos naturales como madera , mármol , granito , metal , piedra y otros.

## Background

Ahora bien, para aplicar una textura por medio del Procedural Texturing se necesita primero las coordenadas de textura, estas son las coordenadas de los vértices del objeto en un espacio 2D, que generalmente llamamos st o espacio de textura.Estas nos brindan un marco de referencia con el que podemos trabajar y crear todo tipo de patrones 2D, es decir que a lo largo del eje x, generalmente denotamos las coordenadas s y a lo largo del eje y las coordenadas t.

Dicho lo anterior para asignar un elemento de la textura a un elemento de pantalla se buscan las coordenadas de textura de ese elemento tomando al espacio de textura como un espacio de coordenadas entre (0,0) y (1,1) como se muestra en la siguiente imagen:

![](https://learn.microsoft.com/en-us/windows/win32/direct3d9/images/uvcoordinates.jpg)

Esto se da para que una misma coordenada de textura se pueda asignar a diferentes texturas, como se ve en la siguiente imagen:

![](https://learn.microsoft.com/en-us/windows/win32/direct3d9/images/texadr1.png)

Donde la coordenada de textura es (0.5,1.0) y las texturas tienen diferentes tamaños por lo que la textura 1, se le asigna a texel (2,4) y La textura 2 se asigna a texel (3,6).

La explicación simplificada del proeso de asignación de coordenadas de textura a espacio de pantalla se muestra en la siguiente imagen:

![](https://www.scratchapixel.com/images/upload/shading-intro/shad-texturecoord.png?)

En este ejemplo, un píxel, que se muestra a la izquierda de la ilustración, se idealiza en un cuadrado de color. Las direcciones de las cuatro esquinas del píxel se asignan a la primitiva 3D en el espacio del objeto(La forma del píxel a menudo se distorsiona debido a la forma de la primitiva en el espacio 3D y al ángulo de visión), las esquinas del área de la superficie de la primitiva que corresponden a las esquinas del píxel se mapean en el espacio de textura. El proceso de mapeo vuelve a distorsionar la forma del píxel, lo cual es común. El valor de color final del píxel se calcula a partir de los téxeles en la región a la que se asigna el píxel.

## Code

A continuación algunos ejemplos:

Aplicamos el siguiente patron a una esfera:

![](/visual_computing/imgs/patron.JPG)

Resultado:

{{< p5-iframe sketch="/visual_computing/sketches/procedural_texturing.js" width="620" height="620" >}}

{{< details "**CODIGO:** procedural_texturing.js" close >}}
**C**odigo generado usando el editor web de **P5.js**.
```javascript
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
```
{{< /details >}}

{{< details "**CODIGO:** shader.frag" close >}}
**C**odigo generado usando el editor web de **P5.js**.
```javascript
#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265358979323846

uniform vec2 u_resolution;
uniform float u_time;

vec2 rotate2D (vec2 _st, float _angle) {
    _st -= 0.5;
    _st =  mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle)) * _st;
    _st += 0.5;
    return _st;
}

vec2 tile (vec2 _st, float _zoom) {
    _st *= _zoom;
    return fract(_st);
}

vec2 rotateTilePattern(vec2 _st){

    _st *= 4.0;

    //  Give each cell an index number
    //  according to its position
    float index = 0.0;
    index += step(1., mod(_st.x,2.0));
    index += step(1., mod(_st.y,2.0))*2.0;
  
    _st = fract(_st);
  
    if(index == 1.0){
        //  Rotate cell 1 by -90 degrees
        _st = rotate2D(_st,PI*-0.5);
    }else if(index == 2.0){
        //  Rotate cell 2 by -90 degrees
        _st = rotate2D(_st,PI*-0.5);
    }
    return _st;
}

void main (void) {
  
    vec2 st = gl_FragCoord.xy/u_resolution.xy;

    st = tile(st,3.0);
    st = rotateTilePattern(st);
  
    gl_FragColor = vec4(vec3(step(st.x,st.y)),1.0);
}

//Fuente: https://thebookofshaders.com/09/
```
{{< /details >}}

Aplicamos el siguiente patron a un cubo:

{{< p5-iframe sketch="/visual_computing/sketches/procedural_texturing_3.js" width="620" height="620" >}}

Resultado:

{{< p5-iframe sketch="/visual_computing/sketches/procedural_texturing_2.js" width="620" height="620" >}}

{{< details "**CODIGO:** procedural_texturing_2.js" close >}}
**C**odigo generado usando el editor web de **P5.js**.
```javascript
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

//Fuente: https://github.com/nakednous/p5jsShaderExamples
```
{{< /details >}}

{{< details "**CODIGO:** shader_2.frag" close >}}
**C**odigo generado usando el editor web de **P5.js**.
```javascript
#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float plot(vec2 st, float pct){
  return 0.0 ;
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution;
    
	vec2 mt = vec2(sin(u_time),cos(u_time));
    
    float y = sin(st.x*PI*3.000);
	float altura = abs( pow(mt.x*cos(st.x*PI*2.4),3.0)
                       +pow(mt.y*sin(st.y*PI*2.040),2.0));
    vec3 color = vec3(altura);
	
    float pct = plot(st,y);
    color = (1.0-pct)*color+pct*vec3(0.524,0.570,0.565);

    gl_FragColor = vec4(color.rg,1.144,0.944);
}
//Fuente: https://www.shadertoy.com/
```
{{< /details >}}

## Conclusiones

Este no solo es un metodo sencillo sino tambien uno muy practico con el cual se pueden replican un sinfin de texturas.

## Referencias

https://learn.microsoft.com/en-us/windows/win32/direct3d9/texture-coordinates

https://github.com/nakednous/p5jsShaderExamples

https://thebookofshaders.com/09/

https://www.shadertoy.com/