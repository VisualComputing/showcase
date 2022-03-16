new p5((p) => {
  
  var x = y = 400;
  var xc = yc = x/2;
  
  p.setup = function () {
    p.createCanvas(x, y);
  };

  p.draw = function () {
    p.background(180);
    p.fill(0);
    p.stroke(0);
    p.circle(xc,yc,5);
    p.noFill();
    p.strokeWeight(2.5);
    
    var r1 = 0.62*x/2;
    var r2 = 0.80*x/2;
    
    //p.circle(xc,yc,2*r1);
    //p.circle(xc,yc,2*r2);
    
    var nc1 = 28;
    var nc2 = 40;
    
    var sqw = 18;
    
    var al = Math.atan(sqw/r1);
    var be = Math.atan(sqw/(r1+sqw));
    var th = 2*Math.PI/nc1;
    
    var rp = sqw/Math.sin(al);
    var rq = sqw/Math.sin(be);
    
    for (var ti=th; ti<=2*Math.PI; ti+=th){
      var psx = [xc+(r1+sqw)*Math.cos(ti),  xc+r1*Math.cos(ti), xc+rp*Math.cos(ti+al), xc+rq*Math.cos(ti+be)];
      
      var psy = [yc+(r1+sqw)*Math.sin(ti),  yc+r1*Math.sin(ti), yc+rp*Math.sin(ti+al), yc+rq*Math.sin(ti+be)];
      
      
      p.stroke(220);
      
      p.line(psx[0], psy[0], psx[1], psy[1]);

      p.stroke(110);
      
      p.line(psx[1], psy[1], psx[2], psy[2]);
      
      p.line(psx[2], psy[2], psx[3], psy[3]);

      p.stroke(220);
      
      p.line(psx[3], psy[3], psx[0], psy[0]);
      
    }
    
    al = Math.atan(sqw/r2);
    be = Math.atan(sqw/(r2+sqw));
    th = 2*Math.PI/nc2;
    
    rp = sqw/Math.sin(al);
    rq = sqw/Math.sin(be);
    
    for (var ti=th; ti<=2*Math.PI; ti+=th){
      var psx = [xc+(r2+sqw)*Math.cos(ti),  xc+r2*Math.cos(ti), xc+rp*Math.cos(ti+al), xc+rq*Math.cos(ti+be)];
      
      var psy = [yc+(r2+sqw)*Math.sin(ti),  yc+r2*Math.sin(ti), yc+rp*Math.sin(ti+al), yc+rq*Math.sin(ti+be)];
      
      p.stroke(110);
      
      p.line(psx[0], psy[0], psx[1], psy[1]);
      
      p.line(psx[1], psy[1], psx[2], psy[2]);
      
      p.stroke(220);
      
      p.line(psx[2], psy[2], psx[3], psy[3]);
      
      p.line(psx[3], psy[3], psx[0], psy[0]);
      
    }
  };
}, "pinna-inverted")
