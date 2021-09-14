import { GroundMesh, Scene } from "@babylonjs/core";
import { Cube } from "./cube";
export declare class CubeFactory {
    static ground: GroundMesh;
    static boxes: Array<Cube>;
    private static _timeout;
    private _scene;
    constructor(scene: Scene, ground: GroundMesh);
    Start(): void;
    Stop(): void;
    private _newBox;
}
