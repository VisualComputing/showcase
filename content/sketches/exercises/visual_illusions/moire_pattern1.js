let numFigures = 100;
let shapeSize = 10;

function setup() {
  createCanvas(400, 400);
  numShapesInput = createInput(numFigures);
  numShapesInput.value(100);

  shapeSizesInput = createInput(shapeSize);
  shapeSizesInput.value(10);

  numShapesInput.input(() => {
    numFigures = parseInt(numShapesInput.value());
  });

  shapeSizesInput.input(() => {
    shapeSize = parseInt(shapeSizesInput.value());
  });

}

let rotationAngle = 0; // Add a rotation angle variable

function draw() {
  background(220);
  noFill();
  strokeWeight(2);
  
  // Center the square loop in the canvas
  let centerX = width / 2;
  let centerY = height / 2;
  
  // Draw a loop of squares
  for (let i = 0; i < numFigures; i++) {
    let squareX = centerX - (shapeSize * (numFigures - i)) / 2;
    let squareY = centerY - (shapeSize * (numFigures - i)) / 2;
    let squareW = shapeSize * (numFigures - i);

    push(); // Save the current drawing style and transformation state
    translate(squareX + squareW/2, squareY + squareW/2); // Translate to the center of the square
    rotate(radians(rotationAngle)); // Rotate the square
    stroke("blue");
    rect(-squareW/2, -squareW/2, squareW, squareW); // Draw the square
    pop(); // Restore the previous drawing style and transformation state
    
    stroke("red");
    let circleR = (shapeSize * (numFigures - i)) ;
    ellipse(centerX, centerY, circleR, circleR);
  }
  
  rotationAngle += 1; // Increment the rotation angle
}
