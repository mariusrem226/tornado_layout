import * as THREE from 'three'

import LayoutStage from './LayoutStage'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { AxesHelper } from 'three'
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()



/**
 * Sizes
 */
const sizes = {
    //sizes of the window
    width: window.innerWidth,
    height: window.innerHeight
}
/**
 * LayoutElement
 */
const stage=new LayoutStage();
scene.add(stage.group);

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true // Optional - adds smooth damping effect

const axesHelper = new AxesHelper(5);
scene.add( axesHelper );



window.addEventListener('resize', () =>
    {
        // Update sizes
        sizes.width = window.innerWidth;
        sizes.height = window.innerHeight;
        // Update camera
        camera.aspect = sizes.width / sizes.height;
        camera.updateProjectionMatrix();

        //update renderer
        renderer.setSize(sizes.width, sizes.height);
        renderer.render(scene, camera);
    })
/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})


renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)

// Add this animation loop at the end of your file
function animate() {
    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call animate again on the next frame
    window.requestAnimationFrame(animate)
}

animate()