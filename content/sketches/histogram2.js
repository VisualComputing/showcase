var img;
var maxRange = 256;
var histogram = new Array(maxRange);
function preload() {
  img = loadImage("/visual_computing/sketches/colores.jpg"); // Load the image
}

function setup() {
    createCanvas(img.width, img.height+10);
    background(255);
    img.resize(0,400);
    colorMode(HSL, maxRange);
    image(img, 0, 0);
  
    for (i = 0; i <= maxRange; i++) {
      histogram[i] = 0
    }
  
    transform_rgb();
  
    construir_histograma();
    
  }
  
  function construir_histograma(){
    image(img, 0, 0);
    stroke(300,100,80)
    push()
    translate(10,0)
    for (x = 0; x <= maxRange; x++) {
      index = histogram[x];
  
      y1=int(map(index, 0, max(histogram), img.height, img.height-200));
          y2 = img.height
      xPos = map(x,0,maxRange,0, img.width-20)
      stroke('red');
      line(xPos, y1, xPos, y2);
  
    }
    pop()
  }
  
  function transform_rgb(){
    loadPixels();
    
    for (var x = 0; x < img.width; x+=5) {
      for (var y = 0; y < img.height; y+=5) {
        var loc = (x + y * img.width) * 4;
        var h = pixels[loc];
        var s = pixels[loc + 1];
        var l = pixels[loc + 2];
        var a = pixels[loc + 3];
        b = int(l);
        histogram[b]++
      }
    }
  }
  
    //Bibliografia: https://editor.p5js.org/ebenjmuse/sketches/HyPfeGkCZ