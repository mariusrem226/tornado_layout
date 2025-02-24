import * as THREE from 'three'

import LayoutStage from './LayoutStage'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { AxesHelper } from 'three'
import GUI from 'lil-gui'
import TornadoLayout from './TornadoLayout';
import data from '../static/data.json';
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
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 5
scene.add(camera)

//const controls = new OrbitControls(camera, canvas)
//controls.enableDamping = true // Optional - adds smooth damping effect

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
document.addEventListener('DOMContentLoaded', function() {
    // Track values
    let value = 0;       // Current smoothed value
    let velocity = 0;    // Current velocity (for momentum)
    let animating = false;
    
    // Constants
    const FRICTION = 0.95;       // Reduces velocity over time (0-1, higher = less friction)
    const SENSITIVITY = 0.5;     // How much wheel events affect movement
    const THRESHOLD = 0.5;     // When to stop animation
    const MAX_VALUE = 100;       // Maximum absolute value to prevent excessive buildup
    
    // Prevent default scrolling on the whole page
    document.addEventListener('wheel', function(e) {
      e.preventDefault();
      
      // Add to velocity based on wheel movement
      velocity += e.deltaY * SENSITIVITY;
      
      // Limit maximum velocity
      velocity = Math.max(Math.min(velocity, MAX_VALUE), -MAX_VALUE);
      
      // Start animation loop if not already running
      if (!animating) {
        animating = true;
        animate();
      }
    }, { passive: false });
    
    // Animation function using requestAnimationFrame
    function animate() {
      // Apply velocity to value
      value += velocity;
      
      // Apply friction to gradually reduce velocity
      velocity *= FRICTION;
      
      // Stop if velocity is very low
      if (Math.abs(velocity) < THRESHOLD) {
        velocity = 0;
        animating = false;
        updateElement(value);
        return;
      }
      
      // Apply the value to your element or interaction
      updateElement(value);
      
      // Continue animation
      requestAnimationFrame(animate);
    }
    
    // Function to apply the eased value to your element
    function updateElement(val) {
      // Demo - move an element horizontally (with limits to keep on screen)
      const demoElement = document.getElementById('demo-element');
      if (demoElement) {
        // Restrict movement to stay within reasonable bounds
        const limitedVal = Math.max(Math.min(val % 300, 200), -200);
        demoElement.style.transform = `translateX(${limitedVal}px)`;
        demoElement.textContent = `Value: ${Math.round(limitedVal)}`;
      }
      
      // Display current velocity for debugging
      console.log('Current velocity:', velocity);
      tornadoLayout.rotation += velocity*0.001;
      tornadoLayout.rotateLayout();
    }
    
    // Create a demo element if not present
    
  });

// Add this animation loop at the end of your file
function animate() {
    // Update controls
  //  controls.update()

    // Render
    renderer.render(scene, camera)

    // Call animate again on the next frame
    window.requestAnimationFrame(animate)
}

animate()