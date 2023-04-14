let img;
function preload() {
  img = loadImage('/showcase/sketches/exercises/coloring/HSV-model.png');
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    // Top-left corner of the img is at (10, 10)
    // Width and height are 50×50
    img.resize(500, 0);
    image(img, -20, 0);
  }
