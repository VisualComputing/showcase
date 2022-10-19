var p,
  x,
  y,
  r,
  space,
  decrease,
  move = 0,
  showCircle = true,
  fillCircle = false,
  randomizeColors = true;
let circleX = [];
let circleY = [];
let existingCombinations = [];
function setup() {
  createCanvas(621, 621);
  frameRate(5);
  move = 0;
  r = 15;
  space = 20;
  decrease = true;
  resetSketch();

  var checkbox = createCheckbox('Completar el circulo', true);
  checkbox.position(510, 20);
  checkbox.changed((e) => {
    showCircle = e.target.checked;
    resetSketch();
  });

  var checkbox2 = createCheckbox('Rellenar el circulo', false);
  checkbox2.position(510, 580);
  checkbox2.changed((e) => {
    fillCircle = e.target.checked;
    resetSketch();
  });

  var checkbox3 = createCheckbox('Color random', true);
  checkbox3.position(20, 580);
  checkbox3.changed((e) => {
    randomizeColors = e.target.checked;
    resetSketch();
  });
}

function drawControls() {
  var button = createButton('+');
  button.position(92, 35);
  button.mousePressed(() => {
    r++;
    resetSketch(true);
  });

  var button2 = createButton('-');
  button2.position(70, 35);
  button2.mousePressed(() => {
    r--;
    resetSketch(true);
  });

  var button3 = createButton('+');
  button3.position(92, 80);
  button3.mousePressed(() => {
    space += 2;
    resetSketch(true);
  });

  var button4 = createButton('-');
  button4.position(70, 80);
  button4.mousePressed(() => {
    space--;
    resetSketch(true);
  });

  fill(255, 255, 255);
  rect(500, 10, 115, 40);
  rect(500, 570, 115, 40);
  rect(10, 570, 115, 40);
  rect(10, 10, 100, 40);
  rect(10, 55, 100, 40);
  stroke(0, 0, 0);
  textSize(15);
  fill(0, 0, 0);
  text('Radius', 12, 25);
  text('Size', 12, 70);
  fill(0, 102, 153);
}

function resetSketch() {
  circleX = [];
  circleY = [];
  existingCombinations = [];
  move = 0;
  p = 1 - r;
  x = -1;
  y = r;
  clear();
  loop();
}

function drawGrid() {
  for (let i = 0; i < width - 1 / space; i++) {
    stroke(0, 200, 0);
    strokeWeight(1);
    line(i * space, 0, i * space, height - 1);
    line(0, i * space, width - 1, i * space);
  }
}

function draw() {
  background(0, 0, 40);

  let middle = floor((width - 1) / space / 2) * space;
  drawGrid();

  push();
  translate(middle, 0);
  fill(150, 90);
  rect(move, 0, space, height);
  move += space;
  pop();

  fill(255, 0, 0);
  square(middle, middle, space);

  res = calculateOctant(middle);

  push();
  translate(middle, middle);
  for (let i = 0; i < circleX.length; i++) {
    if (!randomizeColors && !fillCircle) {
      if (i % 8 == 0) {
        fill(255, 0, 0);
      } else if (i % 8 == 1) {
        fill(255, 255, 255);
      } else if (i % 8 == 2) {
        fill(0, 0, 255);
      } else if (i % 8 == 3) {
        fill(255, 255, 0);
      } else if (i % 8 == 4) {
        fill(0, 255, 255);
      } else if (i % 8 == 5) {
        fill(255, 0, 255);
      } else if (i % 8 == 6) {
        fill(0, 255, 0);
      } else if (i % 8 == 7) {
        fill(200, 200, 200);
      }
    } else if (!randomizeColors && fillCircle) {
      const color = 
      fill(255,0,0)
    } else {
      const r = Math.floor(Math.random() * 255);
      const g = Math.floor(Math.random() * 255);
      const b = Math.floor(Math.random() * 255);
      fill(r, g, b);
    }
    square(circleX[i], circleY[i], space);
  }
  pop();

  drawControls();

  if (res == true) {
    noLoop();
  }
}

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

function savePointsCircle(x, y) {
  circleX.push(x);
  circleY.push(-y);
  if (showCircle) {
    circleX.push(x);
    circleY.push(y);

    circleX.push(-x);
    circleY.push(y);

    circleX.push(-x);
    circleY.push(-y);

    circleX.push(y);
    circleY.push(x);

    circleX.push(y);
    circleY.push(-x);

    circleX.push(-y);
    circleY.push(x);

    circleX.push(-y);
    circleY.push(-x);
  }
}
