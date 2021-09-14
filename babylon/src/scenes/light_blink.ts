import { ParticleSystem, PointLight, Texture, Vector3 } from "@babylonjs/core";

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
export default class MyScript extends PointLight {
    /**
     * Override constructor.
     * @warn do not fill.
     */
    // @ts-ignore ignoring the super call as we don't want to re-init
    protected constructor() { }

    /**
     * Called on the node is being initialized.
     * This function is called immediatly after the constructor has been called.
     */
    public onInitialize(): void {
        // ...
    }

    /**
     * Called on the scene starts.
     */
    public onStart(): void {
        // ...
    }

    /**
     * Called each frame.
     */
    public onUpdate(): void {
        if(Math.random() * 11 <= 0.4) {
            this.intensity = 1 -  Math.random()/2; 

            //Create a particle system


            const particleSystem = new ParticleSystem("particles", 3000, this.getScene());
            //Texture of each particle
            particleSystem.particleTexture = new Texture("scenes/scene/files/spark_final.png", this.getScene());
            // Position where the particles are emiited from
            particleSystem.emitter = this.position;
            particleSystem.direction1 = new Vector3(-6, -2, -1);
            particleSystem.direction2 = new Vector3(6, -2, -1);
            particleSystem.minSize = 0,1;
            particleSystem.maxSize = Math.random() + 0.3;
        
            particleSystem.targetStopDuration = 1;
            particleSystem.updateSpeed = 0.08;
            particleSystem.minEmitBox = new Vector3(1, 1, 1); // Starting all from
            particleSystem.maxEmitBox = new Vector3(-2, -2, -2);
            particleSystem.start();
        }
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
}
