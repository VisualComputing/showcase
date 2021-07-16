p5 `iframe` shortcodes embed [p5.js](https://p5js.org/) code within an [iframe](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe). There are two p5 `iframe` shortcodes: [p5-iframe](#p5-iframe) and [p5-global-iframe](#p5-global-iframe).

# p5-iframe

```html
{{</* p5-iframe ver="1.4.0" sketch="/path/to/sketch.js" lib1="https://cdntolib1/lib1.js" width="800" height="600" */>}}
```

All parameters are optional but `sketch`. Default values are shown in the above snippet but for `libs*`. Up to `lib5` libs may be specified.

## Example 1: simple sketch

```html
{{</* p5-iframe sketch="/hugo-vc/sketches/colors.js" width="725" height="425 */>}}
```

outputs:

{{< p5-iframe sketch="/hugo-vc/sketches/colors.js" width="725" height="425" >}}

## Example 2: Photomosaic with shaders

```html
{{</* p5-iframe sketch="/hugo-vc/sketches/photomosaic.js" width="625" height="625" */>}}
```

outputs:

{{< p5-iframe sketch="/hugo-vc/sketches/photomosaic.js" width="625" height="625" >}}

## Example 3: External libs with shaders

```html
{{</* p5-iframe sketch="/hugo-vc/sketches/depthmap.js" lib1="https://cdn.jsdelivr.net/gh/freshfork/p5.EasyCam@1.2.1/p5.easycam.js" width="725" height="625" */>}}
```

outputs:

{{< p5-iframe sketch="/hugo-vc/sketches/depthmap.js" lib1="https://cdn.jsdelivr.net/gh/freshfork/p5.EasyCam@1.2.1/p5.easycam.js" width="725" height="625" >}}

# p5-global-iframe

```html
{{</* p5-global-iframe id="sketchid" ver="1.4.0" lib1="https://cdntolib1/lib1.js" width="800" height="600" >}}
  // inline sketch code
{{< p5-global-iframe */>}}
```

{{< hint warning >}}
Note that the inline `sketch` should be coded in [p5 global mode](https://github.com/processing/p5.js/wiki/Global-and-instance-mode) syntax.
{{< /hint >}}

All parameters are optional but `id`. Default values are shown in the above snippet but for `libs*`. Up to `lib5` libs may be specified.

## Example: breathing square

```js
{{</* p5-global-iframe id="breath" width="625" height="625" >}}
  let angle = 0;
  let speed = 0.06;

  function setup() {
    createCanvas(600, 600);
  }

  function draw() {
    background(255, 255, 255);
    rotateSquare();
    if (!mouseIsPressed) {
      strokeWeight(0);
      stroke(0);
      fill(255, 140, 0);
      rect(0, 0, 281, 281);
      rect(318, 0, 281, 281);
      rect(0, 318, 281, 281);
      rect(318, 318, 281, 281);
    }
  }

  function rotateSquare() {
    push();
    angle += speed;
    strokeWeight(0);
    stroke(0);
    fill(0, 0, 255);
    translate(width / 2, height / 2);
    rotate(angle);
    rect(-187.5, -187.5, 375, 375);
    pop();
  }
{{< p5-global-iframe */>}}
```

Produces:

{{< p5-global-iframe id="breath" width="625" height="625" >}}
  let angle = 0;
  let speed = 0.06;

  function setup() {
    createCanvas(600, 600);
  }

  function draw() {
    background(255, 255, 255);
    rotateSquare();
    if (!mouseIsPressed) {
      strokeWeight(0);
      stroke(0);
      fill(255, 140, 0);
      rect(0, 0, 281, 281);
      rect(318, 0, 281, 281);
      rect(0, 318, 281, 281);
      rect(318, 318, 281, 281);
    }
  }

  function rotateSquare() {
    push();
    angle += speed;
    strokeWeight(0);
    stroke(0);
    fill(0, 0, 255);
    translate(width / 2, height / 2);
    rotate(angle);
    rect(-187.5, -187.5, 375, 375);
    pop();
  }
{{< /p5-global-iframe >}}