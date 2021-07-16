p5 `div` shortcodes embed [p5.js](https://p5js.org/) code within an [div](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/div). There are two p5 `div` shortcodes: [p5-div](#p5-div) and [p5-instance-div](#p5-instance-div).

# p5-div

```html
{{</* p5-div ver="1.4.0" sketch="/path/to/sketch.js" lib1="https://cdntolib1/lib1.js" */>}}
```

All parameters are optional but `sketch`. Default values are shown in the above snippet but for `libs*`. Up to `lib5` libs may be specified.

For example:

```html
{{</* p5-div sketch="/hugo-vc/sketches/scintillating.js" */>}}
```

outputs:

{{< p5-div sketch="/hugo-vc/sketches/scintillating.js" >}}

# p5-instance-div

```html
{{</* p5-instance-div id="sketchid" ver="1.4.0" lib1="https://cdntolib1/lib1.js" >}}
  // inline sketch code
  }
{{< p5-instance-div */>}}

{{< hint warning >}}
Note that the inline `sketch` should be coded in [p5 instance mode](https://github.com/processing/p5.js/wiki/Global-and-instance-mode) syntax.
{{< /hint >}}
```

All parameters are optional but `id`. Default values are shown in the above snippet but for `libs*`. Up to `lib5` libs may be specified.

For example:

```js
{{</* p5-instance-div id="lilac-chaser" >}}
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
  
{{< p5-instance-div */>}}
```

{{< hint warning >}}
Note that `p5` should be the name to be used for the sketch object variable.
{{< /hint >}}

outputs:

{{< p5-instance-div id="lilac-chaser" >}}
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