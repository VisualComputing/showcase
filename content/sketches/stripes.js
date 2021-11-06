function setup() {
    createCanvas(1000, 1000);
    smooth();
    rectMode(CORNERS);
  }
  
  
  function draw() {
    background(64);
  
    var step = 100;
  
    var dir = true;
  
    for (var x = 0; x <= width; x+= step*2) { 
      fill(128+64);
      rect(x,0,x+100,height);
    }
    
    for (var y = 0; y <= width; y+= step*2) { 
      fill(128);
      rect(0,y,width,y+100);
    }
  
    var y2 = 0;
    for (var y = 0; y <=width; y+=step) {
      y2++;
      dir = (floor(y2/2) % 2 == 0) ? true : false;
      for (var x = 0; x <=width; x+=step) {
        shep(16, dir, x, y);
        dir = !dir;
      }
    }
  }
  
  
  function shep( s,  up,  x,  y) {
  
    noStroke();
    push();
  
    translate(x, y);
    
    var rotate1 = PI/4.00*(sin((PI/2)*cos(frameCount/30.0)));
  
    if (up) {
      rotate(rotate1);
    } else {
      rotate(rotate1*-1);
    }
  
    fill(255);
    rect(-s, -s, s, s);
  
    fill(0);
    rect(-s, -s, 0, 0);
    rect(0, 0, s, s);
    pop();
  }