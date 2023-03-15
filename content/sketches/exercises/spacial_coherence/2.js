let img;
let ratioInput;
let ratioValue;
let newImg, newImg2;
let updateBtn;

function preload() {
  img = loadImage("https://picsum.photos/400");
}

function setup() {
  text = createP("Original")
  text.position(0,0)
  text2 = createP("Color averaging")
  text2.position(img.width,0)
  text3 = createP("Spatial coherence")
  text3.position(img.width, img.height+20)
  ratioInput = createInput(10, "number");
  ratioInput.position(55, img.height + 40);
  ratioInput.style('width', `${img.width /2 - 70}px`);
  ratioValue = createDiv("Ratio: ");
  ratioValue.position(0, img.height + 42);
  updateBtn = createButton('Update');
  updateBtn.position(0, img.height + 65);
  updateBtn.mousePressed(updateImages);
  
  createCanvas(img.width * 2, img.height*2);
  pixelDensity(calcPixelDensity());
  newImg = createImage(img.width, img.height);
  newImg2 = createImage(img.width, img.height);


  updateImages();
}

function draw() {
  image(img, 0, 30);
}

function updateImages(){
  updateImage1();
  updateImage2();
}

function updateImage1() {
  let ratio = ratioInput.value();
  let avgColors = getAverageColors(img);
  setPixels(newImg, avgColors, ratio);
  image(newImg, img.width, 30);
}

function updateImage2() {
  let ratio = parseInt(ratioInput.value());
  newImg2.loadPixels();
  let new_pixels = [];
  for (let y = 0; y < newImg2.height; y++) {
    for (let x = 0; x < newImg2.width; x++) {
      let randX = -1;
      let randY = -1;
      while (randX < 0 || randX >= img.width || randY < 0 || randY >= img.height){
        randX = x + int(random(parseInt(-ratio/2), parseInt(ratio/2)));
        randY = y + int(random(parseInt(-ratio/2), parseInt(ratio/2)));
      }
      let index = (x + y * newImg2.width) * 4;
      let new_index = (randX + randY * newImg2.width) * 4;
      /*
      new_pixels[index] = img.pixels[new_index];
      new_pixels[index + 1] = img.pixels[new_index+1];
      new_pixels[index + 2] = img.pixels[new_index+2];
      new_pixels[index + 3] = 255;
      */
      newImg2.pixels[index] = img.pixels[new_index];
      newImg2.pixels[index + 1] = img.pixels[new_index+1];
      newImg2.pixels[index + 2] = img.pixels[new_index+2];
      newImg2.pixels[index + 3] = 255;      
    }
  }
  //newImg2.pixels = new_pixels;
  newImg2.updatePixels();
  image(newImg2, img.width, img.height + 50);

}

function getAverageColors(img) {
  let avgColors = [];
  img.loadPixels();

  for (let y = 0; y < img.height; y++) {
    for (let x = 0; x < img.width; x++) {
      let index = (x + y * img.width) * 4;
      let r = img.pixels[index];
      let g = img.pixels[index + 1];
      let b = img.pixels[index + 2];
      avgColors.push(color(r , g , b));
    }
  }
  img.updatePixels();

  return avgColors;
}

function setPixels(img, avgColors, ratio) {
  img.loadPixels();

  for (let y = 0; y < img.height; y++) {
    for (let x = 0; x < img.width; x++) {
      let index = (x + y * img.width) * 4;
      let r = 0;
      let g = 0;
      let b = 0;
      let count = 0;

      for (let i = 0; i <= ratio; i++) {
        for (let j = 0; j <= ratio; j++) {
          let neighborX = x + i;
          let neighborY = y + j;

          if (neighborX >= 0 && neighborX < img.width && neighborY >= 0 && neighborY < img.height) {
            let neighborIndex = (neighborX + neighborY * img.width) * 4;
            r += red(avgColors[neighborIndex / 4]);
            g += green(avgColors[neighborIndex / 4]);
            b += blue(avgColors[neighborIndex / 4]);
            count++;
          }
        }
      }

      r /= count;
      g /= count;
      b /= count;

      img.pixels[index] = r;
      img.pixels[index + 1] = g;
      img.pixels[index + 2] = b;
      img.pixels[index + 3] = 255;
    }
  }

  img.updatePixels();
}

function calcPixelDensity() {
  let density = displayDensity();
  let w = img.width * density;
  let h = img.height * density;
  let ratio = w / h;
  let pixelDensity = 1;
  if (w > displayWidth || h > displayHeight) {
    if (ratio > 1) {
      pixelDensity = ceil(w / displayWidth);
   

    } else {
      pixelDensity = ceil(h / displayHeight);
    }
  }
  return pixelDensity;
}