const kernels = {
    identity: [
        [0, 0, 0],
        [0, 1, 0],
        [0, 0, 0]
    ],
    ridgeDetection1: [
        [-1, -1, -1],
        [-1, 4, -1],
        [-1, -1, -1]
    ],
    ridgeDetection2: [
        [-1, -1, -1],
        [-1, 8, -1],
        [-1, -1, -1]
    ],
    sharpen: [
        [0, -1, 0],
        [-1, 5, -1],
        [0, -1, 0]
    ],
    boxBlur: [
        [1, 1, 1],
        [1, 1, 1],
        [1, 1, 1]
    ].map(row => row.map(x => x / 9)),
    gaussianBlur3x3: [
        [1, 2, 1],
        [2, 4, 2],
        [1, 2, 1]
    ].map(row => row.map(x => x / 16)),
    gaussianBlur5x5: [
        [1, 4, 6, 4, 1],
        [4, 16, 24, 16, 4],
        [6, 24, 36, 24, 6],
        [4, 16, 24, 16, 4],
        [1, 4, 6, 4, 1]
    ].map(row => row.map(x => x / 256)),
    unsharpMasking5x5: [
        [1, 4, 6, 4, 1],
        [4, 16, 24, 16, 4],
        [6, 24, -476, 24, 6],
        [4, 16, 24, 16, 4],
        [1, 4, 6, 4, 1]
    ].map(row => row.map(x => x / -256))
};

let images = [];
let currentImg = 0;

// let currentKernel = "identity";
let currentKernel;

let colorCount = [];
let maxColorCount = 0;

let frame;
let histogram;
let matrix;

let matrixDim = 3;

const MARGIN = 0;

let update = true;
let sel;

let kernel = [];

let checkbox;

let span;

class Frame {
    constructor(x, y, xSize, ySize, proc, useframe, bg) {
        this.x = x;
        this.y = y;
        this.xSize = xSize;
        this.ySize = ySize;
        this.pg = createGraphics(this.xSize, this.ySize);
        this.proc = proc;
        this.useframe = useframe;
        this.bg = bg;
    }

    show() {
        push();
        if(this.useframe) image(this.pg, this.x, this.y);
        pop();
    }

    update(){
        push();
        this.pg.background(this.bg);
        this.proc();
        pop();
    }
}

function preload() {
    // images[0] = loadImage("./assets/t_640p.jpg");
    images[0] = loadImage("/showcase/sketches/kernelLab/assets/t_640p.jpg");
    
}

function setup() {
    // width="725" height="425" 
    createCanvas(725, 650);

    span = createP("")
    span.class("span-box")
    
    let w =  width;
    images[0].resize(w, w * 9 / 16);
    
    print(Object.keys(kernels), images);

    frame = new Frame(0, 0, images[0].width, images[0].height, convolution, true, color(0));
    histogram = new Frame(0, images[0].height, images[0].width, height - images[0].height, createHistogram, true, color(52,58,64, 255));
    matrix = new Frame(width - 250 - 10, 7, 250, 250, createMatrix, false, color(0));

    textAlign(CENTER);

    sel = createSelect();
    sel.position(10, 10);
    Object.keys(kernels).map(v => {
        sel.option(v);
    });
    
    sel.selected( Object.keys(kernels)[0]);
    sel.changed(onSelected);
    sel.class("select-box")

    checkbox = createCheckbox('Show Kernel', true);
    checkbox.changed(showKernel);
    checkbox.position(10, 50);
    checkbox.class("checkbox-box")

    currentKernel = [];
    for(let i = 0; i < kernels["identity"].length; i++)
        currentKernel[i] = [...kernels["identity"][i]]
}

function draw() {

    // span.remove()

    background(52,58,64, 255);

    frame.show();
    histogram.show();
    matrix.show();

    if(mouseX > 0 && mouseX < width && mouseY > images[0].height && mouseY < height){
        span.position(mouseX + 25 - map(mouseX, 0, width, 0, 125), mouseY + 25 - map(mouseY, images[0].height, height, 0, 110))
        let clr = int(map(mouseX, 0, width, 0, 256))
        let count = int(map(mouseY - images[0].height, 0, height - images[0].height, 0, maxColorCount + 1))
        span.html(`Tone: ${clr}\nCount: ${count}`)
    } 
         
    if (!update)
        return;

    frame.update();
    histogram.update();
    matrix.update();

    update = false;
    // noLoop();
}

function onSelected(){
    currentKernel = [];
    for(let i = 0; i < kernels[sel.value()].length; i++)
        currentKernel[i] = [...kernels[sel.value()][i]]
    
    kernel.map(x => x.map(y => y.remove()));
    kernel = [];

    update = true;
}

function showKernel(){
    kernel.map(x => x.map(y => {
        y.style("display", checkbox.checked() ? "block" : "none")
    }))
}

function kernelChanged(){
    for(let i = 0; i < kernel.length; i++){
        for(let j = 0; j < kernel.length; j++){
            currentKernel[i][j] = kernel[i][j].value();
        }
    }
    kernel.map(x => x.map(y => y.remove()));
    kernel = [];
    update = true;
}

function convolution() {
    let mxsm = 0;
    let maxColorCountVal = 0;
    this.pg.loadPixels();
    images[0].loadPixels();

    colorCount = [];

    colorCount[0] = new Array(256).fill(0);
    colorCount[1] = new Array(256).fill(0);
    colorCount[2] = new Array(256).fill(0);

    maxColorCount = 0;

    for(let x = 0; x < images[0].width; x++){
        for(let y = 0; y < images[0].height; y++){
            // print(x,y)
            // let c = []
            for(let step = 0; step < 4; step++){
                if(step == 3)
                    continue;

                let sum = 0;

                for(let kx = 0; kx < currentKernel.length; kx++){
                    for(let ky = 0; ky < currentKernel[0].length; ky++){
                        let dx = kx - floor(currentKernel.length / 2);
                        let dy = ky - floor(currentKernel.length / 2);
                      
                        // let dIndex = 4 * ((y * d + j) * width * d + (x * d + i));

                        let dIndex = 4 * ((y + dy) * this.pg.width + (x + dx)) + step;
                        
                        sum += images[0].pixels[dIndex] * currentKernel[kx][ky];
                    }
                }
                // sum = 255;
                // c.push(sum);      
                sum = sum > 255 ? 255 : sum < 0 ? 0 : sum;
                mxsm = (sum > mxsm) ? sum : mxsm;
                this.pg.pixels[4* (y * images[0].width + x) + step] = sum;
                colorCount[step][int(sum)]++;
              
                if(colorCount[step][int(sum)] > maxColorCount){
                  maxColorCount = colorCount[step][int(sum)]
                  maxColorCountVal = sum
                }
                // maxColorCount = colorCount[step][int(sum)] > maxColorCount ? colorCount[step][int(sum)] : maxColorCount;
                // maxColorCountVal
            }
            
            
            // this.pg.pixels[y * images[0].width + x] = color(255);
        }
    //   print(currentKernel.length)
    }
    images[0].updatePixels();
    this.pg.updatePixels();
    // print(mxsm, maxColorCount,maxColorCountVal, "done");
}

function createHistogram(){
    let barWidth = this.xSize / 255;
    this.pg.loadPixels();
    for(let c = 0; c < 3; c++){
        for(let i = 0; i <= 255; i++){
            let x = int(map(i, 0, 256, 0, this.xSize));
            let currentTone = colorCount[c][i];
            // print(x, i, currentTone, this.xSize)
            for(let j = 0; j < currentTone; j++){
                let y = int(map(j, 0, maxColorCount, 0, this.ySize));
                // print(y)
                for(let w = 0; w < barWidth; w++)
                    this.pg.pixels[ 4 * (y * this.xSize + (x + w)) + c] = 255;
            }
        }
    }
    this.pg.updatePixels();
}

function createMatrix(){
    let ck = currentKernel;

    let spacing = 3;

    let colSize = this.xSize / ck.length;
    let rowSize = this.ySize / ck.length;
    for(let i = 0; i < ck.length; i++){
        kernel[i] = [];
        for(let j = 0; j < ck.length; j++){
            kernel[i][j] = createInput(ck[i][j], 'number');
            kernel[i][j].size(int(colSize - spacing * 2 ), int(rowSize - spacing * 2));
            kernel[i][j].position(colSize * i + this.x + spacing, rowSize * j + this.y + spacing);
            kernel[i][j].class("input-box")
            kernel[i][j].style("display", checkbox.checked() ? "block" : "none")
            kernel[i][j].changed(kernelChanged)
        }
    }
}





















// class ImageFrame {
//     constructor(x, y, xSize, ySize) {
//         this.x = x;
//         this.y = y;
//         this.xSize = xSize;
//         this.ySize = ySize;
//         this.pg = createGraphics(this.xSize, this.ySize);
//     }

//     show() {
//         push();
//         this.pg.background(0);
//         this.convolution();
//         image(this.pg, this.x, this.y);
//         pop();
//     }

//     convolution(){
//         let mxsm = 0;
//         let maxColorCountVal = 0;
//         this.pg.loadPixels();
//         images[0].loadPixels();

//         colorCount[0] = new Array(255).fill(0);
//         colorCount[1] = new Array(255).fill(0);
//         colorCount[2] = new Array(255).fill(0);

//         maxColorCount = 0;

//         for(let x = 0; x < images[0].width; x++){
//             for(let y = 0; y < images[0].height; y++){
//                 // print(x,y)
//                 let c = []
//                 for(let step = 0; step < 4; step++){
//                     if(step == 3)
//                         continue;

//                     let sum = 0;

//                     for(let kx = 0; kx < currentKernel.length; kx++){
//                         for(let ky = 0; ky < currentKernel[0].length; ky++){
//                             let dx = kx - floor(currentKernel.length / 2);
//                             let dy = ky - floor(currentKernel.length / 2);
                          
//                             // let dIndex = 4 * ((y * d + j) * width * d + (x * d + i));

//                             let dIndex = 4 * ((y + dy) * this.pg.width + (x + dx)) + step;
                            
//                             sum += images[0].pixels[dIndex] * currentKernel[kx][ky];
//                         }
//                     }
//                     // sum = 255;
//                     c.push(sum);       
//                     mxsm = (sum > mxsm) ? sum : mxsm;
//                     this.pg.pixels[4* (y * images[0].width + x) + step] = sum;
//                     colorCount[step][int(sum)]++;
                  
//                     if(colorCount[step][int(sum)] > maxColorCount){
//                       maxColorCount = colorCount[step][int(sum)]
//                       maxColorCountVal = sum
//                     }
//                     // maxColorCount = colorCount[step][int(sum)] > maxColorCount ? colorCount[step][int(sum)] : maxColorCount;
//                     // maxColorCountVal
//                 }
                
                
//                 // this.pg.pixels[y * images[0].width + x] = color(255);
//             }
//         //   print(currentKernel.length)
//         }
//         images[0].updatePixels();
//         this.pg.updatePixels();
//         // print(mxsm, maxColorCount,maxColorCountVal, "done");
//     }
// }

// class HistogramFrame {
//     constructor(x, y, xSize, ySize) {
//         this.x = x;
//         this.y = y;
//         this.xSize = xSize;
//         this.ySize = ySize;
//         this.pg = createGraphics(this.xSize, this.ySize);
//     }

//     show() {
//         push();
//         this.pg.background(0);
//         this.createHistogram();
//         // print(this.x, this.y)
//         image(this.pg, this.x, this.y);
//         pop();
//     }

//     createHistogram(){
//         let barWidth = this.xSize / 255;
//         this.pg.loadPixels();
//         for(let c = 0; c < 3; c++){
//             for(let i = 0; i < 255; i++){
//                 let x = int(map(i, 0, 255, 0, this.xSize));
//                 let currentTone = colorCount[c][i];
//                 // print(x, i, currentTone, this.xSize)
//                 for(let j = 0; j < currentTone; j++){
//                     let y = int(map(j, 0, maxColorCount, this.ySize, 0));
//                     // print(y)
//                     for(let w = 0; w < barWidth; w++)
//                         this.pg.pixels[ 4 * (y * this.xSize + (x + w)) + c] = 255;
//                 }
//             }
//         }
//         this.pg.updatePixels();
//     }
// }

// class MatrixFrame{
//     constructor(x, y, xSize, ySize) {
//         this.x = x;
//         this.y = y;
//         this.xSize = xSize;
//         this.ySize = ySize;
//     }

//     show() {
//         push();
//         this.createMatrix()
//         pop();
//     }

//     createMatrix(){
//         let ck = currentKernel;

//         let spacing = 3;

//         let colSize = this.xSize / ck.length;
//         let rowSize = this.ySize / ck.length;
//         for(let i = 0; i < ck.length; i++){
//             kernel[i] = [];
//             for(let j = 0; j < ck.length; j++){
//                 kernel[i][j] = createInput(ck[i][j], 'number');
//                 kernel[i][j].size(int(colSize - spacing * 2 ), int(rowSize - spacing * 2));
//                 kernel[i][j].position(colSize * i + this.x + spacing, rowSize * j + this.y + spacing);
//                 kernel[i][j].class("input-box")
//                 kernel[i][j].style("display", checkbox.checked() ? "block" : "none")
//                 kernel[i][j].changed(kernelChanged)
//             }
//         }
        
//     }
// }
