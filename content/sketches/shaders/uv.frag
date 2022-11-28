precision mediump float;

// the texture coordinates varying was defined in 
// the vertex shader by treegl readShader()
// open your console and & see!
varying vec2 texcoords2;

void main() {
  // glsl swizzling is both handy and elegant
  // see: https://www.khronos.org/opengl/wiki/Data_Type_(GLSL)#Swizzling
  gl_FragColor = vec4(texcoords2.xy, 0.0, 1.0);
}
