let img;

function preload() {

  img = loadImage('showcase\content\sketches\exercises\coloring\0e5c038d-098c-4a45-87fd-b89630a313e9.jpg'); 
}

function setup() {
  createCanvas(1200, 600); 
  image(img, 0, 0, width/2, height); 
  let newImg = deuteranopia(img); 
  image(newImg, width/2, 0, width/2, height); 
}

function deuteranopia(img) {
  let newImg = createImage(img.width, img.height);
  img.loadPixels();
  newImg.loadPixels();
  for (let i = 0; i < img.pixels.length; i += 4) {
    let r = img.pixels[i];
    let g = img.pixels[i + 1];
    let b = img.pixels[i + 2];


    let rNew = 0.625 * r + 0.375 * g + 0.001 * b;
    let gNew = 0.7 * r + 0.3 * g + 0 * b;
    let bNew = 0 * r + 0.3 * g + 0.7 * b;

    newImg.pixels[i] = rNew;
    newImg.pixels[i + 1] = gNew;
    newImg.pixels[i + 2] = bNew;
    newImg.pixels[i + 3] = img.pixels[i + 3];
  }
  newImg.updatePixels();
  return newImg;
}