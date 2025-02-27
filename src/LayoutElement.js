import * as THREE from 'three';
import layoutElementVertexShader from './shaders/layoutElement/vertex.glsl'
import layoutElementFragmentShader from './shaders/layoutElement/fragment.glsl'
const textureLoader = new THREE.TextureLoader();

class LayoutElement {
    constructor(width = 1.6, height = 0.9) {
      let textureNumber=Math.floor(Math.random()*6)+1;
      const texture = textureLoader.load(
        "img/VG0"+textureNumber+".jpg"
       
    )
       
            // Create shader material
        this.material = new THREE.ShaderMaterial({
            uniforms: {
                uTime: { value: 0.0 },
                uTexture: { value: texture }
            },
            vertexShader: layoutElementVertexShader,
            fragmentShader: layoutElementFragmentShader,
            depthWrite: false,
            depthTest: false,
            side: THREE.DoubleSide,
            transparent: true,
        });

        // Create plane geometry
        const geometry = new THREE.PlaneGeometry(width, height, 50, 50);

        // Create mesh
        this.mesh = new THREE.Mesh(geometry, this.material);
    }

    // Method to update the time uniform
    update(deltaTime) {
        this.material.uniforms.uTime.value += deltaTime;
    }

    // Method to get the mesh
    getMesh() {
        return this.mesh;
    }

    // Method to dispose of geometry and material
    dispose() {
        this.mesh.geometry.dispose();
        this.material.dispose();
    }

    // Method to set custom uniforms
    setUniform(name, value) {
        if (this.material.uniforms[name]) {
            this.material.uniforms[name].value = value;
        } else {
            console.warn(`Uniform ${name} does not exist`);
        }
    }

    // Method to update shader code
    updateShaders(vertexShader, fragmentShader) {
        this.material.vertexShader = vertexShader;
        this.material.fragmentShader = fragmentShader;
        this.material.needsUpdate = true;
    }
}

export default LayoutElement;