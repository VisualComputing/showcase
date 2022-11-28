let maskShader;
let img;
let video_src;
let video_on;
let cam_src;
let cam_on;
let ColorT;

let mask_mode;
let coloring;
let lenses;
//let maskmode;

function preload() {
  video_src = createVideo(['/visual_computing/vid/drift.mp4']);
  video_src.hide();
  
  cam_src = createCapture(VIDEO);
  cam_src.size(width, height);
  cam_src.hide();
  
  maskShader = readShader('/visual_computing/sketches/shaders/mask.frag', { varyings: Tree.texcoords2 });
  img = loadImage('/visual_computing/imgs/car.jpg');
}

function setup() {
  createCanvas(700, 700, WEBGL);
  noStroke();
  textureMode(NORMAL);
  
  //Camera selector
  cam_on = createCheckbox('Live', false);
  cam_on.style('color','red');
  cam_on.position(10,50);
  
  //Camera Controls
  cam_on.changed(() => {
    if(cam_on.checked()){
      maskShader.setUniform('texture',cam_src);
    }else{
       maskShader.setUniform('texture', img); 
    }
  });
  
  
  //Video Controls
  video_on = createCheckbox('Video', false);
  video_on.style('color', 'red');
  video_on.position(10, 30);
  
  //Video & image Switcher
  video_on.changed(() => {
    if (video_on.checked()) {
      maskShader.setUniform('texture', video_src);
      video_src.loop();
    } else {
      maskShader.setUniform('texture', img);
      video_src.pause();
    }
  });
  
  //Mask controls
  mask_mode = createCheckbox('Masks', false);
  mask_mode.position(10, 10);
  mask_mode.style('color', 'red');
  
  //Coloring checkbox
  coloring = createCheckbox('Coloring',false);
  coloring.position(165, 10);
  coloring.style('color','red');
  
  //Lenses checkbox
  lenses = createCheckbox('Lense',false);
  lenses.position(360, 10);
  lenses.style('color','red');
  
  //Shader apply
  shader(maskShader);
  maskShader.setUniform('texture', img);
  emitTexOffset(maskShader, img, 'texOffset');
  
  //Kernel selector
  sel = createSelect();
  sel.position(80, 10);
  sel.option('None');
  sel.option('Edges');
  sel.option('Sharpen');
  sel.option('Box Blur');
  sel.option('Emboss');
  
  
  sel.selected('None');
  
  //Coloring selector
  selC = createSelect();
  selC.position(245, 10);
  selC.option('None');
  selC.option('Luma');
  selC.option('Average');
  selC.option('HSV Value V');
  selC.option('HSL Value L');
  selC.option('Tint');
    
  selC.selected('None');
  
  //Color Picker
  colorT = createColorPicker(color(255,255,255));
  colorT.position(175, 30);
  
  //lenses parameters
  Rslider = createSlider(50.0, 150.0, 50.0);
  Rslider.position(360, 30);
  Rslider.style('width', '80px');
  let div1 = createDiv('Lens Radio');
  div1.style('font-size', '18px');
  div1.style('color', 'blue');
  div1.position(450, 30);
  
  Sslider = createSlider(0.0, 1.0, 0.0, 0.01);
  Sslider.position(360, 50);
  Sslider.style('width', '80px');
  let div2 = createDiv('Lens Amplitude');
  div2.style('font-size', '18px');
  div2.style('color', 'yellow');
  div2.position(450, 50);
  
}

function draw() {
  background(0);
  
  //Mask Mode
  if (mask_mode.checked()){
    
    //Enable Masks Mode
    maskShader.setUniform('maskmode',true);
    maskShader.setUniform('coloringmode',false);
    
    //kernels
    if (sel.value()=='Edges') {
      maskShader.setUniform('mask', [-1, -1, -1, -1, 8, -1, -1, -1, -1]);
    }else if(sel.value()=='Sharpen'){
      maskShader.setUniform('mask', [0, -1, 0, -1, 5, -1, 0, -1, 0]);
    }else if(sel.value()=='Box Blur'){
      maskShader.setUniform('mask', [1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9]);
    }else if(sel.value()=='Emboss'){
      maskShader.setUniform('mask', [-2, -1, 0, -1, 1, 1, 0, 1, 2]);
    }else{
      maskShader.setUniform('mask', [0, 0, 0, 0, 1, 0, 0, 0, 0]);
    }
    
  }else if(coloring.checked()){
    
    
    //Enable Coloring Mode
    maskShader.setUniform('maskmode',false);
    maskShader.setUniform('coloringmode',true);
    
    if(selC.value()=="None"){
    maskShader.setUniform('HSVV',false);
    maskShader.setUniform('HSLL',false);
    maskShader.setUniform('grey_scale',false);
    maskShader.setUniform('average',false);
    maskShader.setUniform('Tint',false);
    
  }else if(selC.value()=="Luma"){
    maskShader.setUniform('grey_scale',true);
    maskShader.setUniform('average',false);
    maskShader.setUniform('HSVV',false);
    maskShader.setUniform('HSLL',false);
    maskShader.setUniform('Tint',false);
    
  }else if(selC.value()=="Average"){
    maskShader.setUniform('average',true);
    maskShader.setUniform('grey_scale',false);
    maskShader.setUniform('HSVV',false);
    maskShader.setUniform('HSLL',false);
    maskShader.setUniform('Tint',false);
    
  }else if(selC.value() =="HSV Value V"){
    maskShader.setUniform('HSVV',true);
    maskShader.setUniform('HSLL',false);
    maskShader.setUniform('average',false);
    maskShader.setUniform('grey_scale',false);
    maskShader.setUniform('Tint',false);
    
  }else if(selC.value() =="HSL Value L"){
    maskShader.setUniform('HSLL',true);
    maskShader.setUniform('HSVV',false);
    maskShader.setUniform('average',false);
    maskShader.setUniform('grey_scale',false);
    maskShader.setUniform('Tint',false);

  }else if(selC.value() =="Tint"){
    maskShader.setUniform('Tint',true);
    maskShader.setUniform('HSLL',false);
    maskShader.setUniform('HSVV',false);
    maskShader.setUniform('average',false);
    maskShader.setUniform('grey_scale',false);
    
    let RC = colorT.color();
    maskShader.setUniform('colorT',[red(RC),green(RC),blue(RC),1.0]);
    }
    
  }else if(lenses.checked()){
    maskShader.setUniform('lensemode',true);
    maskShader.setUniform('maskmode',false);
    maskShader.setUniform('coloringmode',false);
    
    maskShader.setUniform('mouseData',[mouseX,mouseY]);
    maskShader.setUniform('resolution',[width,height]);
    maskShader.setUniform('radio', Rslider.value());
    maskShader.setUniform('scale', Sslider.value());
  }else{
    maskShader.setUniform('lensemode',false);
    maskShader.setUniform('maskmode',false);
    maskShader.setUniform('coloringmode',false);
  }
  

  quad(-width / 2, -height / 2, width / 2, -height / 2, width / 2, height / 2, -width / 2, height / 2);
}