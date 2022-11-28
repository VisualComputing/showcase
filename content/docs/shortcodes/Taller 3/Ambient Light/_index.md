# Luz ambiente 

La luz ambiente no suele tener un punto de origen definido. Se puede ver como una iluminación en todas direcciones. 


##  implementación

Cada pixel del objeto es definido mediante la formula

{{< katex display >}}
color = ambient * (uMaterialColor * uColor)
{{< /katex >}}

* Donde **color** es el color final del pixel
* **ambient** es la cantidad de luminosidad
* **uMaterialColor** es el color del pixel original
* **uColor** es el color de ambiente elegido



{{< p5-iframe sketch="/visual_computing/sketches/shaders/diffuse/diffuseRefl2.js" lib1="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.js" lib2="https://cdn.jsdelivr.net/gh/freshfork/p5.EasyCam@1.2.1/p5.easycam.js" width="625" height="475" >}}


# Conclusiones

- Por su facilidad y rapidez, se podría intentar acoplar a una interfaz de personalización de una aplicación. 

# Referencias

{{< hint warning >}}

- [1] _“Reference | p5.js,”_ **p5js.org.** https://p5js.org/es/reference/ (accessed Oct. 18, 2022).
- [2] _“p5.treegl,”_ **GitHub**, Sep. 12, 2022. https://github.com/VisualComputing/p5.treegl (accessed Oct. 18, 2022).
- [3] _“Graphics lighting,”_ **Wikipedia**, Nov. 25, 2022 .https://en.wikipedia.org/wiki/Computer_graphics_lighting (accessed Nov. 25-28, 2022).

{{< /hint >}}
