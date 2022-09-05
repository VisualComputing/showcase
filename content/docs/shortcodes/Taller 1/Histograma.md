# Histograma
---
## Problem statement

Un histograma de imagen es una representación gráfica de la distribución tonal en una imagen digital. Para esto traza el número de píxeles para cada valor tonal de manera que al mirar el histograma de una imagen específica, un espectador podrá juzgar la distribución tonal completa de un vistazo.

Tiene muchos usos entre ellos sirve dar al fotógrafo una mejor comprensión de los valores de brillo en una imagen



## Background
Se debe tener precaución en como se reorganizan y clasifican los pixeles

## Code

{{< p5-iframe sketch="/visual_computing/sketches/histogram.js" width="600" height="600" >}}

{{< details "**CODIGO:** Histograma" close >}}
**C**odigo generado usando el editor web de **P5.js**.
```javascript
var img;
var maxRange = 256;
var histogram = new Array(maxRange);
function preload() {
    img = loadImage("/visual_computing/sketches/storm2.png"); 
  }
  
  function setup() {
    createCanvas(600, 600);
    background(255);
    img.resize(0,400);
    var maxRange = 256
    colorMode(HSL, maxRange);
    image(img, 0, 0);
    for (i = 0; i <= maxRange; i++) {
      histogram[i] = 0
    }
  
    loadPixels();
    
    construir_grises();
    construir_histograma();
  }

  function construir_grises(){
    for (var x = 0; x < img.width; x+=5) {
        for (var y = 0; y < img.height; y+=5) {
          var loc = (x + y * img.width) * 4;
          var h = pixels[loc];
          var s = pixels[loc + 1];
          var l = pixels[loc + 2];
          var a = pixels[loc + 3];
          b = int(l);
          histogram[b]++
        }
      }
  }

  function construir_histograma(){
    image(img, 0, 0);
    stroke(300,100,80)
    push()
    translate(10,0)
    for (x = 0; x <= maxRange; x++) {
      index = histogram[x];
  
      y1=int(map(index, 0, max(histogram), height, height-200));
          y2 = height
      xPos = map(x,0,maxRange,0, width-20)
      line(xPos, y1, xPos, y2);
    }
    pop()
  }
```
{{< /details >}}

---

## Conclusions

El ejercicio es bastante complejo debido a que debe adaptarse a cualquier imagen, pero es un analisis muy util de la imagen ya que con un solo vistazo se sabe cual es la tendencia de los colores. 