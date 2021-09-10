import { ScriptMap } from "./tools";

/**
 * Defines the interface that exposes all exported scripts in this project.
 */
export interface ISceneScriptMap extends ScriptMap {
	"src/scenes/bg-move.ts": any;
	"src/scenes/cam.ts": any;
	"src/scenes/fret.ts": any;
	"src/scenes/ground.ts": any;
	"src/scenes/light_blink.ts": any;
}

/**
 * Defines the map of all available scripts in the project.
 */
export const scriptsMap: ISceneScriptMap = {
	"src/scenes/bg-move.ts": require("./bg-move"),
	"src/scenes/cam.ts": require("./cam"),
	"src/scenes/fret.ts": require("./fret"),
	"src/scenes/ground.ts": require("./ground"),
	"src/scenes/light_blink.ts": require("./light_blink"),
}
