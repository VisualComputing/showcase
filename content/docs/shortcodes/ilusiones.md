# Ilusiones
Bleh
## **Introducción**
---
Las ilusiones visuales son imágenes, animaciones o recursos visuales los cuales **“engañan”** tanto la percepción del ojo como la del cerebro. Estas están presentes en la naturaleza o pueden ser generadas de manera análoga o digital.

Las ilusiones pueden variar en su contenido, desde la alteración en la percepción de un objeto hasta la creación de objetos no existentes en el medio generador.

Estas se originan cuando el cerebro intenta procesar múltiples elementos visuales que generan conflictos al momento de ser analizados. La mayoría involucra elementos como **variaciones de color, de profundidad perceptiva, disrupciones geométricas entre otras**.

Durante el presente informe se analizarán diferentes ilusiones ópticas categorizadas a través de los módulos del curso los cuales las proponen.

---
## Antecedentes
Blehx3
## Metodos
{{< p5-global-iframe id="sketchid"  width="625" height="625" >}}
    let backgroundColor;

    function setup() {
      createCanvas(600, 600);
      let c1 = createInput("0,0,0",'color')
      let c2 = createInput("0,0,0",'color')
      c1.input(()=> setColor1(c1,c2))
      c2.input(()=> setColor1(c1,c2))
    }

    function setColor1(c1,c2){
      const cred = (red(c1.value()) * red(c2.value())) / 255;
      const cblue = (blue(c1.value()) * blue(c2.value())) / 255;
      const cgreen = (green(c1.value()) * green(c2.value())) /255;
      background(cred,cgreen,cblue)
    }
    
{{< /p5-global-iframe >}}


## Resultados

## Discusion