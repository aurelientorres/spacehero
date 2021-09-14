import { Mesh, Animatable } from "@babylonjs/core";
export declare class Cube {
    private _mesh;
    private _animatable;
    constructor(mesh: Mesh, animatable: Animatable);
    GetMesh(): Mesh;
    GetAnimatable(): Animatable;
}
