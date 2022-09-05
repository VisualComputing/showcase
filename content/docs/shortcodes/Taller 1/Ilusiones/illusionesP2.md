# Movimiento Enlazado
---
## Problem statement

La presente ilusión muestra 4 líneas aparentemente moviéndose de forma _independiente_, sin embargo, al revisarlas de forma extensiva se puede notar que se mueven en pares ordenados paralelos. La figura que describe este movimiento corresponde a un rombo el cual posee sus vértices ocultos;

Al hacer que los vértices sean visibles se puede notar como el tenerlos ocultos crea el movimiento ilusorio.

{{< hint info >}}
**¿Como interactuar con la ilusión?**  
Para visibilizar las figuras que desmontan la ilusión es necesario marcar
el checkbox **"Visible"** , el Slider que se encuentra permite cambiar la 
visibilidad _"Alpha"_ de las figuras.
{{< /hint >}}

## Code

{{< p5-global-iframe id="sketchid"  width="625" height="625" >}}
    let bgColor = 200, checkbox;
    function setup() {
      createCanvas(600,600);
      angleMode(DEGREES);
      rectMode(CENTER);
    
      //transparency
      slider = createSlider(20, 255, 100);
      slider.position(10, 10);
      slider.style('width', '80px');
    
      //Squares Transparency
      checkbox = createCheckbox('Visible', false);
      checkbox.position(10,40);

    }

    function drawSquares(visible){
      let xAxis = 150;
      let yAxis = 150;
      let size = 120;
    
      rotate(45);
    
      if(!checkbox.checked()){
        fill(bgColor);
        noStroke()
      }else{
        let alpha = slider.value();
        fill(0,100,100,alpha);
        noStroke();
      }
    
      rect(xAxis,-yAxis,size,size);
      rect(-xAxis,yAxis,size,size);
      rect(xAxis,yAxis,size,size);
      rect(-xAxis,-yAxis,size,size);
    }

    function mainSquare(){
      translate(p5.Vector.fromAngle(millis()/500,40));
      let bSize = 300;
      rotate(45);
      fill(bgColor)
      stroke(0, 0, 255);
      strokeWeight(6);
      rect(0,0,bSize,bSize);
    }

    function draw() {
      background(bgColor);
      translate(width/2,height/2);
    
      push();
      mainSquare();
      pop();
    
      drawSquares(false);
    }
{{< /p5-global-iframe >}}

{{< details "**CODIGO:** Movimiento Enlazado" close >}}
**C**odigo generado usando el editor web de **P5.js**.
```javascript
    let bgColor = 200, checkbox;
    function setup() {
      createCanvas(600,600);
      angleMode(DEGREES);
      rectMode(CENTER);
    
      //transparency
      slider = createSlider(20, 255, 100);
      slider.position(10, 10);
      slider.style('width', '80px');
    
      //Squares Transparency
      checkbox = createCheckbox('Visible', false);
      checkbox.position(10,40);

    }

    function drawSquares(visible){
      let xAxis = 150;
      let yAxis = 150;
      let size = 120;
    
      rotate(45);
    
      if(!checkbox.checked()){
        fill(bgColor);
        noStroke()
      }else{
        let alpha = slider.value();
        fill(0,100,100,alpha);
        noStroke();
      }
    
      rect(xAxis,-yAxis,size,size);
      rect(-xAxis,yAxis,size,size);
      rect(xAxis,yAxis,size,size);
      rect(-xAxis,-yAxis,size,size);
    }

    function mainSquare(){
      translate(p5.Vector.fromAngle(millis()/500,40));
      let bSize = 300;
      rotate(45);
      fill(bgColor)
      stroke(0, 0, 255);
      strokeWeight(6);
      rect(0,0,bSize,bSize);
    }

    function draw() {
      background(bgColor);
      translate(width/2,height/2);
    
      push();
      mainSquare();
      pop();
    
      drawSquares(false);
    }
```
{{< /details >}}

---

## Conclusions

Para el ojo inexperto el movimiento puede resultar complejo ya que la ilusion cumple con el objetivo y de primera mano da a enter que tras ella se requieren calculos y codigos complejos para obtener la sincronizacion. Sin embargo, el desarrollo del ejercicio permite entender como la manipulacion geometrica y de factores como perspectiva y velocidad permiten generar animaciones complejas.