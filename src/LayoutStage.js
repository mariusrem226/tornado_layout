import * as THREE from 'three';
import LayoutElement from './LayoutElement';
class LayoutStage {
    constructor(config = {}) {
        this.group = new THREE.Group();
        this.elements = [];
        this.config = {
            xPosition: config.xPosition || 0,
            yPosition: config.yPosition || 0,
          
            elementWidth: config.elementWidth || 1,
            elementHeight: config.elementHeight || 1,
            radius: config.radius || 2.5,
            spacing: config.spacing || 0.1,
            rotation: config.rotation || 0,
            initialRotation: config.initialRotation || 0,
        };
        
        this.rotateStage(this.config.rotation);
        this.createStage();
    }
    //function which rotates the stage
    rotateStage(angle) {
        this.group.rotation.y = this.config.initialRotation+angle;
    }
    
   //function to position the element on a circle around the center of the screen
   positionElementsOnCircle() {
    const center = new THREE.Vector3(0, 0, 0);
    const radius = this.config.radius;
    const angle = 0;
    const angleIncrement = 2 * Math.PI / this.elements.length;
    this.elements.forEach((element, index) => {
        const x = center.y + radius * Math.sin(angle + index * angleIncrement);

        const z = center.x + radius * Math.cos(angle + index * angleIncrement);
        //rotate the element
        element.getMesh().rotation.y = angle + index * angleIncrement;
        element.getMesh().position.set(x, 0, z);
    });
   }
    createStage() {
        for (let i = 0; i < 6; i++) {
            const element = new LayoutElement(1.3, 0.9);
            this.elements.push(element);
            this.group.add(element.getMesh());
        }
        this.positionElementsOnCircle();

    }
    update(deltaTime) {
        this.elements.forEach(element => element.update(deltaTime));
    }

    getGroup() {
        return this.group;
    }

    dispose() {
        this.elements.forEach(element => element.dispose());
        this.elements = [];
        this.group.clear();
    }

    // Update all elements with new shader code
    updateAllShaders(vertexShader, fragmentShader) {
        this.elements.forEach(element => element.updateShaders(vertexShader, fragmentShader));
    }

    // Update uniforms for all elements
    setUniformAll(name, value) {
        this.elements.forEach(element => element.setUniform(name, value));
    }

    // Get element at specific grid position
    getElementAt(row, column) {
        const index = (row * this.config.columns) + column;
        return this.elements[index] || null;
    }

    // Modify element at specific position
    modifyElementAt(row, column, modifier) {
        const element = this.getElementAt(row, column);
        if (element && typeof modifier === 'function') {
            modifier(element);
        }
    }
    
    moveGroup(x, y, z) {
        this.group.position.x += x;
        this.group.position.y += y;
        this.group.position.z += z;
    }
}

export default LayoutStage;