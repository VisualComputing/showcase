precision mediump float;

uniform bool rtb;
uniform bool gtb;
uniform float opacity;
varying vec2 texcoords2;

void main() {
  if(rtb==true){
     gl_FragColor = vec4(0.0 ,texcoords2.y,texcoords2.x, opacity);
  }else if(gtb==true){
    gl_FragColor = vec4(texcoords2.x , 0.0, texcoords2.y, opacity);
  }else{
    gl_FragColor = vec4(texcoords2.xy, 0.0, opacity);
  }
}