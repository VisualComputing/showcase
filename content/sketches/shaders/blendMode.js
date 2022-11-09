let select, selectedMode;

function setup() {
  createCanvas(450, 450);
  drawControls();
  selectBlendMode();
}

function drawControls() {
  select = createSelect();
  select.position(185, height - 20);
  select.option('DARKEST');
  select.option('LIGHTEST');
  select.option('MULTIPLY');
  select.option('SOFT_LIGHT');
  select.option('EXCLUSION');
  select.selected('LIGHTEST');
  select.changed(mySelectEvent);
}

function mySelectEvent() {
  selectBlendMode(select.value());
}

function selectBlendMode(mode) {
  clear();
  switch (mode) {
    case 'DARKEST':
      blendMode(DARKEST);
      break;
    case 'LIGHTEST':
      blendMode(LIGHTEST);
      break;
    case 'MULTIPLY':
      blendMode(MULTIPLY);
      break;
    case 'SOFT_LIGHT':
      blendMode(SOFT_LIGHT);
      break;
    case 'EXCLUSION':
      blendMode(EXCLUSION);
      break;
    default:
      blendMode(LIGHTEST);
      break;
  }
  resetSketch();
}
function draw() {}

function resetSketch() {
  strokeWeight(100);
  stroke(80, 150, 255);
  line(25, 25, width - 25, height - 25);
  stroke(255, 50, 50);
  line(width - 25, 25, 25, height - 25);
}
