//---------------------------------------------

//SETUP
function setup() { 
    createCanvas(400, 400);
  } 
  
  //---------------------------------------------
  
  
  
  //---------------------------------------------
  
  //DRAW FUNCTIONS. TRAPEZOIDS CENTERED AT (X,Y)
  
  function horizontal_trapezoid(x,y){
    fill(0);
    quad(x-15, y-2, //izq sup
         x+10, y-2, // der sup
         x+15, y+2, // der inf
         x-10, y+2);// izq inf
  }
  
  function vertical_trapezoid(x,y){
    fill(0);
    quad(x-2, y+10, //izq sup
         x+2, y+15, // der sup
         x+2, y-10, // der inf
         x-2, y-15);// izq inf
  }
  
  //---------------------------------------------
  
  
  
  function draw() { 
    
    background(255); //WHITE BACKGROUND
    fill(0);
  
    strokeWeight(10); // not thin lines
    
    
  //---------------------------------------------
    
    //HORIZONTAL TRAPEZOIDS
    
    var print = 0
    for (var y = 0; y<=width; y += 40) {
      for (var x = 0; x <= height; x+=40) {
        print += 1
        if (print%4==0){
          horizontal_trapezoid(x, y);
        }
      }
    }
    
  //---------------------------------------------
    
    
    
  //---------------------------------------------
    
    //VERTICAL TRAPEZOIDS
    
    var print = 1
    for (var y = 40; y<=width; y += 40) {
      for (var x = 0; x <= height; x+=40) {
        print += 1
        if (print%4==0){
          vertical_trapezoid(x, y);
        }
      }
    }
    
  //---------------------------------------------
    
    
    
  //---------------------------------------------
    
    //PARALLEL DIAGONAL LINES
    
    var a = 50;
    for (var x = 40; x<=width; x += 80) {
      for (var y = 0; y <= height; y+=80) {
        line(x+a, y+a, x-a, y-a);
    
      }
    }
  //---------------------------------------------
  
  
  }
  
  function horizontal_trapezoid(x,y){
    fill(0);
    quad(x-15, y-2, //izq sup
         x+10, y-2, // der sup
         x+15, y+2, // der inf
         x-10, y+2);// izq inf
  }
  
  function vertical_trapezoid(x,y){
    fill(0);
    quad(x-2, y+10, //izq sup
         x+2, y+15, // der sup
         x+2, y-10, // der inf
         x-2, y-15);// izq inf
  }
  
  //---------------------------------------------
  
  
  
  function draw() { 
    
    background(255); //WHITE BACKGROUND
    fill(0);
  
    strokeWeight(10); // not thin lines
    
    
  //---------------------------------------------
    
    //HORIZONTAL TRAPEZOIDS
    
    var print = 0
    for (var y = 0; y<=width; y += 40) {
      for (var x = 0; x <= height; x+=40) {
        print += 1
        if (print%4==0){
          horizontal_trapezoid(x, y);
        }
      }
    }
    
  //---------------------------------------------
    
    
    
  //---------------------------------------------
    
    //VERTICAL TRAPEZOIDS
    
    var print = 1
    for (var y = 40; y<=width; y += 40) {
      for (var x = 0; x <= height; x+=40) {
        print += 1
        if (print%4==0){
          vertical_trapezoid(x, y);
        }
      }
    }
    
  //---------------------------------------------
    
    
    
  //---------------------------------------------
    
    //PARALLEL DIAGONAL LINES
    
    var a = 50;
    for (var x = 40; x<=width; x += 80) {
      for (var y = 0; y <= height; y+=80) {
        line(x+a, y+a, x-a, y-a);
    
      }
    }
  //---------------------------------------------
  
  
  }