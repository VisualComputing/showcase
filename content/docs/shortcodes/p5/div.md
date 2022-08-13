p5 `div` [shortcodes](https://gohugo.io/content-management/shortcodes/) embed [p5.js](https://p5js.org/) code within a [div element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/div). There are two p5 `div` shortcodes: [p5-div](#p5-div) and [p5-instance-div](#p5-instance-div).

# p5-div

```html
{{</* p5-div ver="1.4.2" sketch="/path/to/sketch.js" lib1="https://cdntolib1/lib1.js" */>}}
```

All parameters are optional but `sketch`. Default values are shown in the above snippet but for `libs*`. Up to `lib5` libs may be specified.

## Scintillating grid

Look at [this](https://mathworld.wolfram.com/ScintillatingGridIllusion.html) and also [this](https://www.illusionsindex.org/i/scintillating-grid) among many more references there are.

{{< details title="p5-div markdown" open=false >}}
{{< highlight html >}}
{{</* p5-div sketch="/showcase/sketches/scintillating.js" */>}}
{{< /highlight >}}
{{< /details >}}

{{< p5-div sketch="/showcase/sketches/scintillating.js" >}}

# p5-instance-div

```html
{{</* p5-instance-div id="sketchid" ver="1.4.2" lib1="https://cdntolib1/lib1.js" >}}
  // inline sketch code
{{< /p5-instance-div */>}}
```

{{< hint warning >}}
Note that the inline `sketch` should be coded in [p5 instance mode](https://github.com/processing/p5.js/wiki/Global-and-instance-mode) syntax.
{{< /hint >}}

All parameters are optional but `id`. Default values are shown in the above snippet but for `libs*`. Up to `lib5` libs may be specified.

## Lilac chaser

Look at [this](https://en.wikipedia.org/wiki/Lilac_chaser) introductory reference.

{{< details title="p5-instance-div markdown" open=false >}}
{{< highlight md >}}
{{</* p5-instance-div id="lilac-chaser" >}}
  // Adapted from [this](https://github.com/VisualComputing/Cognitive/blob/gh-pages/sketches/lilacChaser.js)
  let jump = 0;
  let count = 0;

  p5.setup = function() {
    p5.createCanvas(400, 400);
    p5.frameRate(7);
  };

  function drawBlurCircles(x, y, r) {
    p5.push();
    p5.noStroke();
    var opc = 0.4;
    var step = 3.0/r;

    for (var i = r; i > 0; i-=1.5) {
      if (opc < 5) {
        opc += step;
        p5.fill(255, 20, 180, opc);
      }
      p5.ellipse(x, y, i, i);
    }
    p5.pop();
  };

  p5.draw = function() {
    p5.background(200);
    var numCircles = 12;
    var stepAngle = 360.0/numCircles;
    p5.push();
    p5.translate(p5.width/2.0, p5.height/2.0);
    for (var i = 0; i < 360; i = i + stepAngle) {
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
{{< /p5-instance-div */>}}
{{< /highlight >}}
{{< hint warning >}}
Note that `p5` should be the name to be used for the sketch object variable.
{{< /hint >}}
{{< /details >}}

{{< p5-instance-div id="pacman" >}}
  let jump = 0;
  let count = 0;

  p5.setup = function() {
    p5.createCanvas(380, 380);
    p5.frameRate(7);
  };

  function drawBlurCircles(x, y, r) {
    p5.push();
    p5.noStroke();
    var opc = 0.4;
    var step = 3.0/r;

    for (var i = r; i > 0; i-=1.5) {
      if (opc < 5) {
        opc += step;
        p5.fill(255, 20, 180, opc);
      }
      p5.ellipse(x, y, i, i);
    }
    p5.pop();
  };

  p5.draw = function() {
    p5.background(200);
    var numCircles = 12;
    var stepAngle = 360.0/numCircles;
    p5.push();
    p5.translate(p5.width/2.0, p5.height/2.0);
    for (var i = 0; i < 360; i = i + stepAngle) {
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

## Video on canvas

Adapted from [here](https://p5js.org/examples/dom-video-canvas.html). Don't forget to checkout also the [video on dom](https://p5js.org/examples/dom-video.html) example.

{{< details title="p5-instance-div markdown" open=false >}}
{{< highlight md >}}
{{</* p5-instance-div id="video" >}}
  let fingers;

  p5.setup = function() {
    p5.createCanvas(710, 400);
    // specify multiple formats for different browsers
    fingers = p5.createVideo(['/showcase/sketches/fingers.mov', '/showcase/sketches/fingers.webm']);
    fingers.hide(); // by default video shows up in separate dom
                    // element. hide it and draw it to the canvas instead    
  };

  p5.draw = function() {
    p5.background(150);
    p5.image(fingers, 10, 10); // draw the video frame to canvas
    p5.filter(p5.GRAY);
    p5.image(fingers, 150, 150); // draw a second copy to canvas
  };

  p5.mousePressed = function() {
    fingers.loop(); // set the video to loop and start playing  
  }
{{< /p5-instance-div */>}}
{{< /highlight >}}
{{< hint warning >}}
Note that `p5` should be the name to be used for the sketch object variable.
{{< /hint >}}
{{< /details >}}

{{< p5-instance-div id="video" >}}
  let fingers;

  p5.setup = function() {
    p5.createCanvas(710, 400);
    // specify multiple formats for different browsers
    fingers = p5.createVideo(['/showcase/sketches/fingers.mov', '/showcase/sketches/fingers.webm']);
    fingers.hide(); // by default video shows up in separate dom
                    // element. hide it and draw it to the canvas instead    
  };

  p5.draw = function() {
    p5.background(150);
    p5.image(fingers, 10, 10); // draw the video frame to canvas
    p5.filter(p5.GRAY);
    p5.image(fingers, 150, 150); // draw a second copy to canvas
  };

  p5.mousePressed = function() {
    fingers.loop(); // set the video to loop and start playing  
  }
{{< /p5-instance-div >}}