# p5-instance

p5 helps add [p5 sketches](https://p5js.org/) into your book.

```html
{{</* p5-div ver="1.4.0" sketch="/path/to/sketch.js" lib1="https://cdntolib1/lib1.js" width="800" height="600" */>}}
```

All parameters are optional but `sketch`. Up to `lib5` libs may be specified.

# Examples

## Instance mode within div element

```html
{{</* p5-div sketch="/hugo-vc/sketches/colors.js" */>}}
```

Produces:

{{< p5-div sketch="/hugo-vc/sketches/colors.js" >}}

## Instance mode simple sketch

```html
{{</* p5-div sketch="/hugo-vc/sketches/scintillating.js" */>}}
```

Produces:

{{< p5-div sketch="/hugo-vc/sketches/scintillating.js" >}}

## Stroboscopic motion inner example

```html
{{</* p5-instance-div id="strobo" >}}
  // JS code
  //...
{{< p5-instance-div */>}}
```

Produces:

{{< p5-instance-div id="strobo" >}}
  let flag;

  p5.setup = function () {
    p5.createCanvas(600, 600);
  };

  p5.draw = function () {
    p5.background(192, 192, 192);
    p5.frameRate(2);
    stroboscopicMotion();
  };

  function stroboscopicMotion() {
    p5.strokeWeight(100);
    p5.stroke(0, 255, 255);
    if (flag) {
      p5.point(150, 150);
      p5.point(450, 450);
    } else {
      p5.point(450, 150);
      p5.point(150, 450);
    }
    flag = !flag;
  }
{{< /p5-instance-div >}}

## Lilac chaser

{{< p5-instance-div id="lilac" >}}
  p5.setup = function() {
    p5.createCanvas(400, 400);
    p5.frameRate(7);
  };

  function drawBlurCircles(x, y, r) {
    p5.push();
    //console.log(1);
    p5.noStroke();
    var opc = 0.4;
    var step = 3.0/r;

    for (var i = r; i > 0; i-=1.5) {
      if (opc < 5) {
        opc += step;
        p5.fill(255, 20, 180, opc);
        //console.log(step,r);
      }
      //console.log(4);
      p5.ellipse(x, y, i, i);
    }
    p5.pop();
  };

  var jump = 0;
  var count = 0;
  p5.draw = function() {
    p5.background(200);
    var numCircles = 12;
    var stepAngle = 360.0/numCircles;
    p5.push();
    p5.translate(p5.width/2.0, p5.height/2.0);
    for (var i = 0; i < 360; i = i + stepAngle) {
      //console.log(stepAngle, i, jump);
      if (i != jump) {
        p5.push();
        p5.rotate(p5.radians(i));
        drawBlurCircles(120, 0, 60);
        p5.pop();
      }
    }
    if( !p5.mouseIsPressed ) {
      jump = (jump + stepAngle)%360;
    }
    p5.push();
    p5.strokeWeight(1.5);
    p5.line(-7, 0, 7, 0);
    p5.line(0, -7, 0, 7);
    p5.pop();
    p5.pop();
  }
{{< /p5-instance-div >}}