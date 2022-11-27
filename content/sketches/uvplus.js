let easycam;
let uvShader;
let c1, c2;

let rtb = false, gtb = false;

function preload() {
  uvShader = readShader('/visual_computing/sketches/shaders/uvplus.frag',{ matrices: Tree.pmvMatrix, varyings: Tree.texcoords2 });
}

function setup() {
  createCanvas(300, 300, WEBGL);
  textureMode(NORMAL);
  c1 = createCheckbox('Red To Blue', false);
  c2 = createCheckbox('Green To Blue', false);
  c1.position(10, 310);
  c2.position(150, 310);
  shader(uvShader);
}

function draw() {
  background(200);
  orbitControl();
  axes();
  push();
  noStroke();
  quad(-width / 2, -height / 2, width / 2, -height / 2,
        width / 2, height / 2, -width / 2, height / 2);
  pop();
  
  if(c1.checked()){
    uvShader.setUniform('rtb',true)
     uvShader.setUniform('gtb',false)
  }else if(c2.checked()){
    uvShader.setUniform('rtb',false)
    uvShader.setUniform('gtb',true)
  }else{
    uvShader.setUniform('rtb',false)
    uvShader.setUniform('gtb',false)
  }
}

function mouseWheel(event) {
  return false;
}

