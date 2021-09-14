import { Engine, GroundMesh, Mesh, Scene, SceneLoader, Vector3, Animation, AnimationGroup, Animatable, KeyboardEventTypes, KeyboardInfo} from "@babylonjs/core";
import { Cube } from "./cube";
import { onKeyboardEvent } from "./scenes/decorators";

export class CubeFactory {

    private _scene: Scene

    private _startPosition: Vector3;

    private _endPosition: Vector3;

    public static boxes: Array<Cube> = [];

    private _speed: number;

    private _ground: GroundMesh;

    private _timeout: number;


    private _fret: Mesh;

    constructor(scene: Scene, ground: GroundMesh, fret: Mesh){
        this._scene = scene
        this._ground = ground
        this._fret = fret
        this._speed = 1.0

        this._timeout = 3000

        //x = -2 -1 0 1 2 y= 0.4 z= -1000   z end  = -552.5
        this._startPosition = new Vector3(20, 0.8, -1000)
        this._endPosition = new Vector3(20, 0.8 , -552.5);
    }


    public Start(): void {
        this._createBox()
    }


    public Stop(): void {

    }



    private _createBox(): void {

        
        let randomString = (Math.random() + 1).toString(36).substring(7);

        var box = Mesh.CreateBox("box" + randomString, 1.0, this._scene);
        
        
        
        let positions = [-10, -5, 0, 5, 10]

        var position = positions[Math.floor(Math.random() * positions.length)];


        var startPosition = this._startPosition.clone()
        var endPosition = this._endPosition.clone()

        startPosition._x = position
        endPosition._x = position

        box.scaling.setAll(5)
       
        box.position = startPosition
        box.position._x = position

        
                
        box.rotation.x = this._ground.rotation._x

        
        //var animation = new Animation("anim" + randomString, box, "position", 5, 100, startPosition, endPosition, Animation.ANIMATIONLOOPMODE_CONSTANT);

        var vitesse = 10.0 * this._speed
        
        var animation = new Animation("Animation" + randomString, "position", vitesse, Animation.ANIMATIONTYPE_VECTOR3,
        Animation.ANIMATIONLOOPMODE_CYCLE);

        var keys = [];
            keys.push({
                frame: 0,
                value: startPosition
            });

            keys.push({
                frame: 100,
                value: endPosition
            });
            
            animation.setKeys(keys)

            box.animations.push(animation)

            const animatable = this._scene.beginAnimation(box, 0, 100, false, this._speed, () => this.DisposeBox(box.name) );
        
            CubeFactory.boxes.push(new Cube(box, animatable))

            if(CubeFactory.boxes.length > 1 ){
                this._speed = this._speed + 0.01

                if(this._timeout >= 500){
                    this._timeout-= 50
                }
                

                CubeFactory.boxes.forEach((value) => {
            
                  
                    //this._speed = this._speed + 0.0001
                    
                   
                    value.GetAnimatable().speedRatio = this._speed;
                   
                })
            }
        
      
        

        setTimeout(() => this._createBox(), this._timeout);
    }
    
    private DisposeBox(boxname){
        
        CubeFactory.boxes.forEach((value, index)=> {
            
            if(value.GetMesh().name == boxname){
                value.GetMesh().dispose()
                CubeFactory.boxes.splice(index, 1)
            }
        })
    }

}