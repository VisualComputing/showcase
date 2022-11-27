## Image Processing

El **procesamiento de imagenes**  es la manipulación de imagenes mediante procesos computacionales manejados por **GPU** y el uso de algoritmos que modifican las imagenes. En muchos de los casos se utilizan **operaciones matematicas de nivel matricial** para transformar los colores de las imagenes, o distorsionarlas como se lograria con **efectos de amplificación**.

### 1. **Procesamiento**

{{< hint info >}}
**Ejercicio 1:**  
Implemente una aplicacion para el procesamiento de imagenes / videos que soporte el uso de diferentes mascaras, incluyendo kernels de tamaño diferente a 3x3 y:
* Una Herramienta de region de interes para aplicar selectivamente una mascara:
* Una Herramienta de magnidicacion.
* Una herramienta que integre **Luma** y otras herramientas.
{{< /hint >}}

{{< hint info >}}
**Ejercicio 2.1:**  
Incluir el canal **azul** en la visualizacion UV, ya sea **Azul + Verde** ó **Azul + Rojo**.  
{{< /hint >}}

{{< hint warning >}}
**Solucion Ejercicio 2.1:**  
Modificar el shader para que evalue 2 variables y reajuste el color dependiendo de una de las opciones seleccionadas, modificando uno de los canales dependiendo de la opcion.
{{< /hint >}}

{{< p5-iframe sketch="/visual_computing/sketches/app.js" width="725" height="725" >}}

{{< details "**CODIGO:** app.js" close >}}
```javascript

let maskShader;
let img;
let video_src;
let video_on;
let cam_src;
let cam_on;
let ColorT;

let mask_mode;
let coloring;
let lenses;
//let maskmode;

function preload() {
  video_src = createVideo(['/visual_computing/vid/drift.mp4']);
  video_src.hide();
  
  cam_src = createCapture(VIDEO);
  cam_src.size(width, height);
  cam_src.hide();
  
  maskShader = readShader('/visual_computing/sketches/shaders/mask.frag', { varyings: Tree.texcoords2 });
  img = loadImage('/visual_computing/imgs/car.jpg');
}

function setup() {
  createCanvas(700, 700, WEBGL);
  noStroke();
  textureMode(NORMAL);
  
  //Camera selector
  cam_on = createCheckbox('Live', false);
  cam_on.style('color','black');
  cam_on.position(10,50);
  
  //Camera Controls
  cam_on.changed(() => {
    if(cam_on.checked()){
      maskShader.setUniform('texture',cam_src);
    }else{
       maskShader.setUniform('texture', img); 
    }
  });
  
  
  //Video Controls
  video_on = createCheckbox('Video', false);
  video_on.style('color', 'black');
  video_on.position(10, 30);
  
  //Video & image Switcher
  video_on.changed(() => {
    if (video_on.checked()) {
      maskShader.setUniform('texture', video_src);
      video_src.loop();
    } else {
      maskShader.setUniform('texture', img);
      video_src.pause();
    }
  });
  
  //Mask controls
  mask_mode = createCheckbox('Masks', false);
  mask_mode.position(10, 10);
  mask_mode.style('color', 'black');
  
  //Coloring checkbox
  coloring = createCheckbox('Coloring',false);
  coloring.position(165, 10);
  coloring.style('color','black');
  
  //Lenses checkbox
  lenses = createCheckbox('Lense',false);
  lenses.position(360, 10);
  lenses.style('color','black');
  
  //Shader apply
  shader(maskShader);
  maskShader.setUniform('texture', img);
  emitTexOffset(maskShader, img, 'texOffset');
  
  //Kernel selector
  sel = createSelect();
  sel.position(80, 10);
  sel.option('None');
  sel.option('Edges');
  sel.option('Sharpen');
  sel.option('Box Blur');
  sel.option('Emboss');
  
  
  sel.selected('None');
  
  //Coloring selector
  selC = createSelect();
  selC.position(245, 10);
  selC.option('None');
  selC.option('Luma');
  selC.option('Average');
  selC.option('HSV Value V');
  selC.option('HSL Value L');
  selC.option('Tint');
    
  selC.selected('None');
  
  //Color Picker
  colorT = createColorPicker(color(255,255,255));
  colorT.position(175, 30);
  
  //lenses parameters
  Rslider = createSlider(50.0, 150.0, 50.0);
  Rslider.position(360, 30);
  Rslider.style('width', '80px');
  let div1 = createDiv('Lens Radio');
  div1.style('font-size', '18px');
  div1.style('color', '#000000');
  div1.position(450, 30);
  
  Sslider = createSlider(0.0, 1.0, 0.0, 0.01);
  Sslider.position(360, 50);
  Sslider.style('width', '80px');
  let div2 = createDiv('Lens Amplitude');
  div2.style('font-size', '18px');
  div2.style('color', '#000000');
  div2.position(450, 50);
  
}

function draw() {
  background(0);
  
  //Mask Mode
  if (mask_mode.checked()){
    
    //Enable Masks Mode
    maskShader.setUniform('maskmode',true);
    maskShader.setUniform('coloringmode',false);
    
    //kernels
    if (sel.value()=='Edges') {
      maskShader.setUniform('mask', [-1, -1, -1, -1, 8, -1, -1, -1, -1]);
    }else if(sel.value()=='Sharpen'){
      maskShader.setUniform('mask', [0, -1, 0, -1, 5, -1, 0, -1, 0]);
    }else if(sel.value()=='Box Blur'){
      maskShader.setUniform('mask', [1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9]);
    }else if(sel.value()=='Emboss'){
      maskShader.setUniform('mask', [-2, -1, 0, -1, 1, 1, 0, 1, 2]);
    }else{
      maskShader.setUniform('mask', [0, 0, 0, 0, 1, 0, 0, 0, 0]);
    }
    
  }else if(coloring.checked()){
    
    
    //Enable Coloring Mode
    maskShader.setUniform('maskmode',false);
    maskShader.setUniform('coloringmode',true);
    
    if(selC.value()=="None"){
    maskShader.setUniform('HSVV',false);
    maskShader.setUniform('HSLL',false);
    maskShader.setUniform('grey_scale',false);
    maskShader.setUniform('average',false);
    maskShader.setUniform('Tint',false);
    
  }else if(selC.value()=="Luma"){
    maskShader.setUniform('grey_scale',true);
    maskShader.setUniform('average',false);
    maskShader.setUniform('HSVV',false);
    maskShader.setUniform('HSLL',false);
    maskShader.setUniform('Tint',false);
    
  }else if(selC.value()=="Average"){
    maskShader.setUniform('average',true);
    maskShader.setUniform('grey_scale',false);
    maskShader.setUniform('HSVV',false);
    maskShader.setUniform('HSLL',false);
    maskShader.setUniform('Tint',false);
    
  }else if(selC.value() =="HSV Value V"){
    maskShader.setUniform('HSVV',true);
    maskShader.setUniform('HSLL',false);
    maskShader.setUniform('average',false);
    maskShader.setUniform('grey_scale',false);
    maskShader.setUniform('Tint',false);
    
  }else if(selC.value() =="HSL Value L"){
    maskShader.setUniform('HSLL',true);
    maskShader.setUniform('HSVV',false);
    maskShader.setUniform('average',false);
    maskShader.setUniform('grey_scale',false);
    maskShader.setUniform('Tint',false);

  }else if(selC.value() =="Tint"){
    maskShader.setUniform('Tint',true);
    maskShader.setUniform('HSLL',false);
    maskShader.setUniform('HSVV',false);
    maskShader.setUniform('average',false);
    maskShader.setUniform('grey_scale',false);
    
    let RC = colorT.color();
    maskShader.setUniform('colorT',[red(RC),green(RC),blue(RC),1.0]);
    }
    
  }else if(lenses.checked()){
    maskShader.setUniform('lensemode',true);
    maskShader.setUniform('maskmode',false);
    maskShader.setUniform('coloringmode',false);
    
    maskShader.setUniform('mouseData',[mouseX,mouseY]);
    maskShader.setUniform('resolution',[width,height]);
    maskShader.setUniform('radio', Rslider.value());
    maskShader.setUniform('scale', Sslider.value());
  }else{
    maskShader.setUniform('lensemode',false);
    maskShader.setUniform('maskmode',false);
    maskShader.setUniform('coloringmode',false);
  }
  

  quad(-width / 2, -height / 2, width / 2, -height / 2, width / 2, height / 2, -width / 2, height / 2);
}

```
{{< /details >}}

{{< details "**CODIGO:** mask.frag" close >}}
```glsl
precision mediump float;

uniform bool maskmode;
uniform bool coloringmode;
uniform bool lensemode;

uniform bool grey_scale;
uniform bool average;
uniform bool HSVV;
uniform bool HSLL;
uniform bool Tint;

uniform vec4 colorT;

uniform sampler2D texture;

uniform vec2 texOffset;
uniform float mask[9];

varying vec2 texcoords2;

uniform vec2 mouseData;
uniform vec2 resolution;

uniform vec4 passerGL;

uniform float radio;
uniform float scale;

//--------------------------------------------------------------------------

float rim = 2.0;
vec2 handview = vec2(10.0,50.0);

vec2 curveGen(vec2 toPow, float dist){
  float x = dist/radio;
  return toPow * (1.0 - x) * exp (-2.0 * x * x);  
}

void Amplify (){
  
  vec2 UV = gl_FragCoord.xy / resolution.xy;
  gl_FragColor = texture2D(texture, UV);
  
  vec2 center = mouseData.xy;
  float dist = distance(gl_FragCoord.xy,center);
  
  vec2 distV = gl_FragCoord.xy - center;
  
  if (dist > radio && dist < radio + rim){
    gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
  }
  
  if(abs(distV.x) < (handview.x / 2.0 ) && abs(distV.y + radio) < (handview.y) && dist >= radio + rim){
    gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
  }
  
  if(dist < radio){
    vec2 trueUV = (gl_FragCoord.xy - (curveGen(distV,dist) * scale)) / resolution.xy ;
    gl_FragColor = texture2D(texture, trueUV);
  }
}

//--------------------------------------------------------------------------

void Convolution(){
  
    vec2 tc0 = texcoords2 + vec2(-texOffset.s, -texOffset.t);
    vec2 tc1 = texcoords2 + vec2(         0.0, -texOffset.t);
    vec2 tc2 = texcoords2 + vec2(+texOffset.s, -texOffset.t);
    vec2 tc3 = texcoords2 + vec2(-texOffset.s,          0.0);
    
    vec2 tc4 = texcoords2 + vec2(         0.0,          0.0);
    vec2 tc5 = texcoords2 + vec2(+texOffset.s,          0.0);
    vec2 tc6 = texcoords2 + vec2(-texOffset.s, +texOffset.t);
    vec2 tc7 = texcoords2 + vec2(         0.0, +texOffset.t);
    vec2 tc8 = texcoords2 + vec2(+texOffset.s, +texOffset.t);

    
    vec4 rgba[9];
    rgba[0] = texture2D(texture, tc0);
    rgba[1] = texture2D(texture, tc1);
    rgba[2] = texture2D(texture, tc2);
    rgba[3] = texture2D(texture, tc3);
    rgba[4] = texture2D(texture, tc4);
    rgba[5] = texture2D(texture, tc5);
    rgba[6] = texture2D(texture, tc6);
    rgba[7] = texture2D(texture, tc7);
    rgba[8] = texture2D(texture, tc8);

  
    vec4 convolution;
    for (int i = 0; i < 9; i++) {
      convolution += rgba[i]*mask[i];
    }

  
    gl_FragColor = vec4(convolution.rgb, 1.0); 
}

//--------------------------------------------------------------------------

float luma(vec3 texel){
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

void Coloring(){
  
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

//--------------------------------------------------------------------------

void main() {
  
  if(maskmode == true){
    Convolution();
    Coloring();
  }else if(coloringmode == true){
    Coloring();
  }else if(lensemode == true){
    Amplify();
  }else{
    gl_FragColor = texture2D(texture, texcoords2);
  }
  
}

```
{{< /details >}}