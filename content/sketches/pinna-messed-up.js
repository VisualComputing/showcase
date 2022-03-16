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
    
    var r1 = 0.60*x/2;
    var r2 = 0.82*x/2;
    
    //p.circle(xc,yc,2*r1);
    //p.circle(xc,yc,2*r2);
    
    var nc1 = 24;
    var nc2 = 28;
    
    var sqw = 18;
    
    var al = Math.atan(sqw/r1);
    var be = Math.atan(sqw/(r1+sqw));
    var th = 2*Math.PI/nc1;
    
    var rp = sqw/Math.sin(al);
    var rq = sqw/Math.sin(be);
    
    for (var ti=th; ti<=2*Math.PI; ti+=th){

      if (Math.random()<0.1) continue;

      var sqcx = xc+r1*Math.cos(ti)+Math.random()*xc/10-xc/5; var sqcy = yc+r1*Math.sin(ti)+Math.random()*xc/5-xc/10;

      var psx = [xc+(r1+sqw)*Math.cos(ti),  xc+r1*Math.cos(ti), xc+rp*Math.cos(ti+al), xc+rq*Math.cos(ti+be)];
      
      var psy = [yc+(r1+sqw)*Math.sin(ti),  yc+r1*Math.sin(ti), yc+rp*Math.sin(ti+al), yc+rq*Math.sin(ti+be)];

      var psxp = [];
      var psyp = [];

      const ga = Math.random()*(Math.PI/6) - Math.PI/12;

      for (var i=0; i<4; i++) {
        psxp[i] = (psx[i] - sqcx)*Math.cos(ga)-(psy[i] - sqcy)*Math.sin(ga)+sqcx;
        psyp[i] = (psx[i] - sqcx)*Math.sin(ga)+(psy[i] - sqcy)*Math.cos(ga)+sqcy;
      }
      
      p.stroke(220);
      
      p.line(psxp[0], psyp[0], psxp[1], psyp[1]);

      p.stroke(110);
      
      p.line(psxp[1], psyp[1], psxp[2], psyp[2]);
      
      p.line(psxp[2], psyp[2], psxp[3], psyp[3]);

      p.stroke(220);
      
      p.line(psxp[3], psyp[3], psxp[0], psyp[0]);
      
    }
    
    al = Math.atan(sqw/r2);
    be = Math.atan(sqw/(r2+sqw));
    th = 2*Math.PI/nc2;
    
    rp = sqw/Math.sin(al);
    rq = sqw/Math.sin(be);
    
    for (var ti=th; ti<=2*Math.PI; ti+=th){

      if (Math.random()<0.1) continue;

      var sqcx = xc+r2*Math.cos(ti); var sqcy = yc+r2*Math.sin(ti);

      var psx = [xc+(r2+sqw)*Math.cos(ti),  xc+r2*Math.cos(ti), xc+rp*Math.cos(ti+al), xc+rq*Math.cos(ti+be)];
      
      var psy = [yc+(r2+sqw)*Math.sin(ti),  yc+r2*Math.sin(ti), yc+rp*Math.sin(ti+al), yc+rq*Math.sin(ti+be)];

      var psxp = [];
      var psyp = [];

      const ga = Math.random()*(Math.PI/6) - Math.PI/12;

      for (var i=0; i<4; i++) {
        psxp[i] = (psx[i] - sqcx)*Math.cos(ga)-(psy[i] - sqcy)*Math.sin(ga)+sqcx;
        psyp[i] = (psx[i] - sqcx)*Math.sin(ga)+(psy[i] - sqcy)*Math.cos(ga)+sqcy;
      }
      
      p.stroke(110);
      
      p.line(psxp[0], psyp[0], psxp[1], psyp[1]);
      
      p.line(psxp[1], psyp[1], psxp[2], psyp[2]);

      p.stroke(220);
      
      p.line(psxp[2], psyp[2], psxp[3], psyp[3]);
      
      p.line(psxp[3], psyp[3], psxp[0], psyp[0]);
      
    }

    noLoop();
  };
}, "pinna-messed-up")
