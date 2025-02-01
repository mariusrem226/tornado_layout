//layout class for the tornado layout, its a group of layout stages
import LayoutStage from './LayoutStage';

class TornadoLayout {
    constructor() {
        this.stages = [];
        this.rotation=0;
    }
    //function to add a stage to the layout
    addStage(stage) {
        const stageToAdd=new LayoutStage(stage);
        this.stages.push(stageToAdd);
    }
    //function to rotate the layout, it will rotate the layout stages around the center of the screen
    rotateLayout() {
        const angle=this.rotation;
        console.log(this.rotation);
        this.stages.forEach((stage, index) => {
            if(index%2 === 0){
                stage.rotateStage(angle);
            }else{
                stage.rotateStage(-angle);
            }
        });
    }
    
    addToScene(scene){
        this.stages.forEach(stage => {
            stage.group.position.x=stage.config.xPosition;
            stage.group.position.y=stage.config.yPosition;
            scene.add(stage.group);
        });
        console.log(this.stages);
        
    }
    goDirection(direction){
       
            this.stages.forEach(stage => {
                stage.moveGroup(0, direction*0.5, 0);
            });
        
    }
}
export default TornadoLayout;