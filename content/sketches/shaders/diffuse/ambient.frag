precision mediump float;

// emitted by p5 color-group commands
// https://p5js.org/reference/#group-Color
uniform vec4 uMaterialColor;

uniform float ambient;
uniform vec4 uColor;
void main() {
  gl_FragColor = ambient *( uMaterialColor * uColor);
}