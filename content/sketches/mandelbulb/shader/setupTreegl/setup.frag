precision highp float;
varying vec2 position2;

uniform float b;

void main() {
    vec2 uv = (position2 + 1.) / 2.;

    gl_FragColor = vec4(vec3(uv, b), 1.);
}