import { Engine, GroundMesh, Mesh, Scene, SceneLoader, Vector3, Animation, AnimationGroup, Animatable} from "@babylonjs/core";


export class Cube {

    private _mesh: Mesh;

    private _animatable: Animatable;

    constructor(mesh: Mesh, animatable: Animatable){
        this._mesh = mesh
        this._animatable = animatable
    }

    public GetMesh(): Mesh {

        return this._mesh
    }

    public GetAnimatable(): Animatable {
        return this._animatable
    }
}