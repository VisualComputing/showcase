let bgcolor, g1, g2;

function setup() {
  createCanvas(500, 500);
  g1 = color(0);
  g2 = color(255);
  bgcolor = color(124, 125, 128);
}

function draw() {
  noStroke();
  background(240, 240, 240);
  fill(9, 145, 207);
  quad(0, 0, 500, 0, 500, 250, 0, 250);
  fill(106, 100, 69);
  quad(0, 250, 500, 250, 500, 500, 0, 500);
  fill(0, 59);
  quad(135, 400, 365, 400, 420, 500, 80, 500);
  fill(bgcolor);
  quad(150, 50, 350, 50, 400, 200, 100, 200);
  fill(bgcolor);
  quad(100, 300, 400, 300, 350, 450, 150, 450);
  gradient(100, 200, 300, 50, bgcolor, g1, 0, 0.5);
  gradient(100, 250, 300, 50, g2, bgcolor, 0.2, 1);
  if (mouseIsPressed === true) {
    fill(bgcolor);
    quad(
      mouseX - 150,
      mouseY + 50,
      mouseX + 150,
      mouseY + 50,
      mouseX + 150,
      mouseY - 50,
      mouseX - 150,
      mouseY - 50
    );
  }
}

function gradient(x, y, w, h, c1, c2, op1, op2) {
  for (let i = y; i <= y + h; i++) {
    let inter = map(i, y, y + h, op1, op2);
    let c = lerpColor(c1, c2, inter);
    stroke(c);
    strokeWeight(2);
    line(x, i, x + w, i);
  }
}
