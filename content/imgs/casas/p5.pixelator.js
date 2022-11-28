/*

  Pixelator
  p5.pixelator.js

  a p5.js library, based on the idea of sorting images
  by its brightness and using them as pixels
  to reproduce the canvas source.

  by:
  Ksawery Kirklewski
  Marek Pepke

  www.ksawerykomputery.pl/tools/pixelator

*/


!function () {
  'use strict'

  const count = 64;
  const W = 1024;
  var H = 1024;

  function getBrightness(r, g, b) {
    return Math.sqrt(0.299*r*r + 0.587*g*g + 0.114*b*b )
  }
  function compareBrightness(a, b) {
    return a.brightness - b.brightness;
  }
  function calcImageBrightness(img) {
    let sum = 0;
    img.loadPixels();
    for(let i=0; i<img.pixels.length/4; i++) sum += getBrightness(img.pixels[i*4], img.pixels[i*4+1], img.pixels[i*4+2]);
    return sum;
  }
  function mix(a, b, m) {
    return a + (b-a) * m;
  }

  class Pixelator {

    calcBrightness() {
      var pixels = this.inGraphics.pixels
      this.brightnessArr = [];
      for(let x=0; x<count; x++) {
        this.brightnessArr[x] = [];
        for(let y=0; y<count; y++) {
          let ind = y * count + x;
          this.brightnessArr[x][y] = getBrightness( pixels[ind*4], pixels[ind*4+1], pixels[ind*4+2] ) | 0;
        }
      }
    }

    isSimilar(x, y, w, h) {
      let result = true
      let maxDif = this.settings.tolerance * 128;
      let sum = 0;
      for(let a=0; a<w; a++)
        for(let b=0; b<h; b++)
          sum += this.brightnessArr[x+a][y+b];
      let average = Math.floor( sum / w / h );
      for(let a=0; a<w; a++) {
        for(let b=0; b<h; b++) {
          let bright = this.brightnessArr[x+a][y+b];
          if( Math.abs(bright-average) > maxDif ) return -1;
        }
      }
      return average;
    }

    grouper(x, y, w, h) {
      if( w > 1 && h > 1 ) {
        let m = this.isSimilar(x, y, w, h);
        if( m >= 0 ) {
          this.drawSprite(x, y, w, h, m);
        } else {
          let m1 = this.isSimilar(x, y, w, h/2);
          let m2 = this.isSimilar(x, y+h/2, w, h/2);
          if( m1 >= 0 && m2 >= 0) {
            this.drawSprite(x, y, w, h/2, m1);
            this.drawSprite(x, y+h/2, w, h/2, m2);
          } else {
            let m3 = this.isSimilar(x, y, w/2, h);
            let m4 = this.isSimilar(x+w/2, y, w/2, h);
            if( m3 >= 0 && m4 >= 0) {
              this.drawSprite(x, y, w/2, h, m3);
              this.drawSprite(x+w/2, y, w/2, h, m4);
            } else {
              if(m1 >= 0) {
                this.drawSprite(x, y, w, h/2, m1);
              } else {
                this.grouper(x, y, w/2, h/2);
                this.grouper(x+w/2, y, w/2, h/2);
              }
              if(m2 >= 0) {
                this.drawSprite(x, y+h/2, w, h/2, m2);
              } else {
                this.grouper(x, y+h/2, w/2, h/2);
                this.grouper(x+w/2, y+h/2, w/2, h/2);
              }
            }
          }
        }
      } else {
        this.drawSprite( x, y, w, h, this.brightnessArr[x][y] );
      }
    }

    drawSprite(x, y, w, h, c) {

      let range = this.settings.range * this.settings.range * 255;
      let g = 255/range;
      c = int( int(map(c, 0, 255, 0, range )) * g );
      c = constrain(c, 0, 255);

      if(this.settings.type) {
        this.outGraphics.image(this.sprites[c].img, x * this.bW | 0, y * this.bH | 0, w * this.bW | 0, h * this.bH | 0);
      } else {
        this.outGraphics.strokeWeight(2)
        var hexC = ('0' + (c | 0).toString(16)).slice(-2)
        this.outGraphics.drawingContext.fillStyle = '#' + hexC + hexC + hexC
        this.outGraphics.drawingContext.fillRect( x * this.bW | 0, y * this.bH | 0, w * this.bW | 0, h * this.bH | 0);
        this.outGraphics.drawingContext.strokeRect( x * this.bW | 0, y * this.bH | 0, w * this.bW | 0, h * this.bH | 0);
      }
    }

    generateSprites() {
      let arr = [];
      for(let i=0; i<256; i++) {
        arr[i] = {};
        arr[i].img = this.newSprite(i);
        arr[i].brightness = calcImageBrightness(arr[i].img);
      }
      arr.sort(compareBrightness);
      return arr;
    }

    newSprite(i) {

      let img;

      if(this.settings.type == "image") {

        let x = i % 16;
        let y = floor( i / 16 );
        let tW = this.settings.image.width / 16;
        let tH = this.settings.image.height / 16;
        img = this.settings.image.get(x * tW, y * tH, tW, tH);
        img.resize(128,128);

      } else if(this.settings.type == "gradients") {

        let c1 = random( this.settings.palette );
        let c2 = random( this.settings.palette );
        let s = random(0.3);
        let e = random(0.6,1);

        let R1 = red(c1);
        let G1 = green(c1);
        let B1 = blue(c1);
        let R2 = red(c2);
        let G2 = green(c2);
        let B2 = blue(c2);
        let dR = R2 - R1;
        let dG = G2 - G1;
        let dB = B2 - B1;

        img = random(1) > 0.5 ? createGraphics(128,1) : createGraphics(1,128);
        img.pixelDensity(1);
        img.background(100);
        img.noStroke();
        img.loadPixels();
        for(let i=0; i<128; i++) {
          let m = constrain(map(i/128, s, e, 0, 1), 0, 1);
          img.pixels[4*i] = mix(R1, R2, m);
          img.pixels[4*i+1] = mix(G1, G2, m);
          img.pixels[4*i+2] = mix(B1, B2, m);
        }
        img.updatePixels();


      } else if(this.settings.type == "blocks") {

        let w = W / 8;
        let h = H / 8;
        img = createGraphics(w, h);
        let r1 = random( this.settings.palette );
        let r2 = random( this.settings.palette );
        let r3 = random( this.settings.palette );
        img.background(r1);
        img.noStroke();
        img.fill(r2);

        switch( floor(random(16)) ) {
          case 0:
            img.beginShape();
            img.vertex(w,0);
            img.vertex(w,h);
            img.vertex(0,h/2);
            img.endShape(CLOSE);
            break;

          case 1:
            img.ellipse(w/2,h/2,w*0.9,h*0.9);
            break;

          case 2:
            img.beginShape();
            img.vertex(0,0);
            img.vertex(w/2,h/2);
            img.vertex(0,h);
            img.endShape(CLOSE);
            img.fill(r3);
            img.beginShape();
            img.vertex(w/2,h/2);
            img.vertex(w,h);
            img.vertex(w,0);
            img.endShape(CLOSE);
            break;

          case 3:
            img.rect(0,0,w,h/2);
            break;

          case 4:
            img.rect(0,0,w,h/4);
            img.fill(r3);
            img.rect(0,h/2,w,h/4);
            break;

          case 5:
            img.rect(0,0,w/2,h);
            break;

          case 6:
            img.rect(0,0,w/4,h);
            img.fill(r3);
            img.rect(w/2,0,w/4,h);
            break;

          case 7:
            img.beginShape();
            img.vertex(w/2,0);
            img.vertex(w,h/2);
            img.vertex(w/2,h);
            img.vertex(0,h/2);
            img.endShape(CLOSE);
            break;

          case 8:
            img.beginShape();
            img.vertex(0,0);
            img.vertex(w,h);
            img.vertex(0,h);
            img.endShape(CLOSE);
            break;

          case 9:
            img.beginShape();
            img.vertex(w,0);
            img.vertex(w,h);
            img.vertex(0,h);
            img.endShape(CLOSE);
            break;

          case 10:
            img.beginShape();
            img.vertex(w/2,0);
            img.vertex(w,h/2);
            img.vertex(0,h/2);
            img.endShape(CLOSE);
            img.beginShape();
            img.vertex(w/2,h/2);
            img.vertex(w,h);
            img.vertex(0,h);
            img.endShape(CLOSE);
            break;

          case 11:
            img.beginShape();
            img.vertex(0,0);
            img.vertex(w,0);
            img.vertex(w/2,h/2);
            img.endShape(CLOSE);
            img.beginShape();
            img.vertex(0,h/2);
            img.vertex(w,h/2);
            img.vertex(w/2,h);
            img.endShape(CLOSE);
            break;

          case 12:
            img.beginShape();
            img.vertex(0,0);
            img.vertex(w/2,0);
            img.vertex(w/4,h);
            img.endShape(CLOSE);
            img.beginShape();
            img.vertex(w/2,0);
            img.vertex(w,0);
            img.vertex(w*3/4,h);
            img.endShape(CLOSE);
            break;

          case 13:
            img.rect(0,0,w/2,h/2);
            img.rect(w/2,h/2,w/2,h/2);
            break;

          case 14:
            img.beginShape();
            img.vertex(0,0);
            img.vertex(w,h/2);
            img.vertex(0,h/2);
            img.endShape(CLOSE);
            img.beginShape();
            img.vertex(0,h/2);
            img.vertex(w,h);
            img.vertex(0,h);
            img.endShape(CLOSE);
            break;

          case 15:
            img.beginShape();
            img.vertex(w,0);
            img.vertex(w,h/2);
            img.vertex(0,h/2);
            img.endShape(CLOSE);
            img.beginShape();
            img.vertex(w,h/2);
            img.vertex(w,h);
            img.vertex(0,h);
            img.endShape(CLOSE);
            break;
        }

      }
      if (img.canvas.parentElement) img.canvas.parentElement.removeChild(img.canvas)
      return img;
    }

    constructor(p, graphics,  settings = {}) {
      this.inGraphicsRaw = graphics
      this.settings = settings
      this.settings.range = this.settings.range || 1
      this.settings.tolerance = this.settings.tolerance || 0.2
      this.p = p
      this.inGraphics = this.p.createGraphics(count, count)
      this.inGraphics.pixelDensity(1)
      this.bW = W / count;
      this.bH = Math.round(this.bW * this.inGraphicsRaw.height / this.inGraphicsRaw.width);
      H = this.bH * count;
      this.width = W;
      this.height = H;
      this.outGraphics = this.p.createGraphics(W, H)
      this.outGraphics.pixelDensity(1)
      if (this.settings.type) this.sprites = this.generateSprites();
      this.outGraphics.canvas.style.display = 'block';
    }

    parent(p) {
      document.querySelector('#'+p).appendChild(this.outGraphics.canvas);
    }

    hide() {
      this.outGraphics.canvas.style.display = 'none';
    }

    remove() {
      this.outGraphics.canvas.remove();
    }

    changeSource(src) {
      this.inGraphicsRaw = src;
    }

    set(settings = {}) {
      if (settings.range != null) this.settings.range = settings.range;
      if (settings.tolerance != null) this.settings.tolerance = settings.tolerance;
      if (settings.type) {
        this.settings.type = settings.type;
        this.settings.palette = settings.palette || this.settings.palette;
        this.settings.image = settings.image || this.settings.image;
        this.sprites = this.generateSprites();
      }
    }

    clear() {
      this.settings.type = '';
    }

    update() {
      this.inGraphics.image(this.inGraphicsRaw, 0, 0, count, count)
      this.inGraphics.loadPixels()
      this.calcBrightness()
      this.grouper(0, 0, count, count)
      this.mouseX = ( mouseX - this.outGraphics.canvas.offsetLeft ) / this.outGraphics.canvas.offsetWidth;
      this.mouseY = ( mouseY + document.body.scrollTop - this.outGraphics.canvas.offsetTop ) / this.outGraphics.canvas.offsetHeight;
    }

    get graphics() {
      return this.outGraphics
    }
  }

  window.Pixelator = Pixelator
}();
