precision highp float;
varying vec2 position2;

const int MAX_RAY_STEPS = 100;
const float MAX_MARCH_DISTANCE = 100.;
const float MIN_MARCH_DISTANCE = 0.001;

// Get the closest distance from p to world
float world(vec3 p) {
    // SDF sphere
    float sphere = length(p ) - 1.;
    return sphere;
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