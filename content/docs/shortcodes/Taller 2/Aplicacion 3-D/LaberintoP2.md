## Parte 2

---

3. **Colisiones y Creacion:** Tomando lo creado en los ejercicios anteriores se crea un laberinto sencillo por el cual la esfera pueda desplazarse, se trata de simular fisicas como fuerzas Newtonianas para dar realismo a la aplicacion.

{{< hint info >}}
**¿Como interactuar con el plano?**

{{< /hint >}}

{{< details "**CODIGO:** Aceleracion" close >}}

```javascript
console.log("Coloque aqui el codigo del laberinto.");
```

{{< /details >}}
{{< p5-iframe srcdoc="lib3" srcdoc="lib4" sketch="/visual_computing/sketches/maze/sketch.js" width="450" height="450">}}

---

# Conclusiones

- **P5.treegl** Permitio que la realizacion del ejercicio fuera un poco mas simple de lo que se hubiese logrado a fuerza bruta, sin embargo p5.js presenta muchas desventajas al momento de simular fisicas en los objetos ya que para crearlos son pocos los parametros que existen por lo cual no se recomienda para personas no experimentadas.
- El Funcionamiento de tipo vectorial que existe en **P5** permite una aproximacion matematica para la manipulacion del espacio y los objetos creados en el.

# Referencias

{{< hint warning >}}

- [1] _“Reference | p5.js,”_ **p5js.org.** https://p5js.org/es/reference/ (accessed Oct. 18, 2022).
- [2] _“p5.treegl,”_ **GitHub**, Sep. 12, 2022. https://github.com/VisualComputing/p5.treegl (accessed Oct. 18, 2022).
- [3] _“Laberinto,”_ **Wikipedia**, Aug. 24, 2022. https://es.wikipedia.org/wiki/Laberinto (accessed Oct. 18, 2022).

{{< /hint >}}
