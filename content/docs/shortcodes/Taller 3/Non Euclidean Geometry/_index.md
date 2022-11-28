## Non Euclidean Geometry

Se denomina geometría no euclidiana o no euclídea, a cualquier sistema formal de geometría cuyos postulados y proposiciones difieren en algún asunto de los establecidos por Euclides en su tratado Elementos. No existe un solo sistema de geometría no euclídea, sino muchos, aunque si se restringe la discusión a espacios homogéneos, en los que la curvatura del espacio es la misma en cada punto, en los que los puntos del espacio son indistinguibles, pueden distinguirse tres formulaciones​ de geometrías

{{< details title="non_euclidean.frag" open=false >}}

```javascript
precision mediump float;

uniform sampler2D texture;
uniform vec2 u_resolution;

void main() {
  vec2 st = gl_FragCoord.xy / u_resolution;
  gl_FragColor = texture2D(texture, vec2(st.s, 1.0 - st.t));
}
```

### Cubo

{{< p5-iframe sketch="/visual_computing/sketches/non_euclidean_cube.js" width="620" height="620" >}}

### Piramide

{{< p5-iframe sketch="/visual_computing/sketches/non_euclidean.js" width="620" height="620" >}}

# Referencias

{{< hint warning >}}

- [1] _“GLSL Fragment Coordinate”_ **medium.com** https://medium.com/@vnflqkq/glsl-fragment-coordinate-gl-fragcoord-e792a8d32ea5 (Mar. 8, 2020).

{{< /hint >}}
