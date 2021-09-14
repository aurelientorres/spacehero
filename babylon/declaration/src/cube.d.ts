import { Mesh, Animatable, Scene, GroundMesh } from "@babylonjs/core";
export declare class Cube {
    private static _currentId;
    private static _prefix;
    private static _startPosition;
    private static _endPosition;
    private static _speed;
    static dispose(id: any): void;
    static getAndUpSpeed(): number;
    private static get currentId();
    private static randX;
    private static getColorByPosition;
    private _boxIn;
    private _boxOut;
    private _animatable;
    private _scene;
    private _start;
    private _end;
    readonly name: string;
    constructor(scene: Scene, ground: GroundMesh, color?: string);
    private _configureMaterials;
    private _configureColor;
    private _configureAnimation;
    GetMesh(): Mesh;
    GetAnimatable(): Animatable;
}
