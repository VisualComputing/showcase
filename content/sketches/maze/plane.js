function Plane(){
    this.planeMaxMagR = 25;
    this.planeColor = "rgb(255, 247, 233)";
    this.planeMagnitudeR = 0;
    
    this.planeRotateV = createVector(1,0,0);
    this.planeSize = createVector(200,200,0); //ancho y alto
    this.planePosition = createVector(0,0,0);
    
    this.draw = function(fbo){
      
        fbo.fill(this.planeColor);
        fbo.translate(this.planePosition);
        fbo.plane(this.planeSize.x,this.planeSize.y)
      
    };
  }