//layout class for the tornado layout, its a group of layout stages
import LayoutStage from './LayoutStage';

class TornadoLayout {
    constructor() {
        this.stages = [];
        this.rotation=0;
        this.config={
            speed:0.5,
            limit:6,
            stageSpacing:1.5
        }
    }
    //function to add a stage to the layout
    addStage(stage) {
        const stageToAdd=new LayoutStage(stage);
        this.stages.push(stageToAdd);
    }
    //function to rotate the layout, it will rotate the layout stages around the center of the screen
    rotateLayout() {
        const angle=this.rotation;
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
        
    }
    goDirection(direction){
            const limit=6;
            this.stages.forEach(stage => {
                //if the stage position is bigger than the limit move it at the lower stage position - stage spacing
                if(stage.group.position.y > this.config.limit){
                    console.log(-this.config.limit-this.config.stageSpacing);
                    stage.group.position.y-= this.config.stageSpacing*this.stages.length;

                }else if(stage.group.position.y < -this.config.limit){
                    stage.group.position.y+= this.config.stageSpacing*this.stages.length;
                }
                
                stage.moveGroup(0, direction*0.5, 0);
            });
        
    }
}
export default TornadoLayout;