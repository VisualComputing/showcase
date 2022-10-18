# Midpoint Circle Algorithm

El algoritmo de dibujo de círculo de punto medio es un algoritmo utilizado para determinar los puntos necesarios para rasterizar un círculo.

Usamos el algoritmo del punto medio para calcular todos los puntos del perímetro del círculo en el primer octante y luego los imprimimos junto con sus puntos de espejo en los otros octantes. Esto funcionará porque un círculo es simétrico con respecto a su centro.

![](https://media.geeksforgeeks.org/wp-content/uploads/circle-5.jpg)

## Formulas

Dado un circle centrado en (0,0) y un radio r. Teniendo un punto con coordenadas p(x,y)

{{< katex display >}}
F(p) = x^2+y^2-r^2
{{< /katex >}}

| Name                                        | Matrix                           |
| ------------------------------------------- | -------------------------------- |
| {{< katex display >}}F(p) < 0{{< /katex >}} | El punto esta dentro del circulo |
| {{< katex display >}}F(p) = 0{{< /katex >}} | El punto esta en el perimetro    |
| {{< katex display >}}F(p) > 0{{< /katex >}} | El punto esta fuera del circulo  |

![](https://3.bp.blogspot.com/-X8qWA41L1Tc/W8wU2ONH55I/AAAAAAAAAKY/DFM7qT67HfgIpRwThlCH8izwzHG6JF7gACLcBGAs/s1600/midpointcircle%2B%25281%2529.png)

{{< details title="Midpoint circle algorithm" open=false >}}

```javascript
function calculateOctant(middle) {
  x += 1;
  // Mid-point is inside or on the perimeter
  if (p <= 0) {
    p = p + 2 * x + 1;
  } else {
    y -= 1;
    p = p + 2 * x - 2 * y + 1;
  }
  const __x = x * space;
  const __y = y * space;
  savePointsCircle(__x, __y);
  if (fillCircle) {
    for (let i = 1; i < r; i++) {
      savePointsCircle(__x, __y - space * i);
    }
  }

  if (x >= y - 1) {
    return true;
  }
  return false;
}
```
{{< /details >}}


{{< p5-iframe sketch="/visual_computing/sketches/rasterization.js" width="646" height="646" >}}
