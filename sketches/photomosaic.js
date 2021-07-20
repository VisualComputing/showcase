let image;
let video;
let om;
let mosaic;
let resolution;
let video_on;
let om_on;

function preload() {
  image = loadImage('/hugo-vc/sketches/mandrill.png');
  video = createVideo(['/hugo-vc/sketches/mandrill.webm']);
  video.hide(); // by default video shows up in separate dom
  om = loadImage('/hugo-vc/sketches/omkara.png');
  mosaic = loadShader('/hugo-vc/sketches/shader.vert', '/hugo-vc/sketches/photomosaic.frag');
}

function setup() {
  createCanvas(600, 600, WEBGL);
  textureMode(NORMAL);
  noStroke();
  shader(mosaic);
  mosaic.setUniform('om', om);
  om_on = createCheckbox('ॐ', false);
  om_on.changed(() => mosaic.setUniform('om_on', om_on.checked()));
  om_on.position(10, 10);
  video_on = createCheckbox('video', false);
  video_on.changed(() => {
    if (video_on.checked()) {
      mosaic.setUniform('img', video);
      video.loop();  
    } else {
      mosaic.setUniform('img', image);
    } 
  });
  video_on.position(10, 30);
  mosaic.setUniform('img', image);
  resolution = createSlider(10, 100, 30, 1);
  resolution.position(10, 50);
  resolution.style('width', '80px');
  resolution.input(() => mosaic.setUniform('resolution', resolution.value()));
  mosaic.setUniform('resolution', resolution.value());
}

function draw() {
  background(33);
  cover(true);
}

function cover(texture = false) {
  beginShape();
  if (texture) {
    vertex(-width / 2, -height / 2, 0, 0, 0);
    vertex(width / 2, -height / 2, 0, 1, 0);
    vertex(width / 2, height / 2, 0, 1, 1);
    vertex(-width / 2, height / 2, 0, 0, 1);
  }
  else {
    vertex(-width / 2, -height / 2, 0);
    vertex(width / 2, -height / 2, 0);
    vertex(width / 2, height / 2, 0);
    vertex(-width / 2, height / 2, 0);
  }
  endShape(CLOSE);
}