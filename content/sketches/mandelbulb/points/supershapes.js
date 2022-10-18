const detX = 50;
const detY = 50;
const detZ = 50;

const LIMIT = 2;
const ITERATIONS = 10;

const VIEWS_EXP = 1;
let VIEWS = 0;

let N = 8;

let shape = [];

let mandelbulbShader;
let pg;

let cams = [];
let graphics = [];

let cube;

let deltaN = 0.008;

let cptStp = false;

function setup() {

    pixelDensity(1);

    createCanvas(725, 725);

    let k = 0;

    VIEWS = pow(4, VIEWS_EXP);

    const cr = VIEWS / 2;

    for (let i = 0; i < cr; i++) {
        for (let j = 0; j < cr; j++) {
            graphics[k] = createGraphics(width, height, WEBGL);
            cams[k] = createEasyCam(graphics[k]._renderer, { distance: 400});

            let x1 = map(i, 0, cr, 0, width);
            let y1 = map(j, 0, cr, 0, height);
            
            cams[k].setViewport([x1, y1, width / 2, height / 2]);

            if(k == 3) continue;

            cams[k].attachMouseListeners(this._renderer);

            cams[k].rotateY(cos(map(k, 0, VIEWS, 0, 360)));
            cams[k].rotateZ(sin(map(k, 0, VIEWS, 0, 360)) * cos(map(k, 0, VIEWS, 0, 360)));

            k++;
        }
    }

    mandelbulb();
}

function draw() {
    background(0);

    drawShape();
}

function drawShape() {
    for (let i = 0; i < VIEWS; i++) {
        pg = cams[i].graphics;

        pg.background(map(i, 0, VIEWS, 20, 80));
        pg.reset();

        if(i == 3) {
            pg.rotateY(sin(frameCount * 0.1));
            pg.rotateZ(cos(frameCount * 0.1));
        }

        pg.push();
        pg.translate(-100, -100, -100)
        pg.axes({ size: 200 });
        pg.pop();

        pg.push();
        shape.forEach(p => {
            pg.push();
            pg.noStroke();
            pg.fill(255);

            pg.translate(p.x, p.y, p.z);
            pg.sphere(1);

            pg.pop();
        })
        pg.pop();


        beginHUD();
        let vp = cams[i].getViewport();
        image(pg, vp[0], vp[1], vp[2], vp[3]);
        endHUD();
    }
}

function mandelbulb() {
    for (let i = 0; i <= detX; i++) {
        const x = map(i, 0, detX, -1, 1);

        for (let j = 0; j <= detY; j++) {
            const y = map(j, 0, detY, -1, 1);

            let edge = false;
            for (let k = 0; k <= detZ; k++) {
                const z = map(k, 0, detZ, -1, 1);

                let v = createVector(x, y, z);
                let c;

                let isBounded = true;

                let l = 0;
                while (isBounded && l < ITERATIONS) {
                    const ny = nylander(v.x, v.y, v.z, N);

                    c = v.copy();
                    v = ny[0].add(c);

                    isBounded = ny[1] < LIMIT;

                    if (!isBounded)
                        edge = edge ? false : edge;


                    l++;
                }

                if (isBounded) {
                    if (!edge) {
                        edge = true;
                        shape.push(createVector(x * 100, y * 100, z * 100));
                    }
                }
            }
        }
    }
}

function nylander(x, y, z, n) {
    const r = sqrt(x * x + y * y + z * z);
    const f = atan2(y, x);
    const t = acos(z / r);

    const x1 = pow(r, n) * sin(t * n) * cos(f * n);
    const y1 = pow(r, n) * sin(t * n) * sin(f * n);
    const z1 = pow(r, n) * cos(t * n);

    return [createVector(x1, y1, z1), r];
}