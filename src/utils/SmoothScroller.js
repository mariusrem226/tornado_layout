export class SmoothScroller {
    constructor() {
        // Track values
        this.value = 0;       // Current smoothed value
        this.velocity = 0;    // Current velocity (for momentum)
        this.animating = false;
        
        // Constants
        this.FRICTION = 0.95;       // Reduces velocity over time (0-1, higher = less friction)
        this.SENSITIVITY = 0.5;     // How much wheel events affect movement
        this.THRESHOLD = 1;     // When to stop animation
        this.MAX_VALUE = 100;       // Maximum absolute value to prevent excessive buildup
        
        // Bind methods to maintain correct 'this' context
        this.handleWheel = this.handleWheel.bind(this);
        this.animate = this.animate.bind(this);
        
        // Initialize when DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.init());
        } else {
            this.init();
        }
    }
    
    init() {
        // Prevent default scrolling on the whole page
        document.addEventListener('wheel', this.handleWheel, { passive: false });
    }
    
    handleWheel(e) {
        e.preventDefault();
        
        // Add to velocity based on wheel movement
        this.velocity += e.deltaY * this.SENSITIVITY;
        
        // Limit maximum velocity
        this.velocity = Math.max(Math.min(this.velocity, this.MAX_VALUE), -this.MAX_VALUE);
        
        // Start animation loop if not already running
        if (!this.animating) {
            this.animating = true;
            this.animate();
        }
    }
    
    animate() {
        // Apply velocity to value
        this.value += this.velocity;
        
        // Apply friction to gradually reduce velocity
        this.velocity *= this.FRICTION;
        
        // Stop if velocity is very low
        if (Math.abs(this.velocity) < this.THRESHOLD) {
            this.velocity = 0;
            this.animating = false;
          
            return;
        }
        
        // Apply the value to your element or interaction
       
        
        // Continue animation
        requestAnimationFrame(this.animate);
    }
    
  
}

