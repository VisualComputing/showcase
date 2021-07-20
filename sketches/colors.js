// instance mode of: 
// https://p5js.org/examples/color-relativity.html

new p5((p) => {
  let a, b, c, d, e;

  p.setup = function () {
    p.createCanvas(700, 400);
    p.noStroke();
    a = p.color(165, 167, 20);
    b = p.color(77, 86, 59);
    c = p.color(42, 106, 105);
    d = p.color(165, 89, 20);
    e = p.color(146, 150, 127);
    p.noLoop();
  }

  p.draw = function () {
    drawBand(a, b, c, d, e, 0, p.width / 128);
    drawBand(c, a, d, b, e, p.height / 2, p.width / 128);
  }

  function drawBand(v, w, x, y, z, ypos, barWidth) {
    let num = 5;
    let colorOrder = [v, w, x, y, z];
    for (let i = 0; i < p.width; i += barWidth * num) {
      for (let j = 0; j < num; j++) {
        p.fill(colorOrder[j]);
        p.rect(i + j * barWidth, ypos, barWidth, p.height / 2);
      }
    }
  }
}, "colors");