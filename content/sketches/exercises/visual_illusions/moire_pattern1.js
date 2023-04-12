let figuresCount = 100;
let shapeSize = 4;

function setup() {
  createCanvas(400, 400);
  shapesCount = createInput(figuresCount);
  shapesCount.value(100);

  shapeSizesInput = createInput(shapeSize);
  shapeSizesInput.value(10);

  shapesCount.input(() => {
    figuresCount = parseInt(shapesCount.value());
  });

  shapeSizesInput.input(() => {
    shapeSize = parseInt(shapeSizesInput.value());
  });

}

let rotationAngle = 0;

function draw() {
  background(220);
  noFill();
  strokeWeight(2);
  
  let centerX = width / 2;
  let centerY = height / 2;
  
  for (let i = 0; i < figuresCount; i++) {
    let squareX = centerX - (shapeSize * (figuresCount - i)) / 2;
    let squareY = centerY - (shapeSize * (figuresCount - i)) / 2;
    let squareW = shapeSize * (figuresCount - i);

    push(); 
    translate(squareX + squareW/2, squareY + squareW/2); 
    rotate(radians(rotationAngle)); 
    stroke("blue");
    rectMode(CENTER);
    rect(-squareW/2, -squareW/2, squareW, squareW); 
    
    stroke("red");
    let circleR = (shapeSize * (figuresCount - i)) ;
    ellipse(centerX, centerY, circleR, circleR);
  }
  
  rotationAngle += 1; 
}
