precision highp float;

const int MAX_RAY_STEPS = 100;
const float MAX_MARCH_DISTANCE = 100.;

const int MAX_ITERATIONS = 10;

varying vec2 position2;

uniform float MIN_MARCH_DISTANCE;

uniform vec3 cameraCenter;
uniform float cameraDistance;
uniform mat3 dMatrix;

uniform float N;

uniform bool showNormals;
uniform bool AO;
uniform bool lightAttenuation;
uniform bool diffuseLigth;
uniform bool shapeColor;
uniform bool distanceColoring;
uniform bool specularLight;
uniform bool ambientLight;
uniform bool rotate;

uniform vec3 shapeColorC;
uniform vec3 diffuseLightC;
uniform vec3 secondaryLightC;
uniform vec3 specularColor;

uniform vec3 diffuseLightP;
uniform vec3 secondaryLightP;

uniform float ambientCoef;
uniform float attenuationLight;
uniform float falloutV;
uniform float matShininess;

uniform float exponentialTerm;
uniform float numeratorTerm;

uniform float time;

uniform bool distancedNormal;
uniform float minhExp;
uniform float maxhExp;
uniform float maxSamplingDistance;
uniform float sdfFactor;

uniform float gammaCorrection;

uniform float specularIntensity;
uniform float diffuseIntensity;

// --------------------------------------------//
//               Noise Functions
// --------------------------------------------//
// Taken from Inigo Quilez's Rainforest ShaderToy:
// https://www.shadertoy.com/view/4ttSWf
float hash1(float n) {
    return fract(n * 17.0 * fract(n * 0.3183099));
}

// Aux function
float map(float value, float istart, float istop, float ostart, float ostop) {
    return ostart + (ostop - ostart) * ((value - istart) / (istop - istart));
}

mat2 Rotate(float angle) {
    float s = sin(angle);
    float c = cos(angle);

    return mat2(c, -s, s, c);
}

// Mandelbulb SDF
float mandelbulbSDF(vec3 pos) {
    vec3 p = pos;

    float r = 0.;
    float dw = 1.0;
    vec3 w = p;

    for(int l = 0; l < MAX_ITERATIONS; l++) {
        // get derivative of w
        dw = pow(r, float(N) - 1.) * float(N) * dw + 1.;

        // cartesian to polar
        r = length(w);
        float f = atan(w.y, w.x);
        float t = acos(w.z / r);

        float zr = pow(r, float(N));
        t *= float(N);
        f *= float(N);

        // Nylander formula
        w = p + zr * vec3(sin(t) * cos(f), sin(t) * sin(f), cos(t));

        // Check if r bounds
        if(r > 2.)
            break;
    }

    // Detail in function of camera distance
    float bandFactor = map(cameraDistance, 500., 300., sdfFactor, sdfFactor + 1.);

    // Hubbard-Douady potential see https://iquilezles.org/articles/distancefractals/
    float dist = sdfFactor * log(r) * r / dw;

    return dist;
}

// Get the closest distance from p to world
float world(vec3 p) {
    if(rotate) {
        p.xz *= Rotate(-sin(float(time) * 0.002));
        p.yz *= Rotate(cos(float(time) * 0.003));
    }

    // Set point to initial camera distance
    p /= 500.;

    // transform the point to simulate camera zoom
    p /= 1. / cameraDistance;

    // apply rotation and translation transformations from object
    p *= dMatrix;

    // Distance from p to mandelbulb
    float mandelbulb = mandelbulbSDF(p);

    return mandelbulb;
}

// Tetrahedron technique by Paulo Falcao 2008 see https://iquilezles.org/articles/normalsSDF/
vec3 calcNormal(vec3 p, float t) {
    // Detail given by distance of point to the camera

    float h;
    if(distancedNormal)
        h = map(t, 0., maxSamplingDistance, pow(10., -minhExp), pow(10., -maxhExp));
    else
        h = pow(10., -minhExp);

    const vec2 k = vec2(1, -1);
    return normalize(k.xyy * world(p + k.xyy * h) +
        k.yyx * world(p + k.yyx * h) +
        k.yxy * world(p + k.yxy * h) +
        k.xxx * world(p + k.xxx * h));
}

float ambientOcclusion1(vec3 pos, vec3 N, float fallout) {
    const int nS = 20; // number of samples
    const float max_dist = 0.01;

    float diff = 0.0;
    for(int i = 0; i < nS; ++i) {
        float dist = max_dist * hash1(float(i)); // rand dist        
        float s_dist = max(0.0, world(pos + dist * N)); // sample

        diff += (dist - s_dist) / max_dist;
    }

    float diff_norm = diff / float(nS);
    float ao = 1.0 - diff_norm / fallout;

    return clamp(0.0, 1.0, ao);
}

// Ray casting with ray march algorithm
float rayMarch(vec3 ro, vec3 rd) {
    // Initialize distance
    float distanceOrigin = 0.;

    for(int i = 0; i < MAX_RAY_STEPS; i++) {

        // Calcualte ray position
        vec3 rp = ro + distanceOrigin * rd;

        // Get the closest distance to ray
        float map = world(rp);

        // Check if ray intersects
        if(map < pow(10., -MIN_MARCH_DISTANCE))
            break;

        // Advance ray to the next closest point
        distanceOrigin += map;

        // Break if ray is too far
        if(distanceOrigin > MAX_MARCH_DISTANCE) {
            distanceOrigin = -1.;
            break;
        }
    }

    // return intersection distance
    return distanceOrigin;
}

void main() {
    // Camera origin, ray origin, ray direction
    vec3 co = vec3(cameraCenter + vec3(0, 0, -2.));
    vec3 ro = co;
    vec3 rd = normalize(vec3(-position2.x, position2.y, 1.));

    // Initial color (background)
    vec3 col = vec3(0.);

    // Ambient Light definition
    vec3 ambientPosition = diffuseLightP;
    vec3 ambientColor = diffuseLightC;

    // Spawn ray and get distance
    float t = rayMarch(ro, rd);

    vec3 shapeC;

    if(t > 0.) {

        // Shape Color based on distance
        if(distanceColoring)
            shapeC = vec3(map(t, 0., 1., shapeColorC.r, shapeColorC.r - 0.5), shapeColorC.g, shapeColorC.b);
        else
            shapeC = shapeColorC;

        // col += shapeC;

        if(shapeColor) {
            vec3 gamma = vec3(1.0 / gammaCorrection);
            gl_FragColor = vec4(pow(col, gamma), 1.);
            return;
        }

        // Get normals of shape
        vec3 posWS = ro + rd * t;
        vec3 norWS = calcNormal(posWS, length(posWS));

        // Colormode NORMALS
        if(showNormals) {
            col = norWS;
            vec3 gamma = vec3(1.0 / gammaCorrection);
            gl_FragColor = vec4(pow(col, gamma), 1.);
            return;
        }

        // Calculate ambient
        vec3 ambient = ambientCoef * ambientColor * shapeC;

        if(ambientLight) {
            col = ambient;
            vec3 gamma = vec3(1.0 / gammaCorrection);
            gl_FragColor = vec4(pow(col, gamma), 1.);
            return;
        }

        // Calculate diffuse ligth
        vec3 lt = normalize(ambientPosition - posWS); //surface to light

        float diffuseCoef = max(dot(norWS, lt), 0.);
        vec3 diffuseR = diffuseCoef * ambientColor;

        // calculate specular (reflection)
        vec3 specular = vec3(0.);

        if(diffuseCoef > 0.) {
            vec3 tCo = normalize(co - posWS);

            vec3 halfway = normalize(tCo + lt);
            float angle = max(0., dot(norWS, halfway));
            float specularCoef = pow(angle, matShininess);

            specular = specularCoef * specularColor * ambientColor;
        }

        // Calculate light attenuation

        // vec3 ld = secondarylightPosition;
        float lightDistance = length(ambientPosition - posWS);

        // float attenuation = attenuationIntesity / pow(lightDistance, attenuationAngle);
        float attenuation = numeratorTerm / (1. + attenuationLight * pow(lightDistance, exponentialTerm));

        // Calculate ambient oclussion
        float ao = ambientOcclusion1(posWS, norWS, falloutV);

        // Add diffuse ligth
        if(diffuseLigth) {
            col = diffuseR * diffuseIntensity;
            vec3 gamma = vec3(1.0 / gammaCorrection);
            gl_FragColor = vec4(pow(col, gamma), 1.);
            return;
        }

        // Specular
        if(specularLight) {
            col = specular * specularIntensity;
            vec3 gamma = vec3(1.0 / gammaCorrection);
            gl_FragColor = vec4(pow(col, gamma), 1.);
            return;
        }

        // Light attenuation
        if(lightAttenuation) {
            vec3 gamma = vec3(1.0 / gammaCorrection);
            gl_FragColor = vec4(pow(vec3(attenuation), gamma), 1.);
            return;
        }

        col += ambient +
            (attenuation * specular * specularIntensity) +
            (attenuation * diffuseR * diffuseIntensity);

        // Add ambient oclussion
        if(AO)
            col *= ao + 0.01;
    }

    vec3 gamma = vec3(1.0 / gammaCorrection);

    gl_FragColor = vec4(pow(col, gamma), 1.);
}
