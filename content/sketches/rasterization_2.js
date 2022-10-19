let n1 = 500;
let n2 = 420;
let n3 = 258;
let n4 = 420;
let n5 = 486;
let n6 = 275;
let space = 20;
var p1, p2, p3, p4;
let puntos;
let x,y;
let beads;
let beadSize = 20;
let cols, rows;
let num;

function setup() {
  createCanvas(621, 621)
  cols = ceil(621 / beadSize);
  rows = ceil(621 / beadSize);
  beads = new Array(cols);
  for (let x = 0; x < cols; x++){
    beads[x] = new Array(rows).fill(false);
  }
  organizeTriangle();
  clasifyTriangle();
}

function draw() {
  background(0,0,40);
  drawGrid();
  paint(num);
  line(puntos[0].x, puntos[0].y, puntos[1].x,   puntos[1].y);
  line(puntos[0].x, puntos[0].y, puntos[2].x, puntos[2].y);
  line(puntos[2].x, puntos[2].y, puntos[1].x, puntos[1].y);
  stroke("red");
  
}

function drawBeads(columnainicial, columnafinal,filas){
  let filasm = filas + 1;
  let columnainicialm = columnainicial - 4;
  push();
  noStroke();
  //fill(0);
  fill(0, 179, 255);
  for (let i = columnainicialm; i <= columnafinal; i++){
      for (let j = filas; j < filasm; j++){
        square(i * beadSize, j * beadSize, beadSize);
      }

  }
  pop();
}

function drawGrid(){
  push();
  stroke(200);
  for (let x = 0; x < 621; x+= beadSize){
    line(x, 0, x, 621);
  }
  
  for (let y = 0; y < 621; y+= beadSize){
    line(0, y, 621, y);
  }
  pop();
}


function organizeTriangle(){
  p1= {
    x: n1,
    y: n2
  };
  p2 = {
    x: n3,
    y: n4
  };
  p3 = {
    x: n5,
    y: n6
  }
  puntos = [p1, p2, p3];

  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 2; j++){
      if(puntos[i].y > puntos[j+1].y ){
        let punto = puntos[i];
        puntos[i] = puntos[j + 1];
        puntos[j + 1 ] = punto;
      }
    }
  }

  if(puntos[0].y == puntos[1].y){
    if(puntos[0].x > puntos[1].x){
      let punto = puntos[0];
      puntos[0] = puntos[1];
      puntos[1] = punto;
    }
  }

}

function clasifyTriangle(){
  if (puntos[1].y == puntos[2].y) {
    num = 1;
  } else if (puntos[0].y == puntos[1].y) {
    num = 2;
    } else {
      num = 3;
      x = (int) (puntos[0].x + ((puntos[1].y - puntos[0].y) / (puntos[2].y - puntos[0].y)) * (puntos[2].x - puntos[0].x));
    y = (int) (puntos[1].y);
      
    p4 = {
      x: x,
      y: y
    }

    //scanBottomFlatTriangle(puntos[0], puntos[1], p4);
    //scanTopFlatTriangle(p4, puntos[1], puntos[2]);

    }
}

function scanTopFlatTriangle(pa, pb, pc){

    let invslope1 = (pc.x - pa.x) / (pc.y - pa.y);
    let invslope2 = (pc.x - pb.x) / (pc.y - pb.y);

    let curx1 = pc.x;
    let curx2 = pc.x;
    
    for (var scanlineY = pc.y; scanlineY < pa.y;scanlineY--) {
      scanLine(curx1, curx2, scanlineY);
      curx1 -= invslope1;
      curx2 -= invslope2;
    }
}

function scanBottomFlatTriangle(pa, pb, pc){
    let invslope1 = parseInt((pb.x - pa.x) / (pb.y - pa.y));
    let invslope2 = parseInt((pc.x - pa.x) / (pc.y - pa.y));

    let curx1 = pa.x;
    let curx2 = pa.x;
  
    for (var scanlineY = pa.y; scanlineY <= pb.y;scanlineY++) {
      scanLine(curx1, curx2, scanlineY);
      curx1 += invslope1;
      curx2 += invslope2;
    }
}
function scanLine(curx1, curx2, scanlineY){
  curx1 = parseInt(curx1/ beadSize);
  curx2 = parseInt(curx2 / beadSize);
  scanlineY = parseInt(scanlineY / beadSize);
  console.log(curx1);
  console.log(curx2);
  console.log(scanlineY);
  drawBeads(curx1, curx2,scanlineY);
}

function paint(num){
  if(num == 1){
    scanBottomFlatTriangle(puntos[0], puntos[1], puntos[2]);
  }else{
    if(num == 2){
      scanTopFlatTriangle(puntos[0], puntos[1], puntos[2]);
    }
  }
}