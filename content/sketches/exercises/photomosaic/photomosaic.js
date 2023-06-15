let imageCells;
let pg;
let mosaic;
let image_src;
let video_src;
let debug;
let cols;
// ui
let resolution;
let sel;
let video_on;
let p;

let luma;
let rgb;

const SAMPLE_RES = 100;

function preload() {
  image_src = loadImage("/showcase/resources/_gen/images/needler.jpg");
  video_src = createVideo(["/showcase/resources/_gen/images/video.mp4"]);
  video_src.hide(); // by default video shows up in separate dom
  mosaic = readShader("/showcase/content/sketches/shaders/photomosaic.frag");
  p = [];
  for (let i = 1; i <= 40; i++) {
    if (i.toString().length == 1) {
      p.push(loadImage(`/showcase/resources/_gen/images/blocks/00000${i}.jpg`));
    } else {
      p.push(loadImage(`/showcase/resources/_gen/images/blocks/0000${i}.jpg`));
    }
  }
}

function setup() {
  // shaders require WEBGL mode to work
  createCanvas(650, 650, WEBGL);
  colorMode(RGB, 1);
  imageCells = createQuadrille(p);
  textureMode(NORMAL);
  noStroke();
  shader(mosaic);
  cam = createCapture(VIDEO);
  cam.size(500, 400);
  cam.hide();
  sel = createSelect();
  sel.position(10, 10);
  sel.option("keys");
  sel.option("symbols");
  sel.selected("symbols");
  sel.changed(() => {
    mosaic.setUniform("debug", sel.value() === "keys");
    mosaic.setUniform("color_on", false);
  });

  video_on = createSelect();
  video_on.position(10, 30);
  video_on.option("image");
  video_on.option("video");
  video_on.option("camera");
  video_on.selected("image");
  video_on.changed(() => {
    mosaic.setUniform(
      "source",
      video_on.value() === "image"
        ? image_src
        : video_on.value() === "video"
        ? video_src
        : cam
    );
    if (video_on.value() === "video") {
      video_src.loop();
    } else {
      video_src.pause();
    }
  });

  video_on.position(10, 30);
  mosaic.setUniform("source", image_src);
  resolution = createSlider(10, 300, SAMPLE_RES, 5);
  resolution.position(10, 50);
  resolution.style("width", "80px");
  resolution.input(() => {
    mosaic.setUniform("resolution", resolution.value());
  });
  mosaic.setUniform("resolution", resolution.value());
  pg = createGraphics(SAMPLE_RES * imageCells.width, SAMPLE_RES);
  mosaic.setUniform("cols", imageCells.width);
  sample();
}

function sample() {
  if (pg.width !== SAMPLE_RES * imageCells.width) {
    pg = createGraphics(SAMPLE_RES * imageCells.width, SAMPLE_RES);
    mosaic.setUniform("cols", imageCells.width);
  }
  imageCells.sort({
    ascending: true,
    cellLength: SAMPLE_RES,
    mode: "LUMA",
  });

  luma = imageCells.saveLuma({
    cellLength: SAMPLE_RES,
  });
  rgb = imageCells.saveRGB({
    cellLength: SAMPLE_RES,
  });
  drawQuadrille(imageCells, {
    graphics: pg,
    cellLength: SAMPLE_RES,
    outlineWeight: 0,
  });
  mosaic.setUniform("palette", pg);
  mosaic.setUniform("lumas", luma);
  mosaic.setUniform("red_palette", rgb.r);
  mosaic.setUniform("green_palette", rgb.g);
  mosaic.setUniform("blue_palette", rgb.b);
}

function draw() {
  cover({
    texture: true,
  });
  // let div = createDiv(floor(frameRate()));
  // div.style("font-size", "16px");
  // div.style("background-color", "white");
  // div.style("font-family", "Arial");
  // div.style("font-size", "30px");
  // div.style("font-weight", "bold");
  // div.position(20, 20);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}