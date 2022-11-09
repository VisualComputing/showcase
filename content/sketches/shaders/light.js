let lightShader;
let color1, color2;
let brightness;

function preload() {
  lightShader = readShader('../../../../sketches/shaders/light.frag', {
    matrices: Tree.NONE,
    varyings: Tree.NONE,
  });
}

function setup() {
  createCanvas(450, 250, WEBGL);
  colorMode(RGB, 1);
  drawControls();
  
  shader(lightShader);
}

function drawControls() {
  color1 = createColorPicker(color(255, 255, 0));
  color1.position(10, 10);
  color2 = createColorPicker(color(130, 0, 130));
  color2.position(width - 45, 10);
  brightness = createSlider(0, 1, 0.5, 0.05);
  brightness.style('width', `${width-10}px`);
  brightness.position(10, height - 10);
}

function drawTriangle(color, arr) {
  lightShader.setUniform('uMaterial1', [
    red(color),
    green(color),
    blue(color),
    1.0,
  ]);
  lightShader.setUniform('uMaterial2', [1.0, 1.0, 1.0, 1.0]);
  lightShader.setUniform('brightness', 1.0);
  beginShape();
  vertex(arr[0][0], arr[0][1]);
  vertex(arr[1][0], arr[1][1]);
  vertex(arr[2][0], arr[2][1]);
  endShape();
}

function drawBlendedTriangle(color1, color2, brightness, arr) {
  lightShader.setUniform('uMaterial1', [
    red(color1),
    green(color1),
    blue(color1),
    1.0,
  ]);
  lightShader.setUniform('uMaterial2', [
    red(color2),
    green(color2),
    blue(color2),
    1.0,
  ]);
  lightShader.setUniform('brightness', brightness);

  beginShape();
  vertex(arr[0][0], arr[0][1]);
  vertex(arr[1][0], arr[1][1]);
  vertex(arr[2][0], arr[2][1]);
  endShape();
}

function draw() {
  let color1Color = color1.color();
  let color2Color = color2.color();
  background(0);
  drawTriangle(color1Color, [
    [-1, 1],
    [-1, -1],
    [0, 1],
  ]);
  drawTriangle(color2Color, [
    [0, 1],
    [1, 1],
    [1, -1],
  ]);

  drawBlendedTriangle(
    color1Color,
    color2Color,
    brightness.value(),
    [
      [-1, -1],
      [0, 1],
      [1, -1],
    ]
  );
}
