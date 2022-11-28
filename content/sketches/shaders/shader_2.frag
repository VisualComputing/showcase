#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float plot(vec2 st, float pct){
  return 0.0 ;
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution;
    
	vec2 mt = vec2(sin(u_time),cos(u_time));
    
    float y = sin(st.x*PI*3.000);
	float altura = abs( pow(mt.x*cos(st.x*PI*2.4),3.0)
                       +pow(mt.y*sin(st.y*PI*2.040),2.0));
    vec3 color = vec3(altura);
	
    float pct = plot(st,y);
    color = (1.0-pct)*color+pct*vec3(0.524,0.570,0.565);

    gl_FragColor = vec4(color.rg,1.144,0.944);
}