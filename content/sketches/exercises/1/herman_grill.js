function setup() {
  createCanvas(750, 750);
}

function draw() {
  background(0);

  stroke('white');
  strokeWeight(7);

  for (var i = 0; i < 25; i++){ 
    line(width/25*i, 0, width/25*i, height)
  }

  for (var i = 0; i < 25; i++){ 
    line(0, height/25*i, width, height/25*i)
  }

}