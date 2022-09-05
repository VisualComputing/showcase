# Ilussions


# Ilusion mismo color

{{< p5-iframe sketch="/showcase/sketches/mismoColor/mismoColor.js" width="500" height="500" marginHeight="0" marginWidth="0" frameBorder="0" scrolling="no">}}

## Resumen

¿Crees que los bloques son del mismo color?
A primera vista los bloques parecen ser de diferentes colores pero ¿sucede lo mismo cuando tapamos su interseccion?
¡Son iguales! impresionante ¿verdad?

## Palabras Clave

[Percepción](#percepcion), [Cornsweet](#efecto-cornsweet), iluminación y [Sombras](#sombras).

## Marco teorico

Las principales caracteristicas de esta ilusion son la percepcion y las sombras

### Percepcion

El cerebro usa indicaciones de profundidad y perspectiva para darle sentido al mundo que nos rodea pero en ocasiones la experiencias pasadas pueden afectar la perspectiva actual, esto es llamado el efecto cornsweet

### Efecto Cornsweet

Segun Poom Los relatos empíricos de la ilusión Cornsweet sugieren que la ilusión surge debido a encuentros previos de fuentes de luminancia y gradientes de luminancia de sombreado en nuestro entorno 3D

### Sombras

Las sombras juegan un papel importante en esta ilusion ya que dan a entender que el trapecio de arriba es una superficie bien iluminada y el de abajo esta menos iluminado

## Metodologia

Para diseñar esta ilusion se siguen los siguientes pasos:

- Dibujar un fondo azul y cafe que permita simular que se encuentra en un campo abierto
- Dibujar trapecios opuestos con el mismo color
- Dibujar gradientes en la mitad de los trapecios que simulen que el trapecio de arriba es mas iluminado que el de abajo
- Dibujar una sombra para generar una sensacion de menor luminosidad
- Disfrutar la ilusion

## Conclusiones

- Las sombras le permiten al cerebro determinar como se ubica un objeto en el espacio
- La luz afecta la percepcion humana
- El cerebro se basa en experiencias previas y con esto realiza conjeturas que no siempre son verdaderas

## Referencias

- _Poom, L. (2019). Influences of orientation on the Ponzo, contrast, and Craik-O’Brien-Cornsweet illusions. Attention, Perception, & Psychophysics, 82(4), 1896–1911. https://doi.org/10.3758/s13414-019-01953-8_
- _Cavanagh, P., & Anstis, S. (2018). Diamond Patterns: Cumulative Cornsweet Effects and Motion-Induced Brightening. i-Perception, 9(4), 204166951877069. https://doi.org/10.1177/2041669518770690_
# Ilusión de Cuello de Paloma

## Resumen

En este artículo se revisa la ilusión del cuello de paloma, un caso particular de la ilusión de los pasos. En la ilusión se puede observar palomas moviendo primero su cabeza y luego el resto de su cuerpo mientras se mueven a través de una rejilla estacionaria, también hay gusanos encogiéndose y estirándose. Al retirar la rejilla se percibe que las imagenes de los patos y los gusanos tienen un movimiento constante sin alteraciones.

## Palabras Clave

Rejilla, Ilusión, Contraste, movimiento constante

{{< p5-iframe sketch="/showcase/sketches/neck_illusion/neck_illusion.js" width="725" height="425">}}

 
## Marco Teórico
### Descripción de la Ilusión

La ilusión de los pasos es una ilusión de movimiento en la que los objetos parecen moverse con rapidez o lentitud incluso cuando se mueven a una velocidad constante. Por ejemplo, cuando las palomas se mueven a una velocidad constante a través de una rejilla estacionaria de rayas verticales blancas y negras, parecen acelerar o desacelerar repetidamente, representado en que se mueva la cabeza y luego se detenga, seguido del movimiento y detenimiento del cuerpo (parecido a un movimiento de pasos). [1]

Cuando los rectángulos tienen una anchura de impar de barras, de modo que sus bordes de entrada y salida siempre se encuentran en el color diferente (negro frente a blanco), se observa la variante "inchworm" de la ilusión de los pasos. Los rectángulos parecen expandirse y contraerse repetidamente en sentido horizontal. Esta ilusión indica que los bordes de entrada y salida contribuyen independientemente a la ilusión de los pasos.

### Explicación de la Ilusión

La figura 1 muestra los desplazamientos posicionales ilusorios de los rectángulos. En la Fig. 1a, el espacio entre los dos rectángulos azules superiores parece ser más corto que el espacio entre los dos rectángulos amarillos inferiores, aunque están a la misma distancia. En cambio, en la Fig. 1b se observa lo contrario. Cuando un objeto oscuro (rectángulo azul) está conectado a un objeto oscuro delgado (franja negra), el borde conectado parece desplazarse hacia este último. Cuando un objeto claro (rectángulo amarillo) se conecta a un objeto claro delgado (franja blanca), el borde conectado parece desplazarse hacia este último. Esta hipótesis de ilusión geométrica puede aplicarse también a la ilusión de los pasos invertidos. [2]

![Figura 1](../fig1_pigeon.jpg) [2]
 Figura 1

El estímulo es un cambio periódico, cada ciclo consta de cuatro fases que dependen del lugar donde se encuentran los bordes de los rectángulos. (a) En la condición en la que los bordes de los rectángulos tocan los bordes de las franjas, como en la Fig. 1b, el espacio entre los dos rectángulos superiores parece ser menor que el espacio entre los dos rectángulos inferiores, aunque están a la misma distancia. (b) Cuando estos rectángulos se mueven hacia la derecha, sus bordes se encuentran dentro de cada franja. En esta fase, el rectángulo superior izquierdo parece moverse lentamente o quedarse quieto, mientras que el superior derecho parece moverse al mismo tiempo. Así, el espacio superior parece aumentar. Por el contrario, el rectángulo inferior izquierdo parece moverse como lo hace, mientras que el inferior derecho parece moverse lentamente o quedarse quieto. Por lo tanto, el espaciado inferior parece disminuir. (c) En la condición de que los bordes de los rectángulos toquen los bordes de las franjas como en la Fig. 2a, el espaciado superior parece ser mayor que el inferior. (d) Cuando estos rectángulos se mueven hacia la derecha, sus bordes se encuentran dentro de cada franja. En esta fase, el rectángulo superior izquierdo parece moverse como lo hace, mientras que el superior derecho parece moverse lentamente o quedarse quieto. Así, el espacio superior parece disminuir. Por el contrario, el rectángulo inferior izquierdo parece moverse lentamente o quedarse quieto, mientras que el inferior derecho parece moverse como lo hace. Por lo tanto, el espacio inferior parece disminuir.

![Figura 2](../fig2_pigeon.jpg) [2]
 Figura 2

## Metodología

Se diseñó y desarrollo una aplicación con el lenguaje P5JS en la cual hay un canvas sobre el que hay una rejilla que puede ser manipulada a través de un checkbox para que aparezca o desaparezca según conveniencia del usuario. Sobre esta configuración se dibujaron palomas y gusanos que complieran con las condiciones explicadas en el artículo para generar la ilusión de pasos al cruzar sobre la rejilla.


## Conclusiones

Entender ilusiones como la aquí descrita es útil para comprender las limitaciones del sentido visual del ser humano y la posibilidad de distorsión en lo relativo a la forma y la dimensión de lo observado. 

Las ilusiones ópticas son ampliamente utilizadas como un recurso expresivo en el ámbito artístico.

## Referencias

[1]
[Michael Bach](https://michaelbach.de/ot/mot-pigeonNeck/index.html) 

[2]
[Journal of Ilusion](https://journalofillusion.net/index.php/joi/article/view/5612/13464)


