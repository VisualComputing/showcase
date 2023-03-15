let img;
var factor=1; //If it is equal to 1 and there is a gray filter there will be only two colors. 
var wd;
var d;


function preload() {
    img = loadImage('/showcase/gato.jpg');
}

function setup() {
    let c=createCanvas(img.width,img.height);
    background(255, 255, 255);
    pixelDensity(1);
    image(img,0,0);
    filter(GRAY);  
    wd=img.width;
    loadPixels();
    d = pixelDensity();
    for (let y = 0; y < height-1; y++) {
        for (let x = 1; x < width-1; x++){

            var index = getIndex(x,y);
            
            var r=  pixels[index];
            var g=  pixels[index + 1];
            var b=  pixels[index + 2];
            var a=  pixels[index + 3];

            var newR=find_closest_palette_color(r);
            var newG=find_closest_palette_color(g);
            var newB=find_closest_palette_color(b);
            var newA=  find_closest_palette_color(a);

            pixels[index] = newR;
            pixels[index + 1] = newG;
            pixels[index + 2] = newB;
            pixels[index + 3] = newA;


            //Calculating quantization error of a pixel.
            var quant_error_R=r-newR;
            var quant_error_G=g-newG;
            var quant_error_B=b-newB;
            var quant_error_A=a-newA;

            //
            index = getIndex(x+1,y);
            r=  pixels[index]+(quant_error_R*7/16.0);
            g=  pixels[index + 1]+(quant_error_G*7/16.0);
            b=  pixels[index + 2]+(quant_error_B*7/16.0);
            a=  pixels[index + 3]+(quant_error_A*7/16.0);
            pixels[index] = r;
            pixels[index + 1] = g;
            pixels[index + 2] = b;
            pixels[index + 3] = a;

            index = getIndex(x-1,y+1);
            r=  pixels[index]+(quant_error_R*3/16.0);
            g=  pixels[index + 1]+(quant_error_G*3/16.0);
            b=  pixels[index + 2]+(quant_error_B*3/16.0);
            a=  pixels[index + 3]+(quant_error_A*3/16.0);
            pixels[index] = r;
            pixels[index + 1] = g;
            pixels[index + 2] = b;
            pixels[index + 3] = a;

            index = getIndex(x,y+1);
            r=  pixels[index]+(quant_error_R*5/16.0);
            g=  pixels[index + 1]+(quant_error_G*5/16.0);
            b=  pixels[index + 2]+(quant_error_B*5/16.0);
            a=  pixels[index + 3]+(quant_error_A*5/16.0);
            pixels[index] = r;
            pixels[index + 1] = g;
            pixels[index + 2] = b;
            pixels[index + 3] = a;

            index = getIndex(x+1,y+1);
            r=  pixels[index]+(quant_error_R*1/16.0);
            g=  pixels[index + 1]+(quant_error_G*1/16.0);
            b=  pixels[index + 2]+(quant_error_B*1/16.0);
            a=  pixels[index + 3]+(quant_error_A*1/16.0);
            pixels[index] = r;
            pixels[index + 1] = g;
            pixels[index + 2] = b;
            pixels[index + 3] = a;
        }
      }
    updatePixels();
}

//Operación de cuantización. 
function find_closest_palette_color(old){
    return round(factor*old/255)*(255/factor)
}

//Retorna la posición (x,y) de un píxel. 
function getIndex(x,y){
    return (x+(y*wd))*4;
}
