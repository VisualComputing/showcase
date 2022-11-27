let easycam;
let uvShader;
let opacity;

let c1, c2;

let rtb = false, gtb = false;

function preload() {
  uvShader = readShader('/visual_computing/sketches/shaders/screen.frag',{ matrices: Tree.pmvMatrix, varyings: Tree.texcoords2 });
}

function setup() {
  createCanvas(450, 450, WEBGL);
  
  // easycam stuff
  let state = {
    distance: 250,           
    center: [0, 0, 0],       
    rotation: [0, 0, 0, 1],  
  };
  easycam = createEasyCam();
  easycam.state_reset = state;   
  easycam.setState(state, 2000); 
  textureMode(NORMAL);
  opacity = createSlider(0, 1, 0.5, 0.01);
  opacity.position(10, 25);
  opacity.style('width', '280px');
  
  c1 = createCheckbox('R To B', false);
  c2 = createCheckbox('G To B', false);
  c1.position(100, 10);
  c2.position(200, 10);
  
  sel = createSelect();
  sel.position(10, 10);
  sel.option('Quad');
  sel.option('Triangle');
  sel.option('Circle');
  sel.selected('Quad');
  
}

function draw() {
  background(200);
  
  resetShader();
  
  axes();
  grid();
  translate(0, -70);
  rotateY(0.5);
  fill(color(255, 0, 255, 125));
  box(30, 50);
  translate(70, 70);
  fill(color(0, 255, 255, 125));
  sphere(30, 50);
  
  shader(uvShader);
 
  uvShader.setUniform('opacity', opacity.value());
  
  beginHUD();
  
    noStroke();

    if(sel.value() == "Quad"){
      quad(0, 0, width, 0, width, height, 0, height);
    }else if(sel.value() == "Triangle"){
      triangle(0,0,width,0,width/2,height)
    }else if (sel.value() == "Circle"){
      circle(width/2,height/2,width)
    }
  
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

  endHUD();
}

function mouseWheel(event) {
  //comment to enable page scrolling
  return false;
}