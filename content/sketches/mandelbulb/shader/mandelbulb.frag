precision highp float;
varying vec2 vPos;
uniform vec2 p;
uniform float r;
const int I = 500;

const int detX = 200;
const int detY = 200;
const int detZ = 200;

const int MAX_RAY_STEPS = 100;
const float MIN_MARCH_DISTANCE = 0.000000001;
const float MAX_MARCH_DISTANCE = 100.;

const float ABSORPTION_COEFFICIENT = 1.;
const int MAX_ITERATIONS = 10;

uniform bool VOLUMETRIC_RENDER;

uniform float LIMIT;
uniform float N;

// varying vec3 position3;
varying vec2 position2;
varying vec2 texcoords2;

uniform float WIDTH;
uniform float HEIGHT;

uniform vec3 cameraCenter;
uniform vec4 cameraRotation;
uniform float cameraDistance;

uniform mat3 mMatrix;

uniform int time;

// --------------------------------------------//
//               Noise Functions
// --------------------------------------------//
// Taken from Inigo Quilez's Rainforest ShaderToy:
// https://www.shadertoy.com/view/4ttSWf
float hash1(float n) {
    return fract(n * 17.0 * fract(n * 0.3183099));
}

// Taken from Inigo Quilez's Rainforest ShaderToy:
// https://www.shadertoy.com/view/4ttSWf
float noise(in vec3 x) {
    vec3 p = floor(x);
    vec3 w = fract(x);

    vec3 u = w * w * w * (w * (w * 6.0 - 15.0) + 10.0);

    float n = p.x + 317.0 * p.y + 157.0 * p.z;

    float a = hash1(n + 0.0);
    float b = hash1(n + 1.0);
    float c = hash1(n + 317.0);
    float d = hash1(n + 318.0);
    float e = hash1(n + 157.0);
    float f = hash1(n + 158.0);
    float g = hash1(n + 474.0);
    float h = hash1(n + 475.0);

    float k0 = a;
    float k1 = b - a;
    float k2 = c - a;
    float k3 = e - a;
    float k4 = a - b - c + d;
    float k5 = a - c - e + g;
    float k6 = a - b - e + f;
    float k7 = -a + b + c - d + e - f - g + h;

    return -1.0 + 2.0 * (k0 + k1 * u.x + k2 * u.y + k3 * u.z + k4 * u.x * u.y + k5 * u.y * u.z + k6 * u.z * u.x + k7 * u.x * u.y * u.z);
}

const mat3 m3 = mat3(0.00, 0.80, 0.60, -0.80, 0.36, -0.48, -0.60, -0.48, 0.64);

// Taken from Inigo Quilez's Rainforest ShaderToy:
// https://www.shadertoy.com/view/4ttSWf
float fbm_4(in vec3 x) {
    float f = 0.2;
    float s = 0.5;
    float a = 0.0;
    float b = 0.5;
    for(int i = 0; i < 4; i++) {
        float n = noise(x);
        a += b * n;
        b *= s;
        x = f * m3 * x;
    }
    return a;
}

float map(float value, float istart, float istop, float ostart, float ostop) {
    return ostart + (ostop - ostart) * ((value - istart) / (istop - istart));
}

float BeerLambert(float absorbtionCoeficient, float distanceTraveled) {
    return exp(-absorbtionCoeficient * distanceTraveled);
}

mat2 Rotate(float angle) {
    float s = sin(angle);
    float c = cos(angle);

    return mat2(c, -s, s, c);
}

float mandelbulbVertex(vec3 pos) {
    vec3 p = pos;

    float r = 0.;
    float dw = 1.0;
    vec3 w = p;

    for(int l = 0; l < MAX_ITERATIONS; l++) {
        // r = length(rotate(z));

        dw = pow(r, float(N) - 1.) * float(N) * dw + 1.;

        r = length(w);
        float f = atan(w.y, w.x);
        float t = acos(w.z / r);

        float zr = pow(r, float(N));
        t *= float(N);
        f *= float(N);

        w = p + zr * vec3(sin(t) * cos(f), sin(t) * sin(f), cos(t));

        if(r > 2.)
            break;
    }

    // float dist = 0.8 * log(r) * r / dw;
    float bandFactor = map(cameraDistance, 500., 300., 0.5, 1.);
    float dist = bandFactor * log(r) * r / dw;

    // return dist > 1. ? 100000. : dist;

    return dist;

    // return 0.5 * log(r) * r / dw;
}

float world(vec3 p) {
    // p = rotate(p);
    // p.xz *= op_rotate(mouseX / 400. * 10.0);

    // float sphere = length(p ) - 1.;

    p.xz *= Rotate(-sin(float(time) * 0.002));
    p.yz *= Rotate(cos(float(time) * 0.003));
    // p.xyz = rotate(p);

    // float sphere = length(p ) - 1.;
    p.xz *= Rotate(-sin(10.));

    p /= 500.;
    p /= 1. / cameraDistance;
    // float plane = p.y + 1.;

    p *= mMatrix;
    float mandelbulb = mandelbulbVertex(p);
    // float sphere = length(p - vec3(0., 1., 0.)) - .5;

    // return min(sphere, plane);
    // return sphere;

    return mandelbulb;
}

vec3 calcNormal(vec3 p, float t) {
    // float h = map(float(cameraCenter), 500., 0., 0.0001, 0.1); // replace by an appropriate value
    // float h = map(cameraDistance, 1000., 200., 0.002, 0.0001);
    float h = map(t, 0., 3., 0.00001, 0.01);
    // float h = 0.0005;
    const vec2 k = vec2(1, -1);
    return normalize(k.xyy * world(p + k.xyy * h) +
        k.yyx * world(p + k.yyx * h) +
        k.yxy * world(p + k.yxy * h) +
        k.xxx * world(p + k.xxx * h));
}

float ambientOcclusion(vec3 pos, vec3 normal) {
    float sum = 0.;
    const int aoSteps = 12;
    const float aoStepSize = 0.01;

    float maxSum = 0.;
    for(int i = 0; i < aoSteps; i++) {
        vec3 p = pos + normal * float(i + 1) * aoStepSize;
        sum += 1. / pow(2., float(i)) * world(p);
        maxSum += 1. / pow(2., float(i)) * float(i + 1) * aoStepSize;
    }
    return sum / maxSum;
}

float ambientOcclusion1(vec3 pos, vec3 N, float fallout){ 
    const int nS = 20; // number of samples
    const float max_dist = 0.01;
    
    float diff = 0.0;
    for (int i = 0; i < nS; ++i)
    {        
        float dist = max_dist * hash1(float(i)); // rand dist        
        float s_dist = max(0.0, world(pos + dist * N)); // sample
        
        diff += (dist - s_dist) / max_dist;
    }
    
    float diff_norm = diff / float(nS);
    float ao = 1.0 - diff_norm/fallout;
    
    return clamp(0.0, 1.0, ao);
}

vec3 applyFog(vec3 col, float co, vec3 rd, vec3 ld) {
    float fogAmount = 1.0 - exp(-co * .3);
    float sunAmount = max(dot(rd, ld), 0.0);
    vec3 fogColor = mix(vec3(0.5, 0.6, 0.7), vec3(1.0, 0.9, 0.7), pow(sunAmount, 8.));
    return mix(col, fogColor, fogAmount);
}

float rayCast(vec3 ro, vec3 rd) {

    float distanceOrigin = 0.;

    for(int i = 0; i < MAX_RAY_STEPS; i++) {

        vec3 rp = ro + distanceOrigin * rd;

        float map = world(rp);

        if(map < 0.0001)
            break;

        distanceOrigin += map;

        if(distanceOrigin > MAX_MARCH_DISTANCE) {
            distanceOrigin = -1.;
            break;
        }
    }

    return distanceOrigin;
}

float GetFogDensity(vec3 position, float sdfDistance) {
    const float maxSDFMultiplier = 1.;
    bool insideSDF = sdfDistance < 0.0;
    float sdfMultiplier = insideSDF ? min(abs(sdfDistance), maxSDFMultiplier) : 0.0;
    // return sdfMultiplier;
    return sdfMultiplier * abs(fbm_4(position / 6.0) + .5);
}

float ligthVisibility(vec3 ro, vec3 rd, float maxT, int maxSteps, float marchSize) {
    float t = 0.;

    float lv = 1.;

    for(int i = 0; i < 25; i++) {
        t += marchSize;
        if(t > maxT)
            break;

        vec3 rp = ro + t * rd;
        float map = world(rp);
        if(map < 0.) {
            lv *= BeerLambert(ABSORPTION_COEFFICIENT * GetFogDensity(rp, t), marchSize);
        }
    }

    return lv;
}

vec3 rayMarcherVol(vec3 ro, vec3 rd) {
    vec3 rp = ro;

    vec3 lig = vec3(-5., 5., -1);
    float opaqueVisibility = 1.;

    vec3 volumetricColor = vec3(0.);
    vec3 volumeAlbedo = vec3(2.);

    float marchSize = 0.005 * 1.8;

    float volumeDepth = 1.;

    vec3 ligthPositions[3];
    ligthPositions[0] = vec3(-1., 1.5, -0.8);
    ligthPositions[1] = vec3(-1., -1., -1.5);
    ligthPositions[2] = vec3(1., 1., -1.5);

    vec3 ligthColors[3];
    ligthColors[0] = vec3(0.902, 0.702, 0.1608);
    ligthColors[1] = vec3(0.6, 0.1412, 0.7137);
    ligthColors[2] = vec3(0., .5, .5);

    float ligthIntensity[3];
    ligthIntensity[0] = 2.;
    ligthIntensity[1] = 2.;
    ligthIntensity[2] = 2.;

    for(int i = 0; i < MAX_RAY_STEPS; i++) {

        rp = ro + volumeDepth * rd;

        float map = world(rp);

        // distanceOrigin += map;

        volumeDepth += max(marchSize, map);

        if(MAX_MARCH_DISTANCE < volumeDepth)
            break;

        if(map < 0.) {
            float previousOpaqueVisibility = opaqueVisibility;
            opaqueVisibility *= BeerLambert(ABSORPTION_COEFFICIENT * GetFogDensity(rp, map), volumeDepth);
            float absorptionFromMarch = previousOpaqueVisibility - opaqueVisibility;

            vec3 lightColorA = dot(normalize(lig), normalize(rp)) * vec3(.2, 0., 0.);

            // vec3 norWS = calcNormal(rp, map);
            // float ao1 = ambientOcclusion1(rp, norWS, 100.);

            for(int lightIndex = 0; lightIndex < 3; lightIndex++) {
                vec3 ld = ligthPositions[lightIndex];
                float lightDistance = length((ld - rp));

                float attenuation = 1.0 / pow(lightDistance, ligthIntensity[lightIndex]);
                vec3 lightColor = ligthColors[lightIndex] * attenuation;

                const float lightMarchSize = 0.1 * 1.8;
                float ligthVisibility = ligthVisibility(rp, ld, lightDistance, 25, lightMarchSize);
                volumetricColor += absorptionFromMarch * ligthVisibility * volumeAlbedo * lightColor;
            }



            volumetricColor += absorptionFromMarch * volumeAlbedo * lightColorA;


        }

        // if(map > 0.){
        //     vec3 norWS = calcNormal(rp, 0.);
        //     float ao1 = ambientOcclusion1(rp, norWS, 2.);
        //     volumetricColor *= ao1 + 0.01;
        // }        
    }



    return volumetricColor;
}

void main() {
    // vec3 cameraPos = vec3(cameraCenter + vec3(0., 0., -2.));

    // vec3 ro = vec3(position2.x, position2.y, -1.14);
    // vec3 rd = normalize(ro - cameraCenter);

    vec3 co = vec3(cameraCenter + vec3(0, 0, -2.));
    vec3 ro = co;
    vec3 rd = normalize(vec3(-position2.x, position2.y, 1.));

    // float diffuse = rayMarcher(ro, rd);

    vec3 col = vec3(0.);

    vec3 ambientPosition = vec3(-5., 5., -2.);
    vec3 ambientColor = vec3(1.0, 0.9, 0.7);

    if(VOLUMETRIC_RENDER) {
        col = rayMarcherVol(ro, rd);

        
    } else {
        float t = rayCast(ro, rd);

        // col = vec3(t);

        if(t > 0.) {

            // vec3 reflectionColor = vec3(0.);

            col = vec3(map(t, 0., 1., 0.8, 0.3), 0, 0.5);
            // col = vec3(0);

            vec3 posWS = ro + rd * t;
            vec3 norWS = calcNormal(posWS, t);
            // vec3 ref = reflect(rd, norWS);

            // vec3 ambient = vec3(1.0, 1.0, 1.0);

            vec3 ld = ambientPosition;
            float lightDistance = length((ld - posWS));

            float attenuation = 40.0 / pow(lightDistance, 2.);
            vec3 lightColor = ambientColor * attenuation;

            vec3 diffuseR = vec3(dot(normalize(ambientPosition), normalize(norWS))) - .5;

            // col += ambient * 0.1;
            col += lightColor;
            col += diffuseR;

            float ao = ambientOcclusion(posWS, norWS);
            float ao1 = ambientOcclusion1(posWS, norWS, 0.46);

            // ro = posWS * norWS;
            // rd = ref;
            col *= ao1 + 0.01;
            // vec3 fog = applyFog(col, t, posWS, normalize(ambientPosition));
            // float fd = GetFogDensity(posWS, t);
            // col = fog;
            

            // col = reflectionColor * (ao + 0.01);
        }
    }

    gl_FragColor = vec4(col, 1.);

    // gl_FragColor = vec4(vec3(1. - diffuse), 1.);
}
