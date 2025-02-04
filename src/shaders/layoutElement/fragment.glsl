
uniform float uTime;
varying vec2 vUv;
      
void main() {
    // Create a simple animated gradient
    vec3 color1 = vec3(0.5, 0.0, 1.0);
    vec3 color2 = vec3(0.0, 0.5, 1.0);
    float mixValue = sin(vUv.x * 5.0 + uTime) * 0.5 + 0.5;
    vec3 finalColor = vec3(0., 0., 0.);
    
    gl_FragColor = vec4(finalColor, 0.6);
}
