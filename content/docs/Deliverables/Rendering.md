

# Rendering

## ¿Algoritmos de visibilidad, que son?

Un algoritmo de visibilidad, tambien denominado de Determinación de Superficies Ocultas (Hidden Surface Determination o HSR) o de remoción de superficie oculta (Hidden Surface Remotion) es el metodo utilizado para identificar que superficies o partes de estas son visibles o no desde determinado ángulo. El problema de visibilidad es uno de los mas grandes en la teoria de gráficos tridimensionales y los algoritmos HSR ofreden soluciones a este tipo de problemas. Si la visualización de una linea se puede realizar por medio de renderizado, su contraparte es la remoción de lineas ocultas. La identificación de las superficies ocultas es necesaria para mostrar una imgen de maner correcta, de tal manera que se previene que se muetren imagenes que naturalmente no podrian ser vistas.

![Ejemplo de las primeras aplicaciones de la Remoción de Superficies Ocultas](http://watkins.cs.queensu.ca/~jstewart/454/images/history/img/hidden-lines.jpg)
En la imagen un ejemplo de las primeras aplicaciones de este tipo de algoritmos en los inicios de la animación por computador

### El Algoritmo del pintor

Un problema comun al representar imagenes tridimensionales en un plano bidimensional es decidir que poligonos son visibles y cuales se ocultarán. El algoritmo del pintor es una de las soluciones a este problema y se llama asi por el método utilizado por los pintores para solucionar este problema, en donde estos primero dibujan las partes mas lejanas de la escena y luego las cubren con las partes mas cercanas.

![Ejemplo algoritmo del pintor](https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Painter%27s_algorithm.png/590px-Painter%27s_algorithm.png)

El algoritmo del pintor ordena todos lo poligonos en la escena por su profunidad y luego los dibuja en orden. Sin embargo el algoritmo del pintor puede fallar en algunas ocasiones. Si se tiene un conjunto de poligonos superpuestos entre si, el algoritmo no es capaz de determinar que poligono está por encima de los demas.

![Ejemplo de fallo en el algoritmo del pintor](https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Painters_problem.svg/220px-Painters_problem.svg.png)

En la imagen se ven 3 poligonos superpuestos entre si. En este caso no se puede determinar (por medio del algoritmo del pintor) que poligono esta por encima de los demás.

Para solucionar esto, Newell en 1972 planteo una variación del algortimo en donde se proporciona un método para cortar estpor poligonos. Sin embargo en su implementación básica el algoritmo del pintor puede ser ineficiente ya que obliga al sistema a representar cada punto de todos los polígonos en el conjunto visible, incluso si algunos polígonos estarán ocultos en la escena final. El algoritmo de pintor invertido a veces se usa dibujando primero objetos cercanos al pintor, con la regla de que las partes ya dibujadas no se volverán a dibujar. Esto puede ser muy eficiente ya que no necesita calcular los colores para las partes que están distantes y están ocultas de objetos cercanos. Sin embargo, el algoritmo inverso sufre los mismos problemas que la versión normal. Este y otros defectos en el algoritmo condujeron al desarrollo de la técnica Z - buffer, que puede verse como un desarrollo del algoritmo del pintor que resuelve conflictos de profundidad, eliminando la necesidad de clasificación de renderizado basada en profundidad.

Referencias: 
[1] https://kripkit.com/algoritmo-de-pintor/



## Aplicación de Algoritmo de Rasterización

### Algortimo de linea de Bresenham






{{< p5-instance-div id="pacman" >}}



p5.setup = function() {
  p5.createCanvas(400, 400);
};

function drawLine(x0, y0, x1, y1, freq) {
  var dx = p5.abs(x1 - x0);
  var sx = x0 < x1? 1: -1;
  var dy = -p5.abs(y1 - y0)
  var sy = y0 < y1? 1: -1
  var err = dx + dy
  var i = 0;
  while(true) {
    if(freq(i++)){
      p5.point(x0, y0)
    }
    
    if (x0 == x1 && y0 == y1)
      break;
      
    var e2 = 2 * err;
    if (e2 >= dy) {
      err += dy; /* e_xy + e_x > 0 */
      x0 += sx;
    }
    if (e2 <= dx) { /* e_xy + e_y < 0 */
      err += dx;
      y0 += sy;
    }
  }
}

function dotfreq(freq) {
  return function(i) { 
    return i % freq == 0; 
  }
};

function dashedfreq (a, b) {
  
};

 p5.draw = function() {
  p5.background(220);
  
  drawLine(80, 0, 100, 100, dotfreq(1))
  drawLine(0, 100, 100, 100, dotfreq(1))
  drawLine(300, 80, 200, 100, dotfreq(2))
  drawLine(200, 0, 200, 100, dotfreq(1))
  drawLine(100, 200, 0, 220, dotfreq(3))
  drawLine(100, 200, 100, 300, dotfreq(1))
  drawLine(200, 200, 220, 300, dotfreq(4))
  drawLine(200, 200, 300, 200, dotfreq(1))
  
  drawLine(10, 310, 60, 310, dotfreq(1))
  drawLine(10, 360, 60, 360, dotfreq(1))
  drawLine(10, 310, 10, 360, dotfreq(1))
  drawLine(60, 310, 60, 360, dotfreq(1))
  
  drawLine(70+10, 310, 90+60, 310, dotfreq(1))
  drawLine(70+10, 360, 90+60, 360, dotfreq(1))
  drawLine(70+10, 310, 70+10, 360, dotfreq(1))
  drawLine(90+60, 310, 90+60, 360, dotfreq(1))
  
  drawLine(100+70+10, 360, 100+90+60, 360, dotfreq(1))
  drawLine(100+70+10, 310, 100+70+10, 360, dotfreq(1))
  drawLine(100+70+10, 310, 100+90+60, 360, dotfreq(1))
}





{{< /p5-instance-div >}}