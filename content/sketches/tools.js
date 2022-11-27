let lumaShader;
let img;
let grey_scale;
let average;
let HSVV;
let Tint;
let ColorT;

function preload() {
  lumaShader = readShader('/visual_computing/sketches/shaders/colors.frag',{ varyings: Tree.texcoords2});
  img = loadImage('/visual_computing/imgs/car.jpg');
}

function drawControls(enabled){
  if(enabled){
    colorT = createColorPicker(color(255,255,255));
    colorT.position(125, 10);
  }
}

function setup() {
  createCanvas(700, 500, WEBGL);
  noStroke();
  textureMode(NORMAL);
  
  sel = createSelect();
  sel.position(10, 10);
  sel.option('None');
  sel.option('Luma');
  sel.option('Average');
  sel.option('HSV Value V');
  sel.option('HSL Value L');
  sel.option('Tint');
  
  sel.selected('None');
  
  drawControls(true);
  
  
  
}

function draw() {
  background(0);
  
  if(sel.value()=="None"){
    shader(lumaShader);
    lumaShader.setUniform('texture', img);
    lumaShader.setUniform('HSVV',false);
    lumaShader.setUniform('HSLL',false);
    lumaShader.setUniform('grey_scale',false);
    lumaShader.setUniform('average',false);
    
  }else if(sel.value()=="Luma"){
    shader(lumaShader);
    lumaShader.setUniform('grey_scale',true);
    lumaShader.setUniform('average',false);
    lumaShader.setUniform('HSVV',false);
    lumaShader.setUniform('HSLL',false);
    lumaShader.setUniform('texture', img);
    
  }else if(sel.value()=="Average"){
    shader(lumaShader);
    lumaShader.setUniform('average',true);
    lumaShader.setUniform('grey_scale',false);
    lumaShader.setUniform('HSVV',false);
    lumaShader.setUniform('HSLL',false);
    lumaShader.setUniform('texture', img);
    
  }else if(sel.value() =="HSV Value V"){
    shader(lumaShader);
    lumaShader.setUniform('HSVV',true);
    lumaShader.setUniform('HSLL',false);
    lumaShader.setUniform('average',false);
    lumaShader.setUniform('grey_scale',false);
    lumaShader.setUniform('texture', img);
    
  }else if(sel.value() =="HSL Value L"){
    shader(lumaShader);
    lumaShader.setUniform('HSLL',true);
    lumaShader.setUniform('HSVV',false);
    lumaShader.setUniform('average',false);
    lumaShader.setUniform('grey_scale',false);
    lumaShader.setUniform('texture', img);
    
  }else if(sel.value() =="Tint"){
    shader(lumaShader);
    lumaShader.setUniform('Tint',true);
    lumaShader.setUniform('HSLL',false);
    lumaShader.setUniform('HSVV',false);
    lumaShader.setUniform('average',false);
    lumaShader.setUniform('grey_scale',false);
    lumaShader.setUniform('texture', img);
    
    let RC = colorT.color();
    lumaShader.setUniform('colorT',[red(RC),green(RC),blue(RC),1.0]);
    
  }
  
  quad(-width / 2, -height / 2, width / 2, -height / 2, width / 2, height / 2, -width / 2, height / 2);
}