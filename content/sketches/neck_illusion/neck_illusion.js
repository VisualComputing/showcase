let a, checkbox;

function setup() {
    checkbox = createCheckbox('rendija',true)
    checkbox.position(0,0);
    let cnv = createCanvas(720,420);
    cnv.position(0,0);
    a = 0;
}

function draw() {
    fill(0);
    background(255); 
    if(checkbox.checked()){
        for( let i=0; i<725; i+=14){
            rect(i,0,7,425);
        }
    }   
    
    noStroke();
    drawDuck(0,70);
    fill(122);
    drawDuck(250,70);
    fill(0);
    drawDuck(500,70);
    
    
    drawWorm(400,320);
    drawWorm(350,270);
    
    drawWorm(550,320);
    drawWorm(650,270);

    drawWorm(700,320);
    drawWorm(50,270);
    drawWorm(150,320);
    
    a += 0.27;
    if (a >= width){
        a = 0;
    }
}

function drawWorm (x, y){
    let wormWidth = 62,wormHeight = 10;
    if(a+x > width){
        rect((a+x)-(width+wormWidth),y,wormWidth,wormHeight);    
    }else{
        rect(a+x-wormWidth,y,wormWidth,wormHeight);
    }
}

function drawDuck(x, y){
    let duckStart = 53, acumulatedHeight = 0, blockHeight= 30, step = 7;
    if(a+x > width){
        duckStart+=width
    }
    rect(a+x-duckStart,y+acumulatedHeight,43,blockHeight);
    acumulatedHeight+=blockHeight; blockHeight=15;
    rect(a+x-duckStart,y+acumulatedHeight,56,blockHeight);
    acumulatedHeight+=blockHeight; blockHeight=15;
    rect(a+x-duckStart-5,y+acumulatedHeight,36,blockHeight);
    for (let i = 2; i <= 10; i=i+2) {
        rect(a+x-duckStart-(step*i)+5,y+acumulatedHeight,29+(step*i),blockHeight);
        acumulatedHeight+=blockHeight; blockHeight=15;    
    }
    rect(a+x-duckStart-25,y+acumulatedHeight,14,50);
    rect(a+x-duckStart+5,y+acumulatedHeight,14,50);
    blockHeight=50; acumulatedHeight+=blockHeight;
    rect(a+x-duckStart-25,y+acumulatedHeight,20,10);
    rect(a+x-duckStart+5,y+acumulatedHeight,20,10);
    
}