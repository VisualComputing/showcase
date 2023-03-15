const CANVAS_SIZE = 800;
const BOX_AMOUNT_BY_ROW = 16;
const GRID_CELL = BOX_AMOUNT_BY_ROW / 4;

const BOX_SIZE = CANVAS_SIZE / BOX_AMOUNT_BY_ROW;
const INSIDE_BOX_SIZE = BOX_SIZE / 4;
const INSIDE_BOX_PADDING = BOX_SIZE * 0.05;
const CIRCLE_SIZE = (BOX_AMOUNT_BY_ROW - 2) * BOX_SIZE;

function setup() {
  createCanvas(725, 425);
  background(220);
  noStroke();

  let rotate = true;

  for (let k = 0; k < GRID_CELL; k++) {
    for (let z = 0; z < GRID_CELL; z++) {
      for (let i = 0; i < GRID_CELL; i++) {
        for (let j = 0; j < GRID_CELL; j++) {
          let bg = (i % 2) - (j % 2) == 0 ? 0 : 255;
          let foreground = bg == 255 ? 0 : 255;
          let x = z * GRID_CELL * BOX_SIZE + i * BOX_SIZE;
          let y = k * GRID_CELL * BOX_SIZE + j * BOX_SIZE;
          fill(bg);
          rect(x, y, BOX_SIZE, BOX_SIZE);

          fill(foreground);
          if (rotate) {
            rect(
              x + INSIDE_BOX_PADDING,
              y + INSIDE_BOX_PADDING,
              INSIDE_BOX_SIZE,
              INSIDE_BOX_SIZE
            );
            rect(
              x + INSIDE_BOX_SIZE * 3 - INSIDE_BOX_PADDING,
              y + INSIDE_BOX_SIZE * 3 - INSIDE_BOX_PADDING,
              INSIDE_BOX_SIZE,
              INSIDE_BOX_SIZE
            );
          } else {
            rect(
              x + INSIDE_BOX_SIZE * 3 - INSIDE_BOX_PADDING,
              y + INSIDE_BOX_PADDING,
              INSIDE_BOX_SIZE,
              INSIDE_BOX_SIZE
            );
            rect(
              x + INSIDE_BOX_PADDING,
              y + INSIDE_BOX_SIZE * 3 - INSIDE_BOX_PADDING,
              INSIDE_BOX_SIZE,
              INSIDE_BOX_SIZE
            );
          }
        }
      }
      rotate = !rotate;
    }
    rotate = !rotate;
  }
}