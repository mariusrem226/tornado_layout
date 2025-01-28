varying vec2 vUv;
float PI = 3.141592653589793;
float radius=0.15;
vec3 deformationCurve(vec3 position, vec2 uv) {
  //make a arc curve depending on the uv.x
   position.z=sin(uv.x*PI)*radius;
    return position;
}

void main() {
                vUv = uv;
                vec3 deformedPosition=deformationCurve(position, uv);
                gl_Position = projectionMatrix * modelViewMatrix * vec4(deformedPosition, 1.0);

}