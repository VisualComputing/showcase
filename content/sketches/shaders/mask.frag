precision mediump float;

uniform bool maskmode;
uniform bool coloringmode;
uniform bool lensemode;

uniform bool grey_scale;
uniform bool average;
uniform bool HSVV;
uniform bool HSLL;
uniform bool Tint;

uniform vec4 colorT;

uniform sampler2D texture;

uniform vec2 texOffset;
uniform float mask[9];

varying vec2 texcoords2;

uniform vec2 mouseData;
uniform vec2 resolution;

uniform vec4 passerGL;

uniform float radio;
uniform float scale;

//--------------------------------------------------------------------------

float rim = 2.0;
vec2 handview = vec2(10.0,50.0);

vec2 curveGen(vec2 toPow, float dist){
  float x = dist/radio;
  return toPow * (1.0 - x) * exp (-2.0 * x * x);  
}

void Amplify (){
  
  vec2 UV = gl_FragCoord.xy / resolution.xy;
  gl_FragColor = texture2D(texture, UV);
  
  vec2 center = mouseData.xy;
  float dist = distance(gl_FragCoord.xy,center);
  
  vec2 distV = gl_FragCoord.xy - center;
  
  if (dist > radio && dist < radio + rim){
    gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
  }
  
  if(abs(distV.x) < (handview.x / 2.0 ) && abs(distV.y + radio) < (handview.y) && dist >= radio + rim){
    gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
  }
  
  if(dist < radio){
    vec2 trueUV = (gl_FragCoord.xy - (curveGen(distV,dist) * scale)) / resolution.xy ;
    gl_FragColor = texture2D(texture, trueUV);
  }
}

//--------------------------------------------------------------------------

void Convolution(){
  
    vec2 tc0 = texcoords2 + vec2(-texOffset.s, -texOffset.t);
    vec2 tc1 = texcoords2 + vec2(         0.0, -texOffset.t);
    vec2 tc2 = texcoords2 + vec2(+texOffset.s, -texOffset.t);
    vec2 tc3 = texcoords2 + vec2(-texOffset.s,          0.0);
    
    vec2 tc4 = texcoords2 + vec2(         0.0,          0.0);
    vec2 tc5 = texcoords2 + vec2(+texOffset.s,          0.0);
    vec2 tc6 = texcoords2 + vec2(-texOffset.s, +texOffset.t);
    vec2 tc7 = texcoords2 + vec2(         0.0, +texOffset.t);
    vec2 tc8 = texcoords2 + vec2(+texOffset.s, +texOffset.t);

    
    vec4 rgba[9];
    rgba[0] = texture2D(texture, tc0);
    rgba[1] = texture2D(texture, tc1);
    rgba[2] = texture2D(texture, tc2);
    rgba[3] = texture2D(texture, tc3);
    rgba[4] = texture2D(texture, tc4);
    rgba[5] = texture2D(texture, tc5);
    rgba[6] = texture2D(texture, tc6);
    rgba[7] = texture2D(texture, tc7);
    rgba[8] = texture2D(texture, tc8);

  
    vec4 convolution;
    for (int i = 0; i < 9; i++) {
      convolution += rgba[i]*mask[i];
    }

  
    gl_FragColor = vec4(convolution.rgb, 1.0); 
}

//--------------------------------------------------------------------------

float luma(vec3 texel){
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

void Coloring(){
  
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

//--------------------------------------------------------------------------

void main() {
  
  if(maskmode == true){
    Convolution();
  }else if(coloringmode == true){
    Coloring();
  }else if(lensemode == true){
    Amplify();
  }else{
    gl_FragColor = texture2D(texture, texcoords2);
  }
  
}