import * as THREE from 'three';
import LayoutElement from './LayoutElement';
class LayoutStage {
    constructor(config = {}) {
        this.group = new THREE.Group();
        this.elements = [];
        this.config = {
           
            
            elementWidth: config.elementWidth || 1,
            elementHeight: config.elementHeight || 1,
            radius: config.radius || 1,
            spacing: config.spacing || 0.1
        };

        this.createStage();
    }

   //function to position the element on a circle around the center of the screen
   positionElementsOnCircle() {
    const center = new THREE.Vector3(0, 0, 0);
    const radius = 2.5;
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
}

export default LayoutStage;