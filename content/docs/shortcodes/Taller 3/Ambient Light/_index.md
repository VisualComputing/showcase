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


{{< details "**CODIGO:** ambientLight.js" close >}}
```javascript

let lightShader;
let ambient;
function preload() {
  lightShader = readShader('../../../../sketches/shaders/diffuse/ambient.frag',
                           { varyings: Tree.NONE });
}

function setup() {
  createCanvas(600, 450, WEBGL);
  // easycam stuff
  let state = {
    distance: 250,           // scalar
    center: [0, 0, 0],       // vector
    rotation: [0, 0, 0, 1],  // quaternion
  };
  easycam = createEasyCam();
  easycam.state_reset = state;   // state to use on reset (double-click/tap)
  easycam.setState(state, 2000); // now animate to that state
  perspective();

  colorMode(RGB,1);
  // disable p5 lightning
  noLights();
  ambient = createSlider(0, 1, 1.0, 0.05);
  ambient.position(420, 10);
  ambient.style('width', '80px');
  ambient.input(() => { lightShader.setUniform('ambient', ambient.value()) });
  
  lightShader.setUniform('ambient', 0);

  colorPicker = createColorPicker(color(1,1,1));
  colorPicker.position(420,50)
  colorPicker.input(() => { lightShader.setUniform('uColor', 
 [red(colorPicker.color()),
  green(colorPicker.color()),
  blue(colorPicker.color()),
  1.0]) })
  lightShader.setUniform('uColor', 
 [red(colorPicker.color()),
  green(colorPicker.color()),
  blue(colorPicker.color()),
  1.0]) 
  shader(lightShader);
  // ...
  // select initial brush
}

function draw() {

  background(120);
  push();
  strokeWeight(0.8);
  stroke('magenta');
  grid({ dotted: false });
  pop();
  axes();

  noStroke();
  fill(1,0,1)
  push()
  translate(0,0,5)
  box(10,200,10);
  pop()

  
  fill(1,0,1)
  push()
  translate(0,0,5)
  box(200,10,10);
  pop()

  fill(0.8,0.3,0.3)
  push()
  translate(0,100,100)
  box(200,10,200);
  pop()

  fill(1,1,0)
  push()
  translate(100,0,100)
  box(10,200,200);
  pop()
  
}


function mouseWheel(event) {
  //comment to enable page scrolling
  return false;
}

function hexToRgb(hex) {
    hex = hex.replace('#', '');

    var bigint = parseInt(hex, 16);

    var r = (bigint >> 16) & 255;
    var g = (bigint >> 8) & 255;
    var b = bigint & 255;

    return color(r, g, b);
}
```
{{< /details >}}

# Conclusiones

- Por su facilidad y rapidez, se podría intentar acoplar a una interfaz de personalización de una aplicación. 

# Referencias

{{< hint warning >}}

- [1] _“Reference | p5.js,”_ **p5js.org.** https://p5js.org/es/reference/ (accessed Oct. 18, 2022).
- [2] _“p5.treegl,”_ **GitHub**, Sep. 12, 2022. https://github.com/VisualComputing/p5.treegl (accessed Oct. 18, 2022).
- [3] _“Graphics lighting,”_ **Wikipedia**, Nov. 25, 2022 .https://en.wikipedia.org/wiki/Computer_graphics_lighting (accessed Nov. 25-28, 2022).

{{< /hint >}}
