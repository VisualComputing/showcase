var colors = [];

function setup() {
  createCanvas(725, 425);
}

function draw() {
  background(255);
  x_jump = 55;
  y_jump = 55;
  stroke('grey');
  strokeWeight(3.3);

    for (var j = 0 ; j < 30; j++) {
      for (var i = 0; i < 30; i++) {
        if (j % 2 == 0) {
          fill(0);
        } else {
          fill(255);
        };if (i % 2 == 0) {
          fill(0);
        } else {
          fill(255);
        };
        if (j % 3 == 0){
          rect(i * x_jump - 10, j * y_jump, 80, 90);
        } else if (j % 2 == 0){
          rect(i * x_jump - 30, j * y_jump, 100, 60);
        } else {
          rect(i * x_jump - 50, j * y_jump, 90, 60);
        }
      }
    }
}