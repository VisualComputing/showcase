precision mediump float;

const int num_images = 40;

// source (image or video) is sent by the sketch
uniform sampler2D source;

// palette is sent by the sketch
uniform sampler2D palette;
// number of cols are sent by sketch
uniform float cols;

uniform float lumas[num_images];
uniform float red_palette[num_images];
uniform float green_palette[num_images];
uniform float blue_palette[num_images];

// toggles debug
uniform bool debug;

// toggles coloring
uniform bool color_on;
uniform vec4 background;
uniform vec4 foreground;

// target horizontal & vertical resolution
uniform float resolution;

// interpolated color (same name and type as in vertex shader)
varying vec4 vVertexColor;
// interpolated texcoord (same name and type as in vertex shader)
varying vec2 vTexCoord;

float luma(vec3 color) {
  return (0.299 * color.r + 0.587 * color.g + 0.114 * color.b);
}

void main() {
  vec2 fontCoord = vTexCoord * resolution;
  vec2 srcCoord = floor(fontCoord);
  fontCoord = fontCoord - srcCoord;
  srcCoord = srcCoord / vec2(resolution);
  float mid = 1.0/(2.0*resolution);
  srcCoord = srcCoord + vec2(mid);

  vec4 key = texture2D(source, srcCoord);
  if (debug) {
    gl_FragColor = key;
  } else {
    // fontCoord.x :-> offset + x
    // 1. offset
    // luma(key.rgb) * cols) : remap luma to [0.0, cols] ∈ R
    // floor(luma(key.rgb) * cols)) : remap luma to [0.0, cols] ∈ Z
    // floor(luma(key.rgb) * cols)) / cols : remap luma to [0.0, 1.0] ∈ R
    // 2. x (1 / cols : quadrille cell width)
    // fontCoord.x / cols : remap fontCoord.x to [0.0, 1 / cols] ∈ R
    //vec2 tile = vec2((floor(luma(key.rgb) * cols) + fontCoord.x) / cols, fontCoord.y);

    float lumakey = luma(key.rgb);
    float selected = 0.0;
    /*for( int i = 0 ; i < 18; i += 1)
    {
      if((lumas[i]/255.0) < lumakey){
        selected = float(i);
      }
    }*/

    bool complete = false;
    for(float j = 0.02; j <= 0.5; j += 0.02){
      for(int i = 0 ; i < num_images; i ++)
      {
        if((red_palette[i]/255.0> (key.r - j) && red_palette[i]/255.0 < (key.r + j)) && (green_palette[i]/255.0> (key.g - j) && green_palette[i]/255.0 < (key.g + j)) && (blue_palette[i]/255.0> (key.b - j) && blue_palette[i]/255.0 < (key.b + j))){
          selected = float(i);
          complete = true;
          break;
        }
      }
      if(complete){
        break;
      }
    }
    
    vec2 tile = vec2((floor(selected) + fontCoord.x) / cols, fontCoord.y);

    vec4 paletteTexel = texture2D(palette, tile);
    gl_FragColor = paletteTexel;
  }
}