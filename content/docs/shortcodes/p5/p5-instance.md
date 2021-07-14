# p5-instance

p5 helps add [p5 sketches](https://p5js.org/) into your book.


```html
{{</* p5 id="sketchid" ver="1.4.0" sketch="/path/to/sketch.js" lib1="https://cdntolib1/lib1.js" width="800" height="600" */>}}
```

All parameters are optional but `sketch`. Up to `lib5` libs may be specified.

# Examples

{{< p5-libs ver="1.4.0" >}}

## Instance mode within div element

```html
{{</* p5-div id="colors" sketch="/hugo-vc/sketches/colors.js" */>}}
```

Produces:

{{< p5-div id="colors" sketch="/hugo-vc/sketches/colors.js" >}}

## Instance mode simple sketch

```html
{{</* p5-div id="scintillating" sketch="/hugo-vc/sketches/scintillating.js" */>}}
```

Produces:

{{< p5-div id="scintillating" sketch="/hugo-vc/sketches/scintillating.js" >}}

## Inner

Produces:

{{< p5-inner id="codeid" >}}
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
  };
{{< /p5-inner >}}