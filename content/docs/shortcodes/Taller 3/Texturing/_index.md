## Texturing

La **texturizacion** es el proceso por el cual una imagen o mapa de bits es **mapeado** sobre un objeto 3D o una superficie, esto se logra trabajando con los sistemas coorddenados  de las figuras y de la textura, la cual mediante el **shader** y la **GPU** son procesados haciendo uso de **GLSL** y algunos paradigmas de programacion, como programacion en paralelo.

### 1. **Visualizacion UV**

La visualizacion UV nos permite mostrar una textura sobre un espacio particular.

{{< hint info >}}
**Ejercicio 1:**  
Redefinir las coordenas de la figura texturizada para invertir la orientacion vertical de la imagen.
{{< /hint >}}

{{< p5-iframe sketch="/visual_computing/sketches/uvoriginal.js" width="325" height="325" >}}

{{< hint warning >}}
**Solucion Ejercicio 1:**  
Redefinir las coordenadas [u] y [v] de los vertex definidos en uv.js para que cada punto del clip space mapeara a su inverso en el texture space. 
{{< /hint >}}

{{< details "**CODIGO:** uv_inverse.js" close >}}
```javascript
let uvShader;

function preload() {
  uvShader = readShader('/visual_computing/sketches/shaders/uv.frag', { matrices: Tree.NONE, varyings: Tree.texcoords2 });
}

function setup() {
  createCanvas(300, 300, WEBGL);
  noStroke();
  shader(uvShader);
  textureMode(NORMAL);
}

function draw() {
  background(0);
  beginShape();
  vertex(-1, -1, 0, 0, 1);
  vertex( 1, -1, 0, 1, 1);
  vertex( 1,  1, 0, 1, 0);
  vertex(-1,  1, 0, 0, 0);
  endShape();
}
```
{{< /details >}}

{{< details "**CODIGO:** uv.frag" close >}}
```glsl
precision mediump float;
varying vec2 texcoords2;

void main() {
  gl_FragColor = vec4(texcoords2.xy, 0.0, 1.0);
}
```
{{< /details >}}

{{< p5-iframe sketch="/visual_computing/sketches/uv_inverse.js" width="325" height="325" >}}

---

### 2. **3D**

La visualizacion 3D de espaciosUV nos permite mostrar una textura sobre un objeto particular en un espacio que permite la interaccion **3D**, sin embargo esto no altera en demasia .


{{< hint info >}}
**Ejercicio 2.1:**  
Incluir el canal **azul** en la visualizacion UV, ya sea **Azul + Verde** ó **Azul + Rojo**.  
{{< /hint >}}

{{< hint warning >}}
**Solucion Ejercicio 2.1:**  
Modificar el shader para que evalue 2 variables y reajuste el color dependiendo de una de las opciones seleccionadas, modificando uno de los canales dependiendo de la opcion.
{{< /hint >}}

{{< p5-iframe sketch="/visual_computing/sketches/uvplus.js" width="325" height="340" >}}


{{< details "**CODIGO:** uvplus.js" close >}}
```javascript
let easycam;
let uvShader;
let c1, c2;

let rtb = false, gtb = false;

function preload() {
  uvShader = readShader('/visual_computing/sketches/shaders/uvplus.frag',{ matrices: Tree.pmvMatrix, varyings: Tree.texcoords2 });
}

function setup() {
  createCanvas(300, 300, WEBGL);
  textureMode(NORMAL);
  c1 = createCheckbox('Red To Blue', false);
  c2 = createCheckbox('Green To Blue', false);
  c1.position(10, 310);
  c2.position(150, 310);
  shader(uvShader);
}

function draw() {
  background(200);
  orbitControl();
  axes();
  push();
  noStroke();
  quad(-width / 2, -height / 2, width / 2, -height / 2,
        width / 2, height / 2, -width / 2, height / 2);
  pop();
  
  if(c1.checked()){
    uvShader.setUniform('rtb',true)
     uvShader.setUniform('gtb',false)
  }else if(c2.checked()){
    uvShader.setUniform('rtb',false)
    uvShader.setUniform('gtb',true)
  }else{
    uvShader.setUniform('rtb',false)
    uvShader.setUniform('gtb',false)
  }
}

function mouseWheel(event) {
  return false;
}
```
{{< /details >}}

{{< details "**CODIGO:** uvplus.frag" close >}}
```glsl
precision mediump float;

uniform bool rtb;
uniform bool gtb;
varying vec2 texcoords2;

void main() {
  if(rtb==true){
     gl_FragColor = vec4(0.0 ,texcoords2.y,texcoords2.x, 1.0);
  }else if(gtb==true){
    gl_FragColor = vec4(texcoords2.x , 0.0, texcoords2.y, 1.0);
  }else{
    gl_FragColor = vec4(texcoords2.xy, 0.0, 1.0);
  }
}
```
{{< /details >}}

---

{{< hint info >}}
**Ejercicio 2.2:**  
Utilizar figuras diferentes a **Quad** como filtros de pantalla.  
{{< /hint >}}

{{< hint warning >}}
**Solucion Ejercicio 2.2:**  
Modificar las figuras mediante la definicion de metodos y figuras de P5, añadir el control de opacidad y el cambio de canales **[RGB]**.
{{< /hint >}}

{{< p5-iframe sketch="/visual_computing/sketches/screen.js" width="475" height="475" >}}


{{< details "**CODIGO:** screen.js" close >}}
```javascript
let easycam;
let uvShader;
let opacity;

let c1, c2;

let rtb = false, gtb = false;

function preload() {
  uvShader = readShader('/visual_computing/sketches/shaders/screen.frag',{ matrices: Tree.pmvMatrix, varyings: Tree.texcoords2 });
}

function setup() {
  createCanvas(450, 450, WEBGL);
  
  // easycam stuff
  let state = {
    distance: 250,           
    center: [0, 0, 0],       
    rotation: [0, 0, 0, 1],  
  };
  easycam = createEasyCam();
  easycam.state_reset = state;   
  easycam.setState(state, 2000); 
  textureMode(NORMAL);
  opacity = createSlider(0, 1, 0.5, 0.01);
  opacity.position(10, 25);
  opacity.style('width', '280px');
  
  c1 = createCheckbox('R To B', false);
  c2 = createCheckbox('G To B', false);
  c1.position(100, 10);
  c2.position(200, 10);
  
  sel = createSelect();
  sel.position(10, 10);
  sel.option('Quad');
  sel.option('Triangle');
  sel.option('Circle');
  sel.selected('Quad');
  
}

function draw() {
  background(200);
  
  resetShader();
  
  axes();
  grid();
  translate(0, -70);
  rotateY(0.5);
  fill(color(255, 0, 255, 125));
  box(30, 50);
  translate(70, 70);
  fill(color(0, 255, 255, 125));
  sphere(30, 50);
  
  shader(uvShader);
 
  uvShader.setUniform('opacity', opacity.value());
  
  beginHUD();
  
    noStroke();

    if(sel.value() == "Quad"){
      quad(0, 0, width, 0, width, height, 0, height);
    }else if(sel.value() == "Triangle"){
      triangle(0,0,width,0,width/2,height)
    }else if (sel.value() == "Circle"){
      circle(width/2,height/2,width)
    }
  
    if(c1.checked()){
      uvShader.setUniform('rtb',true)
       uvShader.setUniform('gtb',false)
    }else if(c2.checked()){
      uvShader.setUniform('rtb',false)
      uvShader.setUniform('gtb',true)
    }else{
      uvShader.setUniform('rtb',false)
      uvShader.setUniform('gtb',false)
    }

  endHUD();
}

function mouseWheel(event) {
  //comment to enable page scrolling
  return false;
}
```
{{< /details >}}

{{< details "**CODIGO:** screen.frag" close >}}
```glsl
precision mediump float;

uniform bool rtb;
uniform bool gtb;
uniform float opacity;
varying vec2 texcoords2;

void main() {
  if(rtb==true){
     gl_FragColor = vec4(0.0 ,texcoords2.y,texcoords2.x, opacity);
  }else if(gtb==true){
    gl_FragColor = vec4(texcoords2.x , 0.0, texcoords2.y, opacity);
  }else{
    gl_FragColor = vec4(texcoords2.xy, 0.0, opacity);
  }
}
```
{{< /details >}}

---
### 3. **Muestreo de Texturas**

Los efectos que puedan aplicarse a una imagen requieren utilizar coordenaddas dadas, las coordenadas **texcoords2** y los **texels** permiten realizar operaciones pixel a pixel haciendo uso de la GPU .

{{< hint info >}}
**Ejercicio 3.1 y 3.2:**  
* Implementar heraamientas de iluminacion i color tales como *HSV valor V, HSL luminancia L, Promedio de componentes*. 
* Implementar el tintado de texturas mezclando el colo y los datos interpolados de los texeles.
{{< /hint >}}

{{< hint warning >}}
**Solucion Ejercicio 3.1 y 3.2:**  
Para modificar la imagen se opera matematicamente los valores que se obtienen en los texels **[Canales RGBA]** , o se modifican de plano para que el shader los procese nuevamente.
{{< /hint >}}

{{< p5-iframe sketch="/visual_computing/sketches/tools.js" width="725" height="525" >}}

{{< details "**CODIGO:** tools.js" close >}}
```javascript
let lumaShader;
let img;
let grey_scale;
let average;
let HSVV;
let Tint;
let ColorT;

function preload() {
  lumaShader = readShader('/visual_computing/sketches/shaders/colors.frag',{ varyings: Tree.texcoords2});
  img = loadImage('/visual_computing/imgs/car.jpg');
}

function drawControls(enabled){
  if(enabled){
    colorT = createColorPicker(color(255,255,255));
    colorT.position(125, 10);
  }
}

function setup() {
  createCanvas(700, 500, WEBGL);
  noStroke();
  textureMode(NORMAL);
  
  sel = createSelect();
  sel.position(10, 10);
  sel.option('None');
  sel.option('Luma');
  sel.option('Average');
  sel.option('HSV Value V');
  sel.option('HSL Value L');
  sel.option('Tint');
  
  sel.selected('None');
  
  drawControls(true);
  
  
  
}

function draw() {
  background(0);
  
  if(sel.value()=="None"){
    shader(lumaShader);
    lumaShader.setUniform('texture', img);
    lumaShader.setUniform('HSVV',false);
    lumaShader.setUniform('HSLL',false);
    lumaShader.setUniform('grey_scale',false);
    lumaShader.setUniform('average',false);
    
  }else if(sel.value()=="Luma"){
    shader(lumaShader);
    lumaShader.setUniform('grey_scale',true);
    lumaShader.setUniform('average',false);
    lumaShader.setUniform('HSVV',false);
    lumaShader.setUniform('HSLL',false);
    lumaShader.setUniform('texture', img);
    
  }else if(sel.value()=="Average"){
    shader(lumaShader);
    lumaShader.setUniform('average',true);
    lumaShader.setUniform('grey_scale',false);
    lumaShader.setUniform('HSVV',false);
    lumaShader.setUniform('HSLL',false);
    lumaShader.setUniform('texture', img);
    
  }else if(sel.value() =="HSV Value V"){
    shader(lumaShader);
    lumaShader.setUniform('HSVV',true);
    lumaShader.setUniform('HSLL',false);
    lumaShader.setUniform('average',false);
    lumaShader.setUniform('grey_scale',false);
    lumaShader.setUniform('texture', img);
    
  }else if(sel.value() =="HSL Value L"){
    shader(lumaShader);
    lumaShader.setUniform('HSLL',true);
    lumaShader.setUniform('HSVV',false);
    lumaShader.setUniform('average',false);
    lumaShader.setUniform('grey_scale',false);
    lumaShader.setUniform('texture', img);
    
  }else if(sel.value() =="Tint"){
    shader(lumaShader);
    lumaShader.setUniform('Tint',true);
    lumaShader.setUniform('HSLL',false);
    lumaShader.setUniform('HSVV',false);
    lumaShader.setUniform('average',false);
    lumaShader.setUniform('grey_scale',false);
    lumaShader.setUniform('texture', img);
    
    let RC = colorT.color();
    lumaShader.setUniform('colorT',[red(RC),green(RC),blue(RC),1.0]);
    
  }
  
  quad(-width / 2, -height / 2, width / 2, -height / 2, width / 2, height / 2, -width / 2, height / 2);
}
```
{{< /details >}}

{{< details "**CODIGO:** colors.frag" close >}}
```glsl
precision mediump float;

uniform bool grey_scale;
uniform bool average;
uniform bool HSVV;
uniform bool HSLL;
uniform bool Tint;

uniform vec4 colorT;

uniform sampler2D texture;

varying vec2 texcoords2;

float luma(vec3 texel) {
  return 0.299 * texel.r + 0.587 * texel.g + 0.114 * texel.b;
}

float favg(vec3 texel){
  return (texel.r + texel.g + texel.b ) / 3.0;
}

float HSV (vec3 texel){
  return max(max(texel.r,texel.g),texel.b); ;
}

float HSL (vec3 texel){
  float CMax = max(max(texel.r,texel.g),texel.b);
  float CMin = min(min(texel.r,texel.g),texel.b);
  return (CMax + CMin) / 2.0 ;
}

float Ftint(float channel, float color){
  float N = channel * (color / 255.0);
  return N;
}


void main() {
  
  vec4 texel = texture2D(texture, texcoords2);
  
  if(grey_scale == true){
    gl_FragColor = vec4((vec3(luma(texel.rgb))), 1.0); 
  }else if(average == true){
    gl_FragColor = vec4((vec3(favg(texel.rgb))), 1.0); 
  }else if(HSVV== true){
    gl_FragColor = vec4((vec3(HSV(texel.rgb))), 1.0);
  }else if(HSLL== true){
    gl_FragColor = vec4((vec3(HSL(texel.rgb))), 1.0);
  }else if(Tint == true){
    gl_FragColor = vec4(Ftint(texel.r,colorT.x),Ftint(texel.g,colorT.y),Ftint(texel.b,colorT.z),1.0);
  }else{
    gl_FragColor = texel;  
  }
  
}
```
{{< /details >}}

{{< hint danger >}}
**Referencias:**  
* **[Speeding Up tint() in p5]:** https://www.davepagurek.com/blog/p5-tint/
* **[HSL & HSV]:** https://en.wikipedia.org/wiki/HSL_and_HSV#Disadvantages
* **[Blend Modes]:** https://en.wikipedia.org/wiki/Blend_modes#Overlay
* **[P5.js]:** https://p5js.org/es/reference/
{{< /hint >}}
