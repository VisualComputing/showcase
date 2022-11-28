precision mediump float;

uniform sampler2D texture;
uniform vec2 u_resolution;

void main() {
  vec2 st = gl_FragCoord.xy / u_resolution;
  gl_FragColor = texture2D(texture, vec2(st.s, 1.0 - st.t));
}