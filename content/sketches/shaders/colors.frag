precision mediump float;

uniform bool grey_scale;
uniform bool average;
uniform bool HSVV;
uniform bool HSLL;
uniform bool Tint;

uniform vec4 colorT;

uniform sampler2D texture;

varying vec2 texcoords2;

float luma(vec3 texel) {
  return 0.299 * texel.r + 0.587 * texel.g + 0.114 * texel.b;
}

float favg(vec3 texel){
  return (texel.r + texel.g + texel.b ) / 3.0;
}

float HSV (vec3 texel){
  return max(max(texel.r,texel.g),texel.b); ;
}

float HSL (vec3 texel){
  float CMax = max(max(texel.r,texel.g),texel.b);
  float CMin = min(min(texel.r,texel.g),texel.b);
  return (CMax + CMin) / 2.0 ;
}

float Ftint(float channel, float color){
  float N = channel * (color / 255.0);
  return N;
}


void main() {
  
  vec4 texel = texture2D(texture, texcoords2);
  
  if(grey_scale == true){
    gl_FragColor = vec4((vec3(luma(texel.rgb))), 1.0); 
  }else if(average == true){
    gl_FragColor = vec4((vec3(favg(texel.rgb))), 1.0); 
  }else if(HSVV== true){
    gl_FragColor = vec4((vec3(HSV(texel.rgb))), 1.0);
  }else if(HSLL== true){
    gl_FragColor = vec4((vec3(HSL(texel.rgb))), 1.0);
  }else if(Tint == true){
    gl_FragColor = vec4(Ftint(texel.r,colorT.x),Ftint(texel.g,colorT.y),Ftint(texel.b,colorT.z),1.0);
  }else{
    gl_FragColor = texel;  
  }
  
}