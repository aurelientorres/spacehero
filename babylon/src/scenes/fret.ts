import { Mesh, StandardMaterial, Scene, Color3, KeyboardEventTypes, KeyboardInfo } from "@babylonjs/core";
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
    
    private _score: number = 0;

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

        console.log(touch.event.key);

        CubeFactory.boxes.forEach((value, index)=> {
            
                if(value.GetMesh().intersectsMesh(this,false)){

                    alert("test")
                    switch(touch.event.key){
                        case "a":
                            if(value.GetMesh().position._x == -10)
                                this._score++
                            break;
                        case "z":
                            if(value.GetMesh().position._x == -5)
                                this._score++
                            break;
                        case "e":
                            if(value.GetMesh().position._x == 0)
                                this._score++
                            break;
                        case "r":
                            if(value.GetMesh().position._x == 5)
                                this._score++
                            break;
                        case "t":
                            if(value.GetMesh().position._x == 10)
                                this._score++
                            break
                        
                    }
                    console.log(this._score)
                }

                
               
            
        });

    }

}
