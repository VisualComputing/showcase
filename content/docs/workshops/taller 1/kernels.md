
# Kernels

<script>
    function resizeIframe(obj) {
        obj.style.height = obj.contentWindow.document.documentElement.scrollHeight + 'px';
    }
</script>
 <link rel="stylesheet" type="text/css" href="/showcase/styles/styles.css" />

## Resumen
Se busca el desarrollo de una aplicación en el lenguaje P5JS con la capacidad de procesar una imagen con distintos kerneles y visualizar el resultado con diferentes herramientas para el análisis de esta.
## Palabras Clave 
[kernels](#kernels-o-mascaras), [histograma de una imagen](#histograma-de-una-imagen) y [modelos de color](#modelos-de-color-rgb-hls-hsv).
## Marco teorico
### Kernels o mascaras
En procesamiento de imagen un kernel es una matriz pequeña utilizada para realizar diferentes transformaciones en la matriz de la imagen. Esto se hace a través de una operación llamada [convolución](#convolución).

#### Convolución
En procesamiento de imágenes la convolución es el proceso de transformar una imagen, aplicando un kernel a cada pixel y sus vecinos locales a través de toda la imagen.

{{< katex display >}}
\begin{bmatrix}
   x_{11} & \dots & x_{1n} \\
   \vdots & \ddots & \vdots\\
   x_{m1} & \dots & x_{mn} \\
\end{bmatrix} * 
\begin{bmatrix}
   y_{11} & \dots & y_{1n} \\
   \vdots & \ddots & \vdots\\
   y_{m1} & \dots & y_{mn} \\
\end{bmatrix}
= \sum_{i=0}^{m-1}\sum_{j=0}^{n-1}x_{(m-i)(n-j)}y_{(1+i)(1+j)}
{{< /katex >}}

### Modelos de color (RGB, HLS, HSV)
Los modelos de color son modelos matemáticos utilizados para describir los colores de manera numérica. En procesamiento de imagenes los mas utilizados son [RGB](#rgb), [HSV](#hsv-o-hsb), [HSL](#hsl).

#### RGB
![rgb cube](https://upload.wikimedia.org/wikipedia/commons/6/65/Colorcube-1.png#floatright)

RGB es el modelo de color más simple, donde sus componentes están dados en términos de la intensidad de los colores primarios de la luz (rojo, verde y azul).
#### HSV o HSB
![HSB](https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/HSV_color_solid_cylinder.png/800px-HSV_color_solid_cylinder.png#floatright)

El modelo de color HSB está determinado por las siglas en ingles de _Hue_, _Saturation_ y Brightness, que en español significan, matiz saturación y brillo.
#### HSL
![HSL](https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/HSL_color_solid_cylinder.png/800px-HSL_color_solid_cylinder.png#floatright)

El modelo de color HSL está determinado por las siglas en ingles de _Hue_, _Saturation_ y _Lightness_, que en español significan, matiz saturación e intensidad.

### Histograma de una imagen
El histograma de una imagen un tipo de histograma que describe la distribución tonal de una imagen. Grafica el número de pixeles para cada valor tonal.

## Metodologia
Se diseno y desarrollo una aplicacion con el lenguaje P5JS que permite:
- Cargar una imagen
- Aplicar diferentes kernels o mascarás
- Editar kernels
- Visualizar los valores de rojo (R), verde (G), azul (B), matiz (H), saturación (S), intensidad (L), brillo (B), luma (Y) y croma (C) en promedio de toda la imagen o para un pixel en específico.
- Visualizar el histograma de la imagen con la máscara seleccionada.


{{< p5-iframe sketch="/showcase/sketches/kernelLab/main.js" width="725" height="0" stylesheet="/showcase/css/styles.css" marginHeight="0" marginWidth="0" frameBorder="0" scrolling="no">}}

## Conclusiones

- Las máscaras son bastante utilizadas en procesamiento de imágenes, ya que ofrecen una gran variedad de transformaciones y resultados en la imagen resultante.
- El uso de los componentes de los modelos de color como RGB, HSL y HSB proporcionan una variedad de herramientas para analizar una imagen de manera precisa.
- El histograma de la imagen ayuda a dar una idea general de la distribución tonal en una imagen.

## Referencias

- https://en.wikipedia.org/wiki/Kernel_%28image_processing%29
- https://en.wikipedia.org/wiki/HSL_and_HSV#Lightness
- https://en.wikipedia.org/wiki/Image_histogram


