new p5((p) => {
  p.setup = function() {
      p.createCanvas(400, 400);
  };
  
  p.draw = function() {
      p.background(0);
      for (let i = 50; i < p.height; i += 50) {
          for (let j = 50; j < p.width; j += 50) { 
              p.stroke(255)
              p.strokeWeight(10)
              p.line(0, i, p.width, i)
              p.line(j, 0, j, p.height)
          }
      }
  
      for (let i = 50; i < p.width; i += 50) {
          for (let j = 50; j < p.height; j += 50) {
              p.noStroke()
              p.fill(255)
              p.ellipse(i, j, 18, 18)
          }
      }

      noLoop();
  };
}, "hermann")
