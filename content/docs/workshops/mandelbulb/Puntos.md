
# Mandelbulb con puntos 

## Conjunto de Mandelbrot
El conjunto de Mandelbrot es el más estudiado de los fractales. Se conoce así en honor al matemático Benoît Mandelbrot (1924-2010), que investigó sobre él en los años setenta.

<img src='../Self-Similarity-Zoom.gif' alt='Foto de mandelbrot'/>

Este conjunto se define en el plano complejo fijando un número complejo c cualquiera. A partir de c, se construye una sucesión por recursión:

{{< katex display >}}
{\displaystyle {\begin{cases}z_{0}=0\in \mathbb {C} &{\text{(término inicial)}}\qquad \\z_{n+1}=z_{n}^{2}+c&{\text{(sucesión recursiva)}}\end{cases}}}
{{< /katex>}}

Si asignamos el color negro a los puntos c que dan lugares a sucesiones acotadas y otros colores a los demás puntos, según lo rápido que tiendan al infinito, la representación obtenida para el conjunto de Mandelbrot es:

<img src='../f.jpg' alt='Foto de mandelbrot'/>

Si hacemos zoom en diferentes partes del conjunto podemos encontrar imágenes como éstas:

<img src='../con3.jpg' alt='Foto de mandelbrot'/>

Como vemos estas imagenes solo se puden representar en dos dimenciones ya uqe se trabajan con numeros complejos pero para hacer una reprecentacion en tres dimenciones se puden trabajar con cuaterniones o numeros bicomplejos.

# Mandelbulb

El Mandelbulb es un fractal tridimensional , construido por primera vez en 1997 por Jules Ruis y desarrollado en 2009 por Daniel White y Paul Nylander usando coordenadas esféricas.

<img src='../Power_8_mandelbulb_fractal_overview.jpg' alt='Foto de mandelbrot'/>

Fórmula de White y Nylander para la " n -ésima potencia" del vector
{{< katex display >}}
{\displaystyle \mathbf {v} =\langle x,y,z\rangle }
{{< /katex>}}
en ℝ 3 es
{{< katex display >}}

{\displaystyle \mathbf {v} ^{n}:=r^{n}\langle \sin(n\theta )\cos(n\phi ),\sin(n\theta )\sin(n\phi ) ,\cos(n\theta )\rangle ,}{\displaystyle \mathbf {v} ^{n}:=r^{n}\langle \sin(n\theta )\cos(n\phi ),\sin(n\theta )\sin(n\phi ) ,\cos(n\theta )\rangle ,}
{{< /katex>}}
dónde
{{< katex display >}}
{\displaystyle r={\sqrt {x^{2}+y^{2}+z^{2}}} ,}
{\displaystyle \phi =\arctan {\frac {y}{x}}=\arg(x+yi) ,}
{\displaystyle \theta =\arctan {\frac {\sqrt {x^{2}+y^{2}}}{z}}=\arccos {\frac {z}{r}}.}
{{< /katex>}}

<script>
    function resizeIframe(obj) {
        obj.style.height = obj.contentWindow.document.documentElement.scrollHeight + 'px';
    }
</script>
 <link rel="stylesheet" type="text/css" href="/showcase/styles/styles.css" />


{{< p5-iframe sketch="/showcase/sketches/mandelbulb/points/supershapes.js" width="725" height="725" stylesheet="/showcase/css/styles.css" marginHeight="0" marginWidth="0" frameBorder="0" scrolling="no" lib1="/showcase/sketches/libraries/p5.easycam.js" lib2="/showcase/sketches/libraries/p5.treegl.js">}}

# Referencias 
[Conjunto de Mandelbrot](https://es.wikipedia.org/wiki/Conjunto_de_Mandelbrot)

[Mandelbrot set](https://en.wikipedia.org/wiki/Mandelbrot_set)

[¿Qué es el conjunto de Mandelbrot?: historia y construcción](https://www.gaussianos.com/%C2%BFque-es-el-conjunto-de-mandelbrot-historia-y-construccion/)

[Mandelbulb](https://en.wikipedia.org/wiki/Mandelbulb)
