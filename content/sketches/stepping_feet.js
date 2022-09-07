var canvasWidth = 600;
var canvasHeight = 400;

var quantity = 2;
var speed = 1;

var positionXBar1 = 0;
var positionYBar1 = canvasHeight / 3;
var positionYBar2 = (2*canvasHeight) / 3;
var widthBar = 80;
var heightBar = 40;
var colorBar1 = 'yellow';
var colorBar2 = 'blue';
var moveBarRight = true;
var isMove = true;
var contrast = true;

var sliderSpeed;

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  background('white');
  drawLayout();
}

function draw() {
  if(contrast){
    drawBoard();
  }else{
    background(220);
  }
  updateSpeed();
  drawBar1();
  drawBar2();
}

function drawBoard(){
  let position;
  
  quantity = sliderQuantity.value();

  let realLines = (canvasWidth / widthBar) * quantity;
  let widthLine = widthBar / quantity;
  let numberLines = realLines % 2 == 0 ? realLines + 1 : realLines;

  for (let i = 0; i < numberLines; i++) {
    position = i * widthLine;
    if (i % 2 == 0) {
      fill('black');
      rect(position, 0, widthLine, canvasHeight);
    } else {
      strokeWeight(0)
      fill('white');
      rect(position, 0, widthLine, canvasHeight);
    }
  }
}

function drawBar1(){
  fill(colorBar1);
  rect(positionXBar1, positionYBar1, widthBar, heightBar);
  if (moveBarRight) {
    positionXBar1 += speed;
    if (positionXBar1 + widthBar > canvasWidth) {
      moveBarRight = false;
    }
  } else {
    positionXBar1 -= speed;
    if (positionXBar1 <= 0) {
      moveBarRight = true;
    }
  }
}

function drawBar2() {
    fill(colorBar2);
    rect(positionXBar1, positionYBar2, widthBar, heightBar);
    if (moveBarRight) {
      positionXBar1 += speed;
      if (positionXBar1 + widthBar > canvasWidth) {
        moveBarRight = false;
      }
    } else {
      positionXBar1 -= speed;
      if (positionXBar1 <= 0) {
        moveBarRight = true;
      }
    }
  }

  function updateSpeed() {
    if (isMove) {
        speed = sliderSpeed.value();
    }
  }

function drawLayout() {
    //Reset button
    button = createButton('Reset');   
    button.position(40, 440);
    button.mousePressed(() => {
        canvasWidth = 600;
        canvasHeight = 400;
        quantity = 2;
        speed = 1;
        positionXBar1 = 0;
        positionYBar1 = canvasHeight / 3;
        positionXBar2 = 0;
        positionYBar2 = (2*canvasHeight) / 3;
        widthBar = 80;
        heightBar = 40;
        moveBarRight = true;
    });

    //Move checkbox
    checkbox = createCheckbox('Move', isMove); 
    checkbox.position(40, 470);
    checkbox.mousePressed(() => {
        if (speed === 0) {
            isMove = true;
            speed = sliderSpeed.value();
        } else {
            isMove = false;
            speed = 0;
        }
    });

    //Slider speed
    sliderSpeed = createSlider(1, 10, 1);
    sliderSpeed.position(40, 500);
    sliderSpeed.style('width', '80px');
    
    //Slider quantity
    sliderQuantity = createSlider(1, 10, 1);
    sliderQuantity.position(40, 540);
    sliderQuantity.style('width', '80px');
    
    //Change color
    sel = createSelect();
    sel.position(40, 580);
    sel.option('blue-yellow');
    sel.option('red-green');
    sel.option('grey');
    sel.selected('kiwi');
    sel.changed((value) => {
        switch(value.target.value) {
            case 'blue-yellow':
                colorBar1 = 'yellow'
                colorBar2 = 'blue'
                break;
            case 'red-green':
                colorBar1 = 'green'
                colorBar2 = 'red'
                break;
            case 'grey':
                colorBar1 = 'white'
                colorBar2 = 'black'
                break;
        }
    });
    
    // Bye Contrast button
    button = createButton('Bye contrast');   
    button.position(150, 440);
    button.mousePressed(() => {
      contrast = false;
    });

    // Hi Contrast button
    button = createButton('Hi contrast');   
    button.position(150, 470);
    button.mousePressed(() => {
      contrast = true;
    });

}