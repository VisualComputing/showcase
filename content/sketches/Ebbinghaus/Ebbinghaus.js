// posición del círculo
let x1, y1, flag, radio, button, a;


function setup() {
  createCanvas(400, 400);
  // empieza en el centro
  x1 = 150;
  y1 = 150;
  z2 = 70
  z3 = 70
  z4 = 70
  z5 = 70
  z6 = 70
  z7 = 70
  flag = 1;
  radio = 80
 
  button = createButton('click me');
  button.position(0, 0);
  button.mousePressed(drawline);

}

function draw() {
  background(0);

  // dibujar el círculo fijo
  stroke(50);
  fill(100);
  ellipse(x1, y1, 24);
  if (flag == 1){
    x1 = x1 - 1;
    y1 = y1 - 1;
    radio = radio + 0.4
  }else{
    x1 = x1 + 1;
    y1 = y1 + 1;
    radio = radio - 0.4
  }
 
  x2 = radio+x1 - 1;
  y2 = y1 - 1;
  x2,y2,z2 = circulos(x2,y2,z2,1,0)
 
  x3 = -radio+x1 - 1;
  y3 = y1 - 1;
  x3,y3,z3 = circulos(x3,y3,z3,-1,0)
 
  x4 = 0.5*radio+x1 - 1;
  y4 = 0.86*radio+y1 - 1;
  x4,y4,z4 = circulos(x4,y4,z4,0.5,0.86)

  x5 = -0.5*radio+x1 - 1;
  y5 = 0.86*radio+y1 - 1;
  x5,y5,z5 = circulos(x5,y5,z5,-0.5,0.86)
 
  x6 = 0.5*radio+x1 - 1;
  y6 = -0.86*radio+y1 - 1;
  x6,y6,z6 = circulos(x6,y6,z6,0.5,-0.86)
 
  x7 = -0.5*radio+x1 - 1;
  y7 = -0.86*radio+y1 - 1;
  x7,y7,z7 = circulos(x7,y7,z7,-0.5,-0.86)
 
  if (a==1){
    stroke(0,0,255);
    line(17, 0, 417, 400);

    stroke(0,0,255);
    line(0, 17, 400, 417);
  }
 
  if (y1 < 150) {
    flag = 0;
  }
  if (x1 > 300) {
    flag = 1;
  }
}
function circulos(x, y ,z , rx,ry){
  stroke(50);
  fill(100,255,0);
  ellipse(x, y, z);
  if (flag == 1){
    x = (rx*radio)+x1 - 1;
    y = (ry*radio)+y1 - 1;
    z = z + 0.4;
  }else{
    x = (rx*radio)+x1 + 1;
    y = (ry*radio)+y1 + 1;
    z = z - 0.4;
  }
  return (x,y,z);
}
function drawline(){
    if (a==1){
      a=0
    }else{
      a=1
    }
  }