let angle = 0;
let speed = 0.05;
let circleColor = true;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  angle += speed;
  strokeWeight(1)
  circle(200,200,400);
  cirrcle(375)
}

function cirrcle(size){
  fill(255,255,0)
  if(circleColor){
    fill(0,0,255)  
  }
  circleColor = !circleColor
  
  if(size>100){
    translate(p5.Vector.fromAngle(millis() / 1000, 12.5));
    strokeWeight(0)
    circle(200,200, size);
    cirrcle(size-25)
  }else if(size>0){
    translate(p5.Vector.fromAngle(millis() / 1000, -12.5));
    circle(200,200, size);   
    cirrcle(size-25) 
  }
  return 
}