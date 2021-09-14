import { GroundMesh, Mesh, Scene } from "@babylonjs/core";
import { Cube } from "./cube";
export declare class CubeFactory {
    private _scene;
    private _startPosition;
    private _endPosition;
    static boxes: Array<Cube>;
    private _speed;
    private _ground;
    private _timeout;
    private _fret;
    constructor(scene: Scene, ground: GroundMesh, fret: Mesh);
    Start(): void;
    Stop(): void;
    private _createBox;
    private DisposeBox;
}
