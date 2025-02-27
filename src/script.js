import * as THREE from 'three'

import LayoutStage from './LayoutStage'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { AxesHelper } from 'three'
import GUI from 'lil-gui'
import TornadoLayout from './TornadoLayout';
import data from '../static/data.json';
import { SmoothScroller } from './utils/SmoothScroller';
//smooth scroller
const smoothScroller = new SmoothScroller();

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

const tornadoLayout=new TornadoLayout();

data.forEach(stage => { 
    tornadoLayout.addStage(stage);
});
tornadoLayout.addToScene(scene);

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height,0.1,10)
camera.position.z = 5
scene.add(camera)

//const controls = new OrbitControls(camera, canvas)
//controls.enableDamping = true // Optional - adds smooth damping effect

const axesHelper = new AxesHelper(5);





//scene.add( axesHelper );



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

//rotate the tornadoLayout object when I scroll the mouse wheel
/*window.addEventListener('wheel', (event) => {
    tornadoLayout.rotation += event.deltaY * 0.001;
    
    
    tornadoLayout.rotateLayout();
    if(event.deltaY>2){
        tornadoLayout.goDirection(event.deltaY * 0.001);
    }else if(event.deltaY<-2){
        tornadoLayout.goDirection(event.deltaY * 0.001);
    }
})*/

/**
 * Debug
 */
const gui = new GUI();
//add the stage object rotation to the gui value between 0 and 360 and on change of the value call the rotateStage function

//gui.add(tornadoLayout, 'rotation').min(0).max(6.28).step(0.01).onChange(()=>{tornadoLayout.rotateLayout()});


// Smooth wheel delta values without scrolling the page


// Add this animation loop at the end of your file
function animate() {
    // Update controls
  //  controls.update()

    // Render
    const velocity=smoothScroller.velocity;
    if(Math.abs(velocity)>1){
        tornadoLayout.rotation += velocity * 0.001;
        tornadoLayout.rotateLayout();
    }
    else{
        tornadoLayout.rotation += 1 * 0.001;
        tornadoLayout.rotateLayout();
    }
    if( velocity>2){
        tornadoLayout.goDirection(velocity * 0.001);
    }else if(velocity<-2){
        tornadoLayout.goDirection(velocity * 0.001);
    }
   
    renderer.render(scene, camera)

    // Call animate again on the next frame
    window.requestAnimationFrame(animate)
}

animate()