# Visual illusions
>**Prompt:** Study, implement and discuss possible applications of some known visual phenomena and optical illusions.
>

The Hermann grid is used to create the optical illusion of perceiving a ghost between the grid cells, it's
produced a neural process called "Lateral inhibition". In the image there are only white spaces and black blocks
but the eyes perceive some kind of contrasts creating "gosthlike" shapes.  

{{< details title="Herman Grid" open=false >}} {{< highlight js >}}

function setup() {
  createCanvas(750, 750);
}

function draw() {
  background(0);

  stroke('white');
  strokeWeight(7);

  for (var i = 0; i < 25; i++){ 
    line(width/25*i, 0, width/25*i, height)
  }

  for (var i = 0; i < 25; i++){ 
    line(0, height/25*i, width, height/25*i)
  }

}

{{< /highlight >}} {{< /details >}}

{{< p5-iframe sketch="/showcase/sketches/exercises/1/herman_grill.js" width="730" height="780" >}}

In the following image there are parallel lines in each row, but exists an illusion of a vertically displacement created by the
irregular columns sort. The cafe wall illusion has been utilized by neuropsychologists to investigate how the brain processes visual information. Additionally, the illusion has found practical applications in graphic design and art.

{{< details title="Cafe Wall" open=false >}} {{< highlight js >}}

var colors = [];

function setup() {
  createCanvas(725, 425);
}

function draw() {
  background(255);
  x_jump = 55;
  y_jump = 55;
  stroke('grey');
  strokeWeight(3.3);

    for (var j = 0 ; j < 30; j++) {
      for (var i = 0; i < 30; i++) {
        if (j % 2 == 0) {
          fill(0);
        } else {
          fill(255);
        };if (i % 2 == 0) {
          fill(0);
        } else {
          fill(255);
        };
        if (j % 3 == 0){
          rect(i * x_jump - 10, j * y_jump, 80, 90);
        } else if (j % 2 == 0){
          rect(i * x_jump - 30, j * y_jump, 100, 60);
        } else {
          rect(i * x_jump - 50, j * y_jump, 90, 60);
        }
      }
    }
}

{{< /highlight >}} {{< /details >}}

{{< p5-iframe sketch="/showcase/sketches/exercises/1/cafe_wall.js" width="730" height="460" >}}