var p1 = -0.02;
var p2 = -0.09;
var p3 = 1.5;
var m = 0;
var d = 1;
var s = 1;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(150);
  
  stroke(127, 63, 120);


  fill("black");
  rect(0,0, 400, 250);
  fill(color(200));
  ellipse(20 + m*p1, 20, 200);
  fill(color(180));
  noStroke();
  ellipse(30 + m*p1, 30, 30);
  ellipse(40 + m*p1, 40, 10);
  ellipse(40 + m*p1, 45, 5);
  ellipse(40 + m*p1, 30, 10);
  ellipse(45 + m*p1, 35, 5);
  ellipse(20 + m*p1, 30, 10);
  ellipse(15 + m*p1, 40, 5);
  ellipse(20 + m*p1, 15, 10);
  ellipse(25 + m*p1, 15, 5);

  ellipse(50 + m*p1, 30, 10);
  ellipse(60 + m*p1, 45, 5);
  ellipse(110 + m*p1, 50, 10);
  ellipse(100 + m*p1, 50, 5);
  ellipse(90 + m*p1, 40, 10);
  ellipse(100 + m*p1, 55, 5);

  fill(color(160));

  ellipse(30 + m*p1, 30, 20);
  ellipse(40 + m*p1, 40, 5);
  ellipse(40 + m*p1, 45, 3);
  ellipse(40 + m*p1, 30, 8);
  ellipse(45 + m*p1, 35, 2);
  ellipse(20 + m*p1, 30, 7);
  ellipse(15 + m*p1, 40, 4);
  ellipse(20 + m*p1, 15, 6);
  ellipse(25 + m*p1, 15, 2);

  ellipse(50 + m*p1, 30, 8);
  ellipse(60 + m*p1, 45, 2);
  ellipse(110 + m*p1, 50, 5);
  ellipse(100 + m*p1, 50, 3);
  ellipse(90 + m*p1, 40, 6);
  ellipse(100 + m*p1, 55, 2);


  stroke(127, 63, 120);
  fill("white");
  rect(-50 + m*p2, 70, 200, 230);
  rect(250 + m*p2, 30, 200, 270);
  fill("black");
  rect(10 + m*p2, 90, 40, 40);
  rect(80 + m*p2, 90, 40, 40);
  rect(10 + m*p2, 150, 40, 40);
  fill("yellow");
  rect(80 + m*p2, 150, 40, 40);
  rect(10 + m*p2, 210, 40, 40);
  fill("black");
  rect(80 + m*p2, 210, 40, 40);

  rect(280 + m*p2, 50, 40, 40);
  fill("yellow");
  rect(350 + m*p2, 50, 40, 40);
  rect(280 + m*p2, 110, 40, 40);
  fill("black");
  rect(350 + m*p2, 110, 40, 40);
  fill("yellow");
  rect(280 + m*p2, 170, 40, 40);
  rect(350 + m*p2, 170, 40, 40);
  fill("black");
  rect(280 + m*p2, 230, 40, 40);
  fill("yellow");
  rect(350 + m*p2, 230, 40, 40);
  fill("blue");
  ellipse(200 + m*p3, 350, 40);

  if(250 + m*p3 > 400 || 150 + m*p3 < 0) {
    d *= -1;
  }

  m += (d*s);
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    if (s > 0.1) {
      s -= 0.1;
    } else {
      s = 0.1;
    }
  } else if (keyCode === RIGHT_ARROW) {
    if (s < 10) {
      s += 0.1;
    } else {
      s = 10;
    }
  }
}