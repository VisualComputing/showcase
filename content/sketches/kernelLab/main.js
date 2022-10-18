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
let inputFile;

let images = [];
let currentImg = 0;

let currentKernel;

let colorCount = [];
let maxColorCount = 0;

let frame;
let histogram;
let matrix;
let measures;

let measureValues = [];
let measuresContents = [];

let matrixDim = 3;

const MARGIN = 0;

let update = true;
let sel;

let kernel = [];

let checkbox;
let checkboxA;
let checkboxM;

let span;

let mMeasures = true;

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
        if (this.useframe) image(this.pg, this.x, this.y);
        pop();
    }

    update() {
        push();
        this.pg.background(this.bg);
        this.proc();
        pop();
    }
}

function preload() {
    images[0] = loadImage("/showcase/sketches/kernelLab/assets/t_640p.jpg");

}

function setup() {

    pixelDensity(1);
    
    let ratio = images[0].height / images[0].width;
    let w = 725;
    images[0].resize(w, w * ratio);

    createCanvas(w, w * ratio + 200);

    parent.resizeIframe(parent.document.getElementsByTagName("iFrame")[0]);

    createUI();
    createFrames();

    currentKernel = [];
    for (let i = 0; i < kernels["identity"].length; i++)
        currentKernel[i] = [...kernels["identity"][i]]
}

function draw() {
    background(52, 58, 64, 255);

    frame.show();
    histogram.show();
    matrix.show();

    if (mouseX > 0 && mouseX < width && mouseY > images[0].height && mouseY < height) {
        span.position(mouseX + 25 - map(mouseX, 0, width, 0, 125), mouseY + 25 - map(mouseY, images[0].height, height, 0, 110))
        let clr = int(map(mouseX, 0, width, 0, 256))
        let count = int(map(mouseY - images[0].height, 0, height - images[0].height, 0, maxColorCount + 1))
        span.html(`Tone: ${clr}\nCount: ${count}`)
    }

    if (!mMeasures) {
        let c = images[0].get(mouseX, mouseY);

        let r = c[0];
        let g = c[1];
        let b = c[2];

        let c1 = color(r, g, b);
        let ms = getMeasures(c1);

        updateMeasures(ms);
    }

    if (!update)
        return;

    frame.update();
    histogram.update();
    matrix.update();

    update = false;
}


function createUI() {
    span = createP("")
    span.class("span-box")

    measures = createDiv('');

    for (let i = 0; i < 9; i++) {
        let content = []

        let msContainer = createDiv('');
        let msLabel = createP('AA');
        let msShowContainer = createDiv('');
        let msValue = createP('X');
        let msDisplay = createSpan('');

        msContainer.class('measure-container');
        msLabel.class('measures-label');
        msShowContainer.class('measures-values-container');
        msValue.class('measures-value');
        msDisplay.class('measures-display');

        measures.child(msContainer);
        msContainer.child(msLabel);
        msContainer.child(msShowContainer);
        msShowContainer.child(msDisplay);
        msDisplay.child(msValue);

        content.push(msLabel, msValue, msDisplay);
        measuresContents.push(content);

    }

    measures.class('measures-container')
    measures.position(10, 210)

    inputFile = createFileInput(handleFile);

    let lbl = createElement('label', 'upload file');
    lbl.child(inputFile)
    lbl.position(10, 10);
    lbl.class("load-file-container")


    textAlign(CENTER);

    sel = createSelect();
    sel.position(10, 50);
    Object.keys(kernels).map(v => {
        sel.option(v);
    });

    sel.selected(Object.keys(kernels)[0]);
    sel.changed(onSelected);
    sel.class("select-box")

    checkbox = createCheckbox('Show Kernel', true);
    checkbox.changed(showKernel);
    checkbox.position(10, 90);
    checkbox.class("checkbox-box")

    checkboxA = createCheckbox('Mean measures', true);
    checkboxA.changed(meanMeasures);
    checkboxA.position(10, 130);
    checkboxA.class("checkbox-box")

    checkboxM = createCheckbox('Show measures', true);
    checkboxM.changed(showMeasures);
    checkboxM.position(10, 170);
    checkboxM.class("checkbox-box")
}

function createFrames() {
    frame = new Frame(0, 0, images[0].width, images[0].height, convolution, true, color(0));
    histogram = new Frame(0, images[0].height, images[0].width, 200, createHistogram, true, color(52, 58, 64, 255));
    matrix = new Frame(width - 250 - 10, 7, 250, 250, createMatrix, false, color(0));
}

function handleFile(file) {
    if (file.type === 'image') {
        images[0] = loadImage(file.data, img => {
            let ratio = images[0].height / images[0].width;
            let w = width;
            images[0].resize(w, w * ratio);

            resizeCanvas(w, w * ratio + 200);
            parent.resizeIframe(parent.document.getElementsByTagName("iFrame")[0]);
            createFrames();

            kernel.map(x => x.map(y => y.remove()));
            kernel = [];

            update = true;
        });
    } else {
        images[0] = null;
    }
}

function onSelected() {
    currentKernel = [];
    for (let i = 0; i < kernels[sel.value()].length; i++)
        currentKernel[i] = [...kernels[sel.value()][i]]

    kernel.map(x => x.map(y => y.remove()));
    kernel = [];

    update = true;
}

function showKernel() {
    kernel.map(x => x.map(y => {
        y.style("display", checkbox.checked() ? "block" : "none");
    }))
}

function showMeasures() {
    measures.style("display", checkboxM.checked() ? "grid" : "none");
}

function kernelChanged() {
    for (let i = 0; i < kernel.length; i++) {
        for (let j = 0; j < kernel.length; j++) {
            currentKernel[i][j] = kernel[i][j].value();
        }
    }
    kernel.map(x => x.map(y => y.remove()));
    kernel = [];
    update = true;
}

function convolution() {
    let mxsm = 0;
    this.pg.loadPixels();
    images[0].loadPixels();

    let d = pixelDensity();

    colorCount = [];

    colorCount[0] = new Array(256).fill(0);
    colorCount[1] = new Array(256).fill(0);
    colorCount[2] = new Array(256).fill(0);

    maxColorCount = 0;

    measureValues = new Array(9).fill(0);

    for (let x = 0; x < images[0].width; x++) {
        for (let y = 0; y < images[0].height; y++) {

            let ci = 4 * (y * images[0].width + x);

            for (let step = 0; step < 4; step++) {
                if (step == 3) {
                    let ri = this.pg.pixels[ci]
                    let gi = this.pg.pixels[ci + 1]
                    let bi = this.pg.pixels[ci + 2]

                    let meas = getMeasures(color(ri, gi, bi));

                    for (let i = 0; i < 9; i++)
                        measureValues[i] += meas[i];

                    continue;
                }


                let sum = 0;

                for (let kx = 0; kx < currentKernel.length; kx++) {
                    for (let ky = 0; ky < currentKernel[0].length; ky++) {
                        let dx = kx - floor(currentKernel.length / 2);
                        let dy = ky - floor(currentKernel.length / 2);


                        let dIndex = 4 * ((y * d + dy) * this.pg.width + (x + dx)) + step;

                        sum += images[0].pixels[dIndex] * currentKernel[kx][ky];
                    }
                }
                sum = sum > 255 ? 255 : sum < 0 ? 0 : sum;
                mxsm = (sum > mxsm) ? sum : mxsm;
                this.pg.pixels[ci + step] = sum;



                colorCount[step][int(sum)]++;

                if (colorCount[step][int(sum)] > maxColorCount) {
                    maxColorCount = colorCount[step][int(sum)]
                }
            }
        }
    }
    images[0].updatePixels();
    this.pg.updatePixels();

    for (let i = 0; i < 9; i++) measureValues[i] /= images[0].width * images[0].height;

    updateMeasures(measureValues)
}

function createHistogram() {
    let barWidth = this.xSize / 255;
    this.pg.loadPixels();

    let d = pixelDensity();

    for (let c = 0; c < 3; c++) {
        for (let i = 0; i <= 255; i++) {
            let x = int(map(i, 0, 256, 0, this.xSize));
            let currentTone = colorCount[c][i];
            for (let j = 0; j < currentTone; j++) {
                let y = int(map(j, 0, maxColorCount, 0, this.ySize));
                for (let w = 0; w < barWidth; w++)
                    this.pg.pixels[4 * ((y * d) * this.xSize + (x + w)) + c] = 255;
            }
        }
    }
    this.pg.updatePixels();
}

function createMatrix() {
    let ck = currentKernel;

    let spacing = 3;

    let colSize = this.xSize / ck.length;
    let rowSize = this.ySize / ck.length;
    for (let i = 0; i < ck.length; i++) {
        kernel[i] = [];
        for (let j = 0; j < ck.length; j++) {
            kernel[i][j] = createInput(ck[i][j], 'number');
            kernel[i][j].size(int(colSize - spacing * 2), int(rowSize - spacing * 2));
            kernel[i][j].position(colSize * i + this.x + spacing, rowSize * j + this.y + spacing);
            kernel[i][j].class("input-box")
            kernel[i][j].style("display", checkbox.checked() ? "block" : "none")
            kernel[i][j].changed(kernelChanged)
        }
    }
}

function meanMeasures() {
    mMeasures = checkboxA.checked();

    if (checkboxA.checked())
        updateMeasures(measureValues);
}

function getMeasures(c) {
    let r = red(c);
    let g = green(c);
    let b = blue(c);

    // hue
    let hu = hue(c);

    // saturation
    let sat = saturation(c);

    // lightness 
    let light = lightness(c);

    // Brightness
    let bright = brightness(c);

    // luma
    let luma = 0.299 * r + 0.587 * g + 0.114 * b

    // chroma
    let cM = max(r, max(g, b));
    let cm = min(r, min(g, b));
    let chroma = cM - cm;

    return [r, g, b, map(hu, 0, 360, 0, 255), map(sat, 0, 100, 0, 255), map(light, 0, 100, 0, 255), map(bright, 0, 100, 0, 255), luma, chroma];
}

function updateMeasures(meas) {
    // label, value, display

    let labels = ['r', 'g', 'b', 'h', 's', 'l', 'b', 'y', 'c']

    for (let i = 0; i < 9; i++) {
        let label = labels[i];
        let measure = meas[i];

        measuresContents[i][0].html(label);
        measuresContents[i][1].html(int(measure));
        // measuresContents[i][2].style('background-color', `rgb(${measure}, ${measure}, ${measure})`)
    }

    measuresContents[0][2].style('background-color', `rgb(${meas[0]}, ${0}, ${0})`)
    measuresContents[1][2].style('background-color', `rgb(${0}, ${meas[1]}, ${0})`)
    measuresContents[2][2].style('background-color', `rgb(${0}, ${0}, ${meas[2]})`)

    colorMode(HSB, 255, 100, 100);
    let h = color(meas[3], 80, 80)
    measuresContents[3][2].style('background-color', `rgb(${red(h)}, ${green(h)}, ${blue(h)})`)

    colorMode(RGB);


    measuresContents[4][2].style('background-color', `rgb(${meas[4]}, ${meas[4]}, ${meas[4]})`)
    measuresContents[5][2].style('background-color', `rgb(${meas[5]}, ${meas[5]}, ${meas[5]})`)
    measuresContents[6][2].style('background-color', `rgb(${meas[6]}, ${meas[6]}, ${meas[6]})`)
    measuresContents[7][2].style('background-color', `rgb(${meas[7]}, ${meas[7]}, ${meas[7]})`)
    measuresContents[8][2].style('background-color', `rgb(${meas[8]}, ${meas[8]}, ${meas[8]})`)
}

