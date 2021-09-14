import { Mesh, Animatable, Scene, Vector3, StandardMaterial, GroundMesh, Color3, Animation } from "@babylonjs/core";
import { CubeFactory } from "./cubefactory";


export class Cube {

    // ================================
    // STATICS
    // ================================
    private static _currentId: number       = 0;
    private static _prefix                  = "box";
    private static _startPosition: Vector3  = new Vector3(0, 0.8, -1000);
    private static _endPosition: Vector3    = new Vector3(0, 0.8 , -552.5);
    private static _speed: number           = 10;

    public static dispose(id): void {
        const box = CubeFactory.boxes.filter((c, i) => { return c.GetMesh().name == id });
        if(box.length > 0) box.shift().GetMesh().dispose();
    }

    public static getAndUpSpeed(): number {
        Cube._speed = Cube._speed + 0.02;
        return Cube._speed;
    }

    private static get currentId(): number {
        this._currentId = this._currentId + 1;
        return this._currentId;
    }

    private static randX(): number { return ([-10, -5, 0, 5, 10])[Math.floor(Math.random() * 5)]; }

    private static getColorByPosition(x: number): string {
        switch(x) {
            case (-10):
                return "f1c40f";
            case (-5):
                return "3498db";
            case (0):
                return "2ecc71";
            case (5):
                return "9b59b6";
            case (10):
                return "e74c3c";
        }
    }

    // ================================
    // FIELDS & PROPS
    // ================================
    private _boxIn: Mesh;
    private _boxOut: Mesh;
    private _animatable: Animatable;
    private _scene: Scene;
    private _start: Vector3 = Cube._startPosition.clone();
    private _end: Vector3 = Cube._endPosition.clone();
    public readonly name: string;

    constructor(scene: Scene, ground: GroundMesh, color: string = "FF0000") {
        const x = Cube.randX();
        this._start.set(x, this._start.y, this._start.z);
        this._end.set(x, this._end.y, this._end.z);

        this.name = `${Cube._prefix}-${Cube.currentId}`;
        this._scene = scene;
        this._boxOut = Mesh.CreateBox(this.name, 5, scene);
        this._boxIn = Mesh.CreateBox(`${this.name}-in`, 4.5, scene);
        this._boxOut.addChild(this._boxIn);
        this._boxOut.position = this._start;
        this._boxOut.scaling = new Vector3(1, 0.25, 1);
        this._boxOut.material = new StandardMaterial(`${this.name}-mat`, scene);
        this._boxIn.material = new StandardMaterial(`${this.name}-mat-in`, scene);
        this._boxOut.rotation.x = ground.rotation.x;
        
        this._configureMaterials();
        this._configureColor();
        this._configureAnimation();
    }

    private _configureMaterials(): void {
        const boxOutMat = this._boxOut.material as StandardMaterial;
        const boxInMat = this._boxIn.material as StandardMaterial;
        boxOutMat.alpha = 0.99;
        boxInMat.specularPower = 0;
        boxOutMat.useSpecularOverAlpha = true;
    }

    private _configureColor(): void {
        const color = Cube.getColorByPosition(this._boxOut.position.x);
        (this._boxOut.material as StandardMaterial).diffuseColor = Color3.FromHexString(`#${color}`);
        (this._boxIn.material as StandardMaterial).diffuseColor = Color3.FromHexString(`#${color}`);
    }

    private _configureAnimation(): void {
        const animation = new Animation(
            `${this.name}-anim`,
            'position',
            Cube._speed,
            Animation.ANIMATIONTYPE_VECTOR3,
            Animation.ANIMATIONLOOPMODE_CYCLE);

        animation.setKeys([
            { frame: 0, value: this._start },
            { frame: 100, value: this._end },
        ]);
        
        this._boxOut.animations.push(animation);
        this._animatable = this._scene.beginAnimation(this._boxOut, 0, 100, false, Cube._speed, () => Cube.dispose(this.name));
    }

    public GetMesh(): Mesh { return this._boxOut; }
    public GetAnimatable(): Animatable { return this._animatable; }

}