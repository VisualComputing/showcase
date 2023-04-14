let startButton, stopButton;
let xOffset, xSpeed;
let img;

function preload() {
  img = loadImage('/showcase/lobo.jpg');
}

function setup() {
  createCanvas(700, 400);
  text = createP("Speed");
  startButton = createButton('Start');
  startButton.mousePressed(startGrid);
  stopButton = createButton('Stop');
  stopButton.mousePressed(stopGrid);
  input = createInput();
  input.value(2.5);
  startGrid();
}

function draw() {
  background(img);
  if (xOffset) {
    xOffset += xSpeed;
    if (xOffset > width) {
      xOffset = -width;
    }
  }
  drawLines();
}

function drawLines() {
  stroke(0);
  strokeWeight(5);
  let lineSpacing = 10;
  for (let x = -width*1000; x < width*1000; x += lineSpacing) {
    line(x + xOffset, 0, x + xOffset, height);
  }
}

function startGrid() {
  let val = input.value();
  xSpeed = parseFloat(val);
  xOffset = -width;
}

function stopGrid() {
  xOffset = null;
}
