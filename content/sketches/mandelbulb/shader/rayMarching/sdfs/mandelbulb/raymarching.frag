precision highp float;
varying vec2 position2;

const int MAX_RAY_STEPS = 100;
const float MAX_MARCH_DISTANCE = 100.;
const float MIN_MARCH_DISTANCE = 0.001;

const int MAX_ITERATIONS = 20;

uniform float cameraDistance;
uniform mat3 dMatrix;

uniform float N;

// Aux function
float map(float value, float istart, float istop, float ostart, float ostop) {
    return ostart + (ostop - ostart) * ((value - istart) / (istop - istart));
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
    float bandFactor = map(cameraDistance, 500., 300., 0.5, 1.);

    // Hubbard-Douady potential see https://iquilezles.org/articles/distancefractals/
    float dist = bandFactor * log(r) * r / dw;

    return dist;
}


// Get the closest distance from p to world
float world(vec3 p) {
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
        if(map < MIN_MARCH_DISTANCE)
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
    vec3 co = vec3(0, 0, -2.);
    vec3 ro = co;
    vec3 rd = normalize(vec3(position2.x, position2.y, 1.));

    // Initial color (background)
    vec3 col = vec3(0.);

    // Spawn ray and get distance
    float t = rayMarch(ro, rd);

    // Temp color based on distance
    col = vec3(clamp(t, 0., 1.));
    
    // Set fragment color
    gl_FragColor = vec4(col, 1.);
}