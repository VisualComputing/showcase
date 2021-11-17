function setup(){
    createCanvas(600,600);
    rectMode(CENTER);
    sliderX= 30;
    sliderY= 20;
}

function draw(){
    background(255);
    noFill();
    translate(width/2, height/2);
    for(let x = 420 ; x>= 40; x= x/1.08){
        rotate(radians(frameCount/2));
        fill(sliderY, 40);
        rect(0,0,x,x);

    }
}