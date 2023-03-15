let numShapes = 100;
let shapeSize = 10;
let angle = 0;

function setup() {
  createCanvas(400, 400);
  numShapesInput = createInput(numShapes);
  numShapesInput.value(100);

  shapeSizesInput = createInput(shapeSize);
  shapeSizesInput.value(10);

  numShapesInput.input(() => {
    numShapes = parseInt(numShapesInput.value());
  });

  shapeSizesInput.input(() => {
    shapeSize = parseInt(shapeSizesInput.value());
  });
}

function draw() {
  background(220);
  noFill();

  // Center the shapes in the canvas
  let centerX = width / 2;
  let centerY = height / 2;

  // Draw a loop of triangles
  stroke("blue");
  for (let i = 0; i < numShapes; i++) {
    let triangleX = centerX;
    let triangleY = centerY;
    let triangleR = shapeSize * (numShapes - i);
    let triangleA = angle + i * (360 / numShapes);
    push();
    translate(triangleX, triangleY);
    rotate(radians(triangleA));
    triangle(0, 0, triangleR, triangleR * sqrt(3) / 2, -triangleR, triangleR * sqrt(3) / 2);
    pop();
  }

  // Draw a loop of squares
  stroke("red");
  for (let i = 0; i < numShapes; i++) {
    let squareX = centerX;
    let squareY = centerY;
    let squareW = shapeSize * (numShapes - i);
    let squareA = angle - i * (360 / numShapes);
    push();
    translate(squareX, squareY);
    rotate(radians(squareA));
    rectMode(CENTER);
    rect(0, 0, squareW, squareW);
    pop();
  }

  angle += 1;
}
