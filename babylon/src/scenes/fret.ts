import { Mesh, StandardMaterial, Scene, Color3, KeyboardEventTypes, KeyboardInfo, Vector3 } from "@babylonjs/core";
import { Cube } from "../cube";
import { CubeFactory } from "../cubefactory";
import { onKeyboardEvent } from "./decorators";

/**
 * This represents a script that is attached to a node in the editor.
 * Available nodes are:
 *      - Meshes
 *      - Lights
 *      - Cameas
 *      - Transform nodes
 * 
 * You can extend the desired class according to the node type.
 * Example:
 *      export default class MyMesh extends Mesh {
 *          public onUpdate(): void {
 *              this.rotation.y += 0.04;
 *          }
 *      }
 * The function "onInitialize" is called immediately after the constructor is called.
 * The functions "onStart" and "onUpdate" are called automatically.
 */
export default class MyScript extends Mesh {

    /**
     * Override constructor.
     * @warn do not fill.
     */
    // @ts-ignore ignoring the super call as we don't want to re-init
    protected constructor(public scene: Scene) { }
    
    private static _score: number = 0;

    public static subScore(x: number): number {
        MyScript._score = MyScript._score - x;
        return MyScript._score;
    }
    
    private _scoreElem : HTMLElement =  document.getElementById("score");

    /**
     * Called on the node is being initialized.
     * This function is called immediatly after the constructor has been called.
     */
    public onInitialize(): void {
    }

    /**
     * Called on the scene starts.
     */
    public onStart(): void {
        this.scaling = new Vector3(25, 1.5, 10);
        this.material = new StandardMaterial("fret-mat", this.scene);
        this.material.alpha = 0.9;
        (this.material as StandardMaterial).diffuseColor = Color3.FromHexString("#000000");
        (this.material as StandardMaterial).specularPower = 3000;
    }

    /**
     * Called each frame.
     */
    public onUpdate(): void {
        // ...
    }

    /**
     * Called on a message has been received and sent from a graph.
     * @param message defines the name of the message sent from the graph.
     * @param data defines the data sent in the message.
     * @param sender defines the reference to the graph class that sent the message.
     */
    public onMessage(name: string, data: any, sender: any): void {
        switch (name) {
            case "myMessage":
                // Do something...
                break;
        }
    }
        

    @onKeyboardEvent(["a","z","e","r","t"], KeyboardEventTypes.KEYDOWN)
    public onKeyboard(touch: KeyboardInfo): void {
        let matchedCube: Cube = null;
        let matchedMeshs = [];
        console.log(matchedMeshs);
        matchedMeshs = CubeFactory.boxes.filter(box => { 
            return box.GetMesh().intersectsMesh(this, true); 
        });
        console.log(matchedMeshs);

        if(matchedMeshs.length > 0) {
            const value = matchedMeshs[0];
            while(matchedMeshs.length > 0) { matchedMeshs.pop(); }
            switch(touch.event.key){
                case "a":
                    if(value.GetMesh().position.x == 10){
                        matchedCube = value;
                    }
                    break;
                case "z":
                    if(value.GetMesh().position.x == 5){
                        matchedCube = value;
                    }
                    break;
                case "e":
                    if(value.GetMesh().position.x == 0){
                        matchedCube = value;
                    }
                    break;
                case "r":
                    if(value.GetMesh().position._x == -5){
                        matchedCube = value;
                    }
                    break;
                case "t":
                    if(value.GetMesh().position._x == -10){
                        matchedCube = value;
                    }
                    break;
            }
        }

        console.log(matchedCube);

        if(matchedCube === null){
            MyScript._score = MyScript._score - 1;
        } else {
            MyScript._score = MyScript._score + 1;
            Cube.dispose(matchedCube.name);
        }
        this.showScore();
    }

    public showScore() {
        if(MyScript._score >= -10) {
            this._scoreElem.innerHTML = `score : ${MyScript._score}`;   
        } else {
            this._scoreElem.style.backgroundColor = "#FF2000";
            this._scoreElem.innerHTML = `T'as perdu sale noob :)`;
        }
    }
}
