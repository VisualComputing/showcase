precision mediump float;

uniform bool rtb;
uniform bool gtb;
varying vec2 texcoords2;

void main() {
  if(rtb==true){
     gl_FragColor = vec4(0.0 ,texcoords2.y,texcoords2.x, 1.0);
  }else if(gtb==true){
    gl_FragColor = vec4(texcoords2.x , 0.0, texcoords2.y, 1.0);
  }else{
    gl_FragColor = vec4(texcoords2.xy, 0.0, 1.0);
  }
}