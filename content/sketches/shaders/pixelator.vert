attribute vec3 aPosition;
attribute vec2 aTexCoord;

varying vec2 vUV;

void main() {
  // copy the texcoords into the varying
  vUV = aTexCoord;
  
  vec4 position = vec4(aPosition, 1.0);
  // swizzling 
  position.xy = position.xy * 2.0 - 1.0;
  gl_Position = position;