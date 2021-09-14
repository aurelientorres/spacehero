import { GroundMesh, Mesh, Scene, Animation } from "@babylonjs/core";
import { Cube } from "./cube";

export class CubeFactory {
    
    // @TODO: Remove ~~ x = -2 -1 0 1 2 y= 0.4 z= -1000   z end  = -552.5

    public static ground: GroundMesh;
    public static boxes: Array<Cube>        = [ ];
    private static _timeout: number         = 3000;

    private _scene: Scene;

    constructor(scene: Scene, ground: GroundMesh){
        this._scene = scene;
        CubeFactory.ground = ground;
    }

    public Start(): void { this._newBox(); }
    public Stop(): void {}

    private _newBox(): void {
        CubeFactory.boxes.push(new Cube(this._scene, CubeFactory.ground));
        if(CubeFactory.boxes.length > 1) {
            Cube.getAndUpSpeed()
        }
        
        if(CubeFactory._timeout >= 500) {
            CubeFactory._timeout = CubeFactory._timeout - 50;
        }

        CubeFactory.boxes.forEach((value) => {
            value.GetAnimatable().speedRatio = Cube.getAndUpSpeed();
        });

        setTimeout(() => this._newBox(), CubeFactory._timeout);
    }

}