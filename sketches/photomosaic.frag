precision mediump float;

// img (image or video) is sent by the sketch
uniform sampler2D img;
// om is sent by the sketch
uniform sampler2D om;

// toggles om display
uniform bool om_on;
// target horizontal & vertical resolution
uniform float resolution;

// interpolated color (same name and type as in vertex shader)
varying vec4 vVertexColor;
// interpolated texcoord (same name and type as in vertex shader)
varying vec2 vTexCoord;

void main() {
  // remap omCoord to [0.0, resolution] ∈ R
  vec2 omCoord = vTexCoord * resolution;
  // remap texCoord to [0.0, resolution] ∈ Z
  vec2 texCoord = floor(omCoord);
  // remap omCoord to [0.0, 1.0] ∈ R
  omCoord = omCoord - texCoord;
  // remap texCoord to [0.0, 1.0] ∈ R
  texCoord = texCoord * vec2(1.0) / vec2(resolution);
  // get vec4 image texel (may be used as color hash index by some apps)
  vec4 imgTexel = texture2D(img, texCoord);
  if(om_on) {
    vec4 fallback = vec4(0.0, 0.0, 0.0, 0.0);
    vec4 black = vec4(0.0, 0.0, 0.0, 1.0);
    vec4 omTexel = texture2D(om, omCoord);
    vec4 threshold = vec4(0.1);
    gl_FragColor = all(lessThan(abs(omTexel - black), threshold)) ? imgTexel : fallback;
  }
  else {
    gl_FragColor = imgTexel;
  }
}