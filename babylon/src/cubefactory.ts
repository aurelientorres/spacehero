import { GroundMesh, Mesh, Scene, Animation } from "@babylonjs/core";
import { Cube } from "./cube";

export class CubeFactory {
    
    // @TODO: Remove ~~ x = -2 -1 0 1 2 y= 0.4 z= -1000   z end  = -552.5

    public static ground: GroundMesh;
    public static boxes: Array<Cube>        = [ ];
    private static _timeout: number         = 2500;
    private _scene: Scene;

    constructor(scene: Scene, ground: GroundMesh){
        this._scene = scene;
        CubeFactory.ground = ground;
    }

    public Start(): void { this._newBox(); }
    public Stop(): void {}

    private _newBox(): void {
        CubeFactory._timeout = CubeFactory._timeout > 300 ? CubeFactory._timeout - 25 : 300;
        const tOut = CubeFactory._timeout;
        const speed = Cube.getAndUpSpeed();
        CubeFactory.boxes.push(new Cube(this._scene, CubeFactory.ground));
        CubeFactory.boxes.forEach((value) => { value.GetAnimatable().speedRatio = speed; });
        setTimeout(() => { this._newBox(); }, tOut);
    }

}