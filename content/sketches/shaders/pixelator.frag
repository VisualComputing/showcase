precision highp float;

varying vec2 vUV;

uniform sampler2D tex;
uniform float tiles;

void main() {
  vec2 uv = vUV;
  uv.y = 1.0 - uv.y;
  
  uv *= tiles;
  
  uv = floor(uv);
  
  uv /= tiles;
  
  vec4 texColor = texture2D(tex, uv);
  
  gl_FragColor = texColor;
}