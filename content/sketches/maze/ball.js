function Ball(P){
    this.sphereMoveVector = createVector(0,0,0);
    this.acceleration = createVector(0,0,0)
    this.sphereRadius = 7;
    this.spherePosition = createVector(92.5-38*4.5,38*-1,this.sphereRadius);
   
    this.minVertex = createVector(-P.planeSize.x/2,-P.planeSize.y/2,0);
    this.maxVertex = createVector(P.planeSize.x/2,P.planeSize.y/2,0);
   
    this.draw = function(fbo){
      fbo.push();
        fbo.fill("rgb(0, 0, 0)");
        fbo1.noStroke();
        fbo.translate(this.spherePosition);
        fbo.sphere(this.sphereRadius)
      fbo.pop()
    }
    this.move = function(P, acceleration, factorAcc, isAcelerate){
      
      if(P.planeRotateV.x != 0 || P.planeRotateV.y != 0){
        if(isAcelerate){
          this.sphereMoveVector.x = (acceleration.x*factorAcc)*isAcelerate;
          this.sphereMoveVector.y = (acceleration.y*factorAcc)*isAcelerate;
       
          this.spherePosition.x = (this.sphereMoveVector.x*factorAcc) + this.spherePosition.x
          this.spherePosition.y = (this.sphereMoveVector.y*factorAcc) + this.spherePosition.y;
        }
        else{
        this.sphereMoveVector.x = (acceleration.x*factorAcc) + this.sphereMoveVector.x;
        this.sphereMoveVector.y = (acceleration.y*factorAcc) + this.sphereMoveVector.y;
        this.spherePosition.x = (this.sphereMoveVector.x*factorAcc) + this.spherePosition.x
        this.spherePosition.y = (this.sphereMoveVector.y*factorAcc) + this.spherePosition.y;
        }
     
      }else if(P.planeRotateV.x == 0 && P.planeRotateV.y == 0){
        this.sphereMoveVector = createVector(0,0,0);
        this.acceleration = createVector(0,0,0);
      }
      // if(P.planeRotateV.x != 0 || P.planeRotateV.y != 0){
    //     B.sphereMoveVector.x = (B.acceleration.x*0.1) + B.sphereMoveVector.x;
    //     B.sphereMoveVector.y = (B.acceleration.y*0.1) + B.sphereMoveVector.y;
     
    //     B.spherePosition.x = (B.sphereMoveVector.x*0.1) + B.spherePosition.x
    //     B.spherePosition.y = (B.sphereMoveVector.y*0.1) + B.spherePosition.y;
     
    //   }else if(P.planeRotateV.x == 0 && P.planeRotateV.y == 0){
    //     B.sphereMoveVector = createVector(0,0,0);
    //     B.acceleration = createVector(0,0,0);
    //   }
    }
  }