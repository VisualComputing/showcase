# **1. Convoluciones**
---
## Problem statement

Una convolucion sobre una imagen es un calculo matematico sobre un conjunto de pixeles sobre la misma, esta operacion hace uso de los denominados **Kernel**;
Un kernel es una matriz con valores determinados los cuales permiten aplicar diferentes mascaras sobre las imagenes, los valores dentro de las matrices de los kernel se pueden alterar con base en el resultado que se desee obtener se pueden modificar.

- Se desea una aplicacion web que pueda aplicar diferentes convoluciones a una imagen.

## Background

La **operacion de convolucion** se define como:

{{< katex display >}}
g(x,y)=\omega *f(x,y)=\sum _{dx=-a}^{a}{\sum _{dy=-b}^{b}{\omega (dx,dy)f(x-dx,y-dy)}}
{{< /katex >}}

Sin embargo, se puede definir mas facilmente si se utiliza el kernel como un vector 1-dimensional asi. Con este vector, se toman los 4 canales **__R,G,B,A__** y se separan en vectores que puedan operarse de manera escalar, recordemos que el producto escalar entre dos vectores se define como;


{{< katex display >}}
u \cdot v = u {\displaystyle =u_{1}\cdot v_{1}+u_{2}\cdot v_{2}+...+u_{n}\cdot v_{n}} {\displaystyle =u_{1}\cdot v_{1}+u_{2}\cdot v_{2}+...+u_{n}\cdot v_{n}},
{{< /katex >}}


**Precaucion**
> Al operar la imagen se deben tener en cuenta la inexistencia de pixeles externos, si se aplicara la convolucion  donde el centro del kernel se ubica sobre el primer pixel, habran posiciones que no esten definidas por lo cual hay dos posibles alternativas.
* Operar desde el pixel **(1,1)**
* Operar desde el pixel **(0,0)** pero reescribiendo toda la imagen añadiendo pixeles de valor 0 al rededor de la imagen;
---

{{< hint info >}}
**¿Como interactuar con la ilusión?**  
Para cambiar los efectos sobre la imagen hay de usar el Slider para seleccionar uno
de los kernels, ya despues de seleccionado se debe presionar el boton **Recargar canvas**.
{{< /hint >}}

**Kernels disponibles**  


| Name        | Matrix     |
|-----------|--------|
|Identity| [0, 0, 0, 0, 1, 0, 0, 0, 0]|
|Sharpen| [0, -1, 0, -1, 5, -1, 0, -1, 0]|
|Box Blur| [1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9]|
|Edge Detection| [-1, -1, -1, -1, 8, -1, -1, -1, -1]|
|Gaussian Blur| [1, 2, 1, 2, 4, 2, 1, 2, 1]|
|Emboss| [-2, -1, 0, -1, 1, 1, 0, 1, 2]|
|Bottom Sobel| [-1,2,-1,0,0,0,1,2,1]|
|Outline| [-1,-1,-1,-1,8,-1,-1,-1,-1]|
|Top Sobel| [1,2,1,0,0,0,-1,-2,-1|

## Code

{{< p5-iframe sketch="/visual_computing/sketches/convolutions.js" width="625" height="625" >}}

{{< details "**CODIGO:** Convoluciones" close >}}
**C**odigo generado usando el editor web de **P5.js**.
```javascript
    var img,kernel;
let channelsMap,RedMat,BlueMat,GreenMat,newChannels,fMap;

function preload() {
  img = loadImage('/showcase/sketches/bubbleCatC.png');
}

function setup() {
  createCanvas(600,600);
  noLoop();
  
  //Boton de Recarga
  button = createButton('Recargar Canvas');
  button.position(10, 10);
  button.mousePressed(reload);
  
  //Cambiar el kernel
  slider = createSlider(1, 9, 1, 1);
  slider.position(200, 10);
  slider.style('width', '120px');
}

//Calcular el producto punto
function ppunto(Pix,Ker){
    let sum = 0;
    for(let x = 0;x < Ker.length;x++){
        sum = sum + (Pix[x]*Ker[x])
    }
    return sum;
}

//Dividimos los canales en arreglos individuales
function ChannelDivider(ImgArr){
    let imgRed = [], imgGreen = [], imgBlue = [], imgAlpha = [];
    for(let i = 0; i < ImgArr.length ; i+=4){
        imgRed.push(ImgArr[i]);
        imgGreen.push(ImgArr[i+1]);
        imgBlue.push(ImgArr[i+2]);
        imgAlpha.push(ImgArr[i+3]);
    } 
    return [imgRed,imgGreen,imgBlue,imgAlpha]
}

//Recomponer la imagen
function ChannelComposer(R,G,B,A){
    let imageChannels = [];
    for(let i = 0; i < A.length*4 ; i+=4){
        imageChannels[i] = R[i/4];
        imageChannels[i+1] = G[i/4];
        imageChannels[i+2] = B[i/4];
        imageChannels[i+3] = A[i/4];
    }
    return imageChannels;
}

//separar los arreglos para hacer una matriz
function ArraySplice(arr,dim){
    var matrix = [], i, k;
    for (i = 0, k = -1; i < arr.length; i++) {
        if (i % dim === 0) {
            k++;
            matrix[k] = [];
        }
        matrix[k].push(arr[i]);
    }
    return matrix;
}
//Reescribir el arreglo como matriz 
function dimensioner(LTM){
    var extended = [];
    for(let r = 0; r < LTM.length ; r++){
        for(let c = 0; c < LTM[r].length; c++){
            //Si estoy en el primer pixel
            if(r==0 && c==0){
                extended.push(
                    [0,0,0,
                    0,LTM[r][c],LTM[r][c+1],
                    0,LTM[r+1][c],LTM[r+1][c+1]]
                );    
            }else
            //si estoy en la primer fila
            if(r==0 && (c>0 && c!=LTM[r].length - 1)){
                extended.push(
                    [0,0,0,
                    LTM[r][c-1],LTM[r][c],LTM[r][c+1],
                    LTM[r+1][c-1],LTM[r+1][c],LTM[r+1][c+1]]
                );
            }else
            //Si estoy en el el ultimo pixel de una fila
            if(r==0 && c==LTM[r].length - 1){
               extended.push(
                    [0,0,0,
                    LTM[r][c-1],LTM[r][c],0,
                    LTM[r+1][c-1],LTM[r+1][c],0]
                ); 
            }else
            
            //si estoy en el primer pixel de una columna
            if((r>0 && r<LTM[r].length-1) && c==0){
                extended.push(
                    [0,LTM[r-1][c],LTM[r-1][c+1],
                    0,LTM[r][c],LTM[r][c+1],
                    0,LTM[r+1][c],LTM[r+1][c+1]]
                );    
            }else
            
            //si estoy en el ultimo pixel de una columna y no es la ultima fila
            if((r>0 && r<LTM[r].length-1) && c==LTM[r].length-1){
                extended.push(
                    [LTM[r-1][c-1],LTM[r-1][c],0,
                    LTM[r][c-1],LTM[r][c],0,
                    LTM[r+1][c-1],LTM[r+1][c],0]
                );    
            }else
            //si estoy en el primer pixel de la ultima fila
            if(r==LTM[r].length-1 && c==0){
                extended.push(
                    [0,LTM[r-1][c],LTM[r-1][c+1],
                    0,LTM[r][c],LTM[r][c+1],
                    0,0,0]
                );    
            }else
            
            //si estoy en la ultima fila
            if(r==LTM.length-1 && (c>0 && c <LTM[r].length - 1)){
                extended.push(
                    [LTM[r-1][c-1],LTM[r-1][c],LTM[r-1][c+1],
                    LTM[r][c-1],LTM[r][c],LTM[r][c+1],
                    0,0,0]
                );
            }else
            //si estoy en el ultimo pixel
            if(r==LTM.length -1 && c==LTM[r].length - 1){
            
               extended.push(
                    [LTM[r-1][c-1],LTM[r-1][c],0,
                    LTM[r][c-1],LTM[r][c],0,
                    0,0,0]
                ); 
            } else{
            //los demas pixeles
            extended.push([LTM[r-1][c-1],LTM[r-1][c],LTM[r-1][c+1],
                          LTM[r][c-1],LTM[r][c],LTM[r][c+1],
                          LTM[r+1][c-1],LTM[r+1][c],LTM[r+1][c+1]])
            }
        }
    }
    return extended;
}

//Calculo de la convolucion
function Convolution(mat,ker,w){
  let conv = [];
  for(let i = 0; i < mat.length; i++){    
    let p = ppunto(mat[i].reverse(),ker);    
    conv.push(p);
  }
  return conv;
}

//Calculo del la imagen con el nuevo 
function CoreCalc(kernel,pix, width){
 //Creamos el espacio para todos los canales tras la convolucion
  newChannels = [[],[],[]];

  //Asignamos todos los canales
  channelsMap = ChannelDivider(pix);
  
  //Transformamos cada canal en una matriz para el dimensionamiento;
  RedMat = ArraySplice(channelsMap[0],width);
  GreenMat = ArraySplice(channelsMap[1],width);
  BlueMat = ArraySplice(channelsMap[2],width);
  
  //Se  Crea el arreglo adecuado para cada matriz
  let RT,GT,BT;
  RT = dimensioner(RedMat);
  GT = dimensioner(GreenMat);
  BT = dimensioner(BlueMat);
  
  //Aplicamos el kernel a cada canal
  newChannels[0] = Convolution(RT,kernel,width);
  newChannels[1] = Convolution(GT,kernel,width);
  newChannels[2] = Convolution(BT,kernel,width);
  
  let fMap = ChannelComposer(newChannels[0],newChannels[1],newChannels[2],channelsMap[3]);
  
  return fMap;
   
}

//Funcion de recarga
function reload(){
  clear();
  redraw()
}

const kernels = {
    identity: [0, 0, 0, 0, 1, 0, 0, 0, 0],
    sharpen: [0, -1, 0, -1, 5, -1, 0, -1, 0],
    boxBlur: [1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9],
    edgeDetection: [-1, -1, -1, -1, 8, -1, -1, -1, -1],
    gaussianBlur: [1, 2, 1, 2, 4, 2, 1, 2, 1],
    emboss: [-2, -1, 0, -1, 1, 1, 0, 1, 2],
    bottomSobel: [-1,2,-1,0,0,0,1,2,1],
    outline: [-1,-1,-1,-1,8,-1,-1,-1,-1],
    topSobel: [1,2,1,0,0,0,-1,-2,-1]
};

function draw() {
  background(220);
  //image(img, 10, 10);
  img.loadPixels();
  let d = img.width;

  //Cambiar los canvas
  if (slider.value() == 1) {
    kernel = kernels.identity; //restaurar
  } else if (slider.value() == 2) {
    kernel = kernels.sharpen; //definir
  } else if (slider.value() == 3) {
    kernel = kernels.boxBlur; //blur cuadrado
  } else if (slider.value() == 4) {
    kernel = kernels.emboss //viselar
  } else if (slider.value() == 5) {
    kernel = kernels.gaussianBlur //blur gaussiano
  } else if (slider.value() == 6) {
    kernel = kernels.bottomSobel
  } else if (slider.value() == 7) {
    kernel = kernels.topSobel
  } else if (slider.value() == 8) {
    kernel = kernels.outline
  } else {
    kernel = kernels.edgeDetection; //deteccion de bordes fuerte
  }
      
  let finalMap = CoreCalc(kernel,img.pixels,d);
  let imgs = createImage(img.width, img.height);
  imgs.loadPixels()
  
  for(let i = 0;i < img.pixels.length;i++){
    imgs.pixels[i] = finalMap[i];
  }
  
  imgs.updatePixels();
  image(imgs, 0, 0);
}
```
{{< /details >}}

---

## Conclusions

El ejercicio es bastante complejo debido a las limitantes que existen al momento del renderizado, Sin embargo la manipulacion matematica de la imagen permite un acercamiento practico a funciones utilizadas por editores graficos lo cual permite entender que procesos se realizan bajo las interfaces para poder obtener resultados. 