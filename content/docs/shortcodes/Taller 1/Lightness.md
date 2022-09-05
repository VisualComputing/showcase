# Lightness

## Problem statement

Sería útil tener una herramienta que permita la manipulación de luminosidad de una imagen, y de esta manera poder aclarar imágenes oscuras para poder ver sus siluetas.

## Background

- Manipulación de pixeles usando `P5.js`
- Uso de [HSL](https://en.wikipedia.org/wiki/HSL_and_HSV#Lightness)
- Conversión entre HSL y RGB

## Code

Pasos dentro del código:

1. Cargar la imagen a manipular y el `botón de rango`
2. Dado un valor en el `botón de rango`, se aumenta la luminosidad de cada pixel en la imagen.S

{{< details title="source code" open=false >}}
{{< highlight html >}}

new p5((p) =>{
let img;
let myPixels;
p.preload = function() {
img = p.loadImage("/showcase/sketches/medusa.jpeg");
}

p.setup = function () {
p.createCanvas(400, 400);
let inp = p.createInput("0","range");

inp.size(100);

inp.input((e) => handleBtn(e));

inp.position(0,p.height-20)
p.image(img, 0, 0, p.width, p.height);
p.colorMode(p.RGB)
p.loadPixels();
myPixels = [...p.pixels]
console.log("myPixels",myPixels[0])
}

p.draw = function (){

}

handleBtn= function(inp){
console.log("inp", inp.target.value)
let d = p.pixelDensity();
let halfImage = 4 _ (p.width _ d) _ (p.height _ d);
for (let i = 0; i < halfImage; i += 4) {

let colorRGB = p.color(myPixels[i],myPixels[i+1], myPixels[i+2])
let hueValue = p.floor( p.hue(colorRGB) );
let saturationValue = p.saturation(colorRGB);
let lightnessValue = p.lightness(colorRGB);

let colorHSV = p.color(`hsl(${ hueValue }, ${ saturationValue }%, ${ (lightnessValue + parseFloat(inp.target.value))}%)`)

p.pixels[i] = p.red(colorHSV);
p.pixels[i + 1] = p.green(colorHSV);
p.pixels[i + 2] = p.blue(colorHSV);
p.pixels[i + 3] = p.alpha(colorHSV);
}
p.updatePixels();
console.log("myPixels",myPixels[0])
}

handleImg = function(event){
console.log("event.target",event.target.value)
p.loadImage(event.target.value, img2 => {
p.image(img2, 0, 0, p.width, p.height);
});

}
})
{{< /highlight >}}
{{< /details >}}

{{< p5-iframe sketch="/visual_computing/sketches/lightness.js" width="450" height="450" >}}

## Conclusions

Esta forma de manipular los pixeles llega a buenos resultados en cuanto a la modificación de luminocidad, pero es costosa computacionalmente, sería interesante descubrir el trabajo que realizan programas como Photoshop para lograr una óptima manipulación sobre una imagen.
