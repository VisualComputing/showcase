precision mediump float;

// image is sent by the sketch
uniform sampler2D image;
// symbol1 is sent by the sketch
uniform sampler2D symbol1;

// toggles image display
uniform bool debug;
// target horizontal & vertical resolution
uniform float resolution;

// interpolated color (same name and type as in vertex shader)
varying vec4 vVertexColor;
// interpolated texcoord (same name and type as in vertex shader)
varying vec2 vTexCoord;

void main() {
  // remap symbolCoord to [0.0, resolution] ∈ R
  vec2 symbolCoord = vTexCoord * resolution;
  // remap imageCoord to [0.0, resolution] ∈ Z
  vec2 imageCoord = floor(symbolCoord);
  // remap symbolCoord to [0.0, 1.0] ∈ R
  symbolCoord = symbolCoord - imageCoord;
  // remap imageCoord to [0.0, 1.0] ∈ R
  imageCoord = imageCoord * vec2(1.0) / vec2(resolution);
  // get vec4 color hash index
  vec4 index = texture2D(image, imageCoord);
  // TODO Goal: get symbol1 from hash index
  gl_FragColor = (debug ? index : texture2D(symbol1, symbolCoord)) * vVertexColor;
}