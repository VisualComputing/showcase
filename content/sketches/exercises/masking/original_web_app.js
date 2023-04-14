let HW = 400;
let HH = 400;
let HP = 200;
let BG = 8;

function drawRGBHistogram(imgBuffer) {
  let histR = (new Array(256)).fill(0);
  let histG = (new Array(256)).fill(0);
  let histB = (new Array(256)).fill(0);
  let maxB = 0;
  for (let i = 0; i < imgBuffer.length; i += 4) {
    histR[imgBuffer[i]]++;
    histG[imgBuffer[i + 1]]++;
    histB[imgBuffer[i + 2]]++;
  }

  maxB = Math.max(Math.max(...histR), Math.max(...histG), Math.max(...histB));

  const y1 = HP + HH;
  const dx = HW / 255;
  const dy = HW / maxB;
  rect(0, HP, HW, HH);
  strokeWeight(dx);
    
  for (let i = 0; i < 256; i++) {
    let x = i * dx;
    stroke(color(220,0,0,128));
    line(x, y1, x, y1 - histR[i] * dy);
    stroke(color(0,210,0,128));
    line(x, y1, x, y1 - histG[i] * dy);
    stroke(color(0,0,255,128));
    line(x, y1, x, y1 - histB[i] * dy);
    stroke(color(i, i, i));
    line(x, y1, x, y1 + BG);
  }
}

function drawBrightnessHistogram(imgBuffer) {
  let hist = (new Array(256)).fill(0);
  let maxB = 0;

  for (let i = 0; i < imgBuffer.length; i++) {
    // Ignoring alpha
    if (i%4 != 3) {
      hist[imgBuffer[i]]++;
    }
  }

  maxB = Math.max(...hist);

  const y1 = HP + HH;
  const dx = HW / 255;
  const dy = HW / maxB;
  rect(0, HP, HW, HH);
  strokeWeight(dx);
    
  for (let i = 0; i < 256; i++) {
    let x = i * dx;
    stroke(color("black"));
    line(x, y1 + BG, x, y1 - hist[i] * dy);
    stroke(color(i, i, i));
    line(x, y1, x, y1 + BG);
  }
}

function copyArray(a) {
  c = Array(a.length); 
  i = a.length;
  while(i--) c[i] = a[i];
  return a;
}

function applyLuma(){
  let lumaImg = createImage(img.width, img.height);
  lumaImg.loadPixels();
  for (let i = 0; i < img.pixels.length; i+=4) {
    lumaImg.pixels[i] = (img.pixels[i] + img.pixels[i + 1] + img.pixels[i + 2]) / 3;
    lumaImg.pixels[i + 1] = (img.pixels[i] + img.pixels[i + 1] + img.pixels[i + 2]) / 3;
    lumaImg.pixels[i + 2] = (img.pixels[i] + img.pixels[i + 1] + img.pixels[i + 2]) / 3;
    lumaImg.pixels[i + 3] = 255;
  }
  lumaImg.updatePixels();
  lumaImg.save('luma', 'png');
}

function convolve(name, matrix) {
  let convolvedImage = createImage(img.width, img.height);
  convolvedImage.loadPixels();
  for (let x = 0; x < img.width; x++) {
    for (let y = 0; y < img.height; y++) {
      let c = convolution(x, y, matrix, img);
      
      let loc = (x + y * img.width) * 4;
      convolvedImage.pixels[loc] = red(c);
      convolvedImage.pixels[loc + 1] = green(c);
      convolvedImage.pixels[loc + 2] = blue(c);
      convolvedImage.pixels[loc + 3] = alpha(c);
    }
  }
  convolvedImage.updatePixels();
  convolvedImage.save(name, 'png');
}

function convolution(x, y, matrix) {
  let rtotal = 0.0;
  let gtotal = 0.0;
  let btotal = 0.0;
  const offset = Math.floor(matrix.length / 2);
  for (let i = 0; i < matrix.length; i++){
    for (let j = 0; j < matrix.length; j++){
      
      // What pixel are we testing
      const xloc = (x + i - offset);
      const yloc = (y + j - offset);
      let loc = (xloc + yloc * img.width) * 4;

      // Make sure we haven't walked off our image, we could do better here
      loc = constrain(loc, 0 , img.pixels.length - 1);

      // Calculate the convolution
      // retrieve RGB values
      rtotal += (img.pixels[loc]) * matrix[i][j];
      gtotal += (img.pixels[loc + 1]) * matrix[i][j];
      btotal += (img.pixels[loc + 2]) * matrix[i][j];
    }
  }
  // Make sure RGB is within range
  rtotal = constrain(rtotal, 0, 255);
  gtotal = constrain(gtotal, 0, 255);
  btotal = constrain(btotal, 0, 255);
  
  // Return the resulting color
  return color(rtotal, gtotal, btotal);
}

function applySharpen() {
  convolve("Sharpen", kernels["Sharpen"]);
}

function applyBoxBlur() {
  convolve("BoxBlur", kernels["BoxBlur"]);
}

function applyGaussianBlur3x3() {
  convolve("GaussianBlur3x3", kernels["GaussianBlur3x3"]);
}

function applyGaussianBlur5x5() {
  convolve("GaussianBlur5x5", kernels["GaussianBlur5x5"]);
}

function applyUnsharp5x5() {
  convolve("Unsharp5x5", kernels["Unsharp5x5"]);
}

let kernels = {
  "Sharpen" : [[0,-1,0],
               [-1,5,-1],
               [0,-1,0]],
  "BoxBlur" : [[1/9,1/9,1/9],
                [1/9,1/9,1/9],
                [1/9,1/9,1/9]],
  "GaussianBlur3x3" : [[1/16,1/8,1/16],
                           [1/8,1/4,1/8],
                           [1/16,1/8,1/16]],
  "GaussianBlur5x5" : [[1/256,4/256,6/256,4/256,1/256],
                           [4/256,16/256,1/256,16/256,4/256],
                           [6/256,24/256,36/256,24/256,6/256],
                           [4/256,16/256,1/256,16/256,4/256],
                           [1/256,4/256,6/256,4/256,1/256]],
  "Unsharp5x5" : [[-1/256,-4/256,-6/256,-4/256,-1/256],
                             [-4/256,-16/256,-1/256,-16/256,-4/256],
                             [-6/256,-24/256,476/256,-24/256,-6/256],
                             [-4/256,-16/256,-1/256,-16/256,-4/256],
                             [-1/256,-4/256,-6/256,-4/256,-1/256]],
};

let img;
let input;
let histogramTypeSelect;
let sharpenButton;
let boxBlurButton;
let gaussianBlur3x3Button;
let gaussianBlur5x5Button;
let unsharpMasking5x5Button;
let lumaButton;


function handleFiles() {
  const fileList = this.files; /* now you can work with the file list */
  const file = fileList[0]

  var reader = new FileReader();

  reader.onload = function(e) {
    if (file.type === 'image/png' || file.type === 'image/jpeg') {
      img = loadImage(e.target.result, '');
      img.loadPixels();
    } else {
      img = null;
    }
  }

  reader.readAsDataURL(file);
}

function setup() {
  createCanvas(HW+100, HH+100 + HP);
  input = document.getElementById("file-input");
  input.addEventListener("change", handleFiles, false);
  
  histogramTypeSelect = createSelect();
  histogramTypeSelect.position(HP, HP-50);
  histogramTypeSelect.option('RGB'); 
  histogramTypeSelect.option('Brightness');
  histogramTypeSelect.hide();

  sharpenButton = createButton('Sharpen');
  sharpenButton.position(10, 30);
  sharpenButton.mousePressed(applySharpen);
  sharpenButton.hide();

  boxBlurButton = createButton('Box blur');
  boxBlurButton.position(10, 70);
  boxBlurButton.mousePressed(applyBoxBlur);
  boxBlurButton.hide();

  gaussianBlur3x3Button = createButton('Gaussian blur(3x3)');
  gaussianBlur3x3Button.position(10, 110);
  gaussianBlur3x3Button.mousePressed(applyGaussianBlur3x3);
  gaussianBlur3x3Button.hide();

  gaussianBlur5x5Button = createButton('Gaussian blur(5x5)');
  gaussianBlur5x5Button.position(200, 30);
  gaussianBlur5x5Button.mousePressed(applyGaussianBlur5x5);
  gaussianBlur5x5Button.hide();

  unsharpMasking5x5Button = createButton('Unsharp');
  unsharpMasking5x5Button.position(200, 70);
  unsharpMasking5x5Button.mousePressed(applyUnsharp5x5);
  unsharpMasking5x5Button.hide();
  
  lumaButton = createButton('Luminance');
  lumaButton.position(200, 110);
  lumaButton.mousePressed(applyLuma);
  lumaButton.hide();
}

function draw() {
  background(0);
  if (img) {
    histogramTypeSelect.show();
    sharpenButton.show();
    boxBlurButton.show();
    gaussianBlur3x3Button.show();
    gaussianBlur5x5Button.show();
    unsharpMasking5x5Button.show();
    lumaButton.show();
    img.loadPixels();
    if (histogramTypeSelect.value() === 'RGB') {
      drawRGBHistogram(img.pixels);
    } else {
      drawBrightnessHistogram(img.pixels)
    }
  }
}