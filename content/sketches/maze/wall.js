class Wall {

    constructor(originX,originY,originZ,width,height,depth, fillColor){
      this.fillColor = fillColor
      this.origin = createVector(originX,originY,originZ)
      this.width = width
      this.height = height
      this.depth = depth
      this.wallMax = createVector(originX+ width/2, originY+ height/2, originZ+ depth/2)
      this.wallMin = createVector(originX-width/2, originY-height/2, originZ - depth/2)    
    }
    
    
    draw(fbo){
      fbo.push()
        //fbo.line(this.wallMin.x,this.wallMin.y,this.wallMin.z,this.wallMax.x,this.wallMax.y,this.wallMax.z)
        fbo.fill(this.fillColor)
        fbo.translate(this.origin.x,this.origin.y,this.origin.z)
        fbo.box(this.width, this.height,this.depth)
      fbo.pop()
    };
    closestPointSphere(B) {
      // get box closest point to sphere center by clamping
      const x = Math.max(this.wallMin.x, Math.min(B.spherePosition.x, this.wallMax.x));
      const y = Math.max(this.wallMin.y, Math.min(B.spherePosition.y, this.wallMax.y));
      const z = Math.max(this.wallMin.z, Math.min(B.spherePosition.z, this.wallMax.z));
    
      // this is the same as isPointInsidespherePosition
      return createVector(x,y,z);
  }
  isPointInside(point) {
    return (
      point.x >= this.wallMin.x &&
      point.x <= this.wallMax.x &&
      point.y >= this.wallMin.y &&
      point.y <= this.wallMax.y &&
      point.z >= this.wallMin.z &&
      point.z <= this.wallMax.z
    );
  }
    collisionWithSphere(B){
      let cPoint = this.closestPointSphere(B)
      const distance = Math.sqrt(
        (cPoint.x - B.spherePosition.x) * (cPoint.x - B.spherePosition.x) +
          (cPoint.y - B.spherePosition.y) * (cPoint.y - B.spherePosition.y) +
          (cPoint.z - B.spherePosition.z) * (cPoint.z - B.spherePosition.z)
      ); 
      let sine = sqrt(1-sq(B.acceleration.z));
      let cPointBouncing = undefined
      if(distance<B.sphereRadius){
        
        let cPointM = getVectorModule(cPoint)
        let cPointDir = createVector(cPoint.x/cPointM,cPoint.y/cPointM,cPoint.z/cPointM)
        cPointBouncing  = createVector(sine*cPointDir.x,-sine*cPointDir.y,cPointDir.z)
        //ajustar
        let testVec = createVector(cPointBouncing.x +cPoint.x,cPointBouncing.y +cPoint.y, cPointBouncing.z +cPoint.z)
        if(this.isPointInside(testVec)){
          cPointBouncing  = createVector(-sine*cPointDir.x,sine*cPointDir.y,cPointDir.z) 
        }
        
      }
      
      return cPointBouncing
    }

  }