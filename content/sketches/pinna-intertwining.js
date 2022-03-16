new p5((p) => {
  
  var xsize = 450;
  var ysize = 450;
  var xcc = ycc = xsize/2;

  let gaSlider;
  let sepSlider;
  
  p.setup = function () {
    p.createCanvas(xsize, ysize+100);

    gaSlider = p.createSlider(0,Math.PI/6, Math.PI/12, Math.PI/192);
    gaSlider.position(50,ysize+310);
    gaSlider.size(xsize-100);

    sepSlider = p.createSlider(0.17, 0.24, 0.20, 0.005);
    sepSlider.position(50,ysize+350);
    sepSlider.size(xsize-100);
  };

  p.draw = function () {
    p.background(255,0,0);
    p.fill(52,58,64);
    p.strokeWeight(0);
    p.rect(0,ysize,xsize,100);
    p.noFill();
    p.strokeWeight(2.5);

    let gaSl = gaSlider.value();
    let sep = sepSlider.value();

    const nc = [14, 24, 34, 46];
    const rc = [(0.9-3*sep)*xsize/2, (0.9-2*sep)*xsize/2, (0.9-sep)*xsize/2, 0.9*xsize/2];

    var sqw = 17;

    for(var nn=0; nn<4; nn++){

      var al = Math.atan(sqw/2/rc[nn]);
      var be = Math.atan(sqw/2/(rc[nn]+sqw));
      var th = 2*Math.PI/nc[nn];
      
      var rp = sqw/2/Math.sin(al);
      var rq = sqw/2/Math.sin(be);

      //p.circle(xcc,ycc,2*rc[nn]);

      var ic=0;

      for (var ti=th*nn; ti<2*Math.PI+th*nn; ti+=th, ic++){

        var sqcx = xcc+rc[nn]*Math.cos(ti); var sqcy = ycc+rc[nn]*Math.sin(ti);
  
        var psx = [xcc+rp*Math.cos(ti-al),  xcc+rp*Math.cos(ti+al), xcc+rq*Math.cos(ti+be), xcc+rq*Math.cos(ti-be)];
        var psy = [ycc+rp*Math.sin(ti-al),  ycc+rp*Math.sin(ti+al), ycc+rq*Math.sin(ti+be), ycc+rq*Math.sin(ti-be)];
        
        var psxp = psx;
        var psyp = psy;
        
        var psxp = [];
        var psyp = [];
  
        const ga = (nn%2 ? 1:-1)*gaSl;
  
        for (var i=0; i<4; i++){
          psxp[i] = (psx[i] - sqcx)*Math.cos(ga)-(psy[i] - sqcy)*Math.sin(ga)+sqcx;
          psyp[i] = (psx[i] - sqcx)*Math.sin(ga)+(psy[i] - sqcy)*Math.cos(ga)+sqcy;
        }
        
        p.stroke((ic%2 ? 0:255),(ic%2 ? 0:255),0);
        
        p.line(psxp[0], psyp[0], psxp[1], psyp[1]);
        
        p.line(psxp[1], psyp[1], psxp[2], psyp[2]);
        
        p.line(psxp[2], psyp[2], psxp[3], psyp[3]);
        
        p.line(psxp[3], psyp[3], psxp[0], psyp[0]);
        
      }
    }
  };
}, "pinna-intertwining")
