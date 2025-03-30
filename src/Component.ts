import { internal_ComponentManager } from "./ComponentManager";
import { GameObject } from "./GameObject";


/**
 *  Base class for all components which will allow to add game logic in
 *  Example: ReelRender, SpinRender, WinRender
 */
export class Component {
    gameObject: GameObject | undefined;
    private _enabled: boolean = false;
    // _isAwake: boolean = false;

    constructor() { }

    // Called on the first frame after the component is added to a GameObject or when the game starts.
    onAwake() { }

    /** Called every time the component is added to the gameobject or when switching enabled value to true. */
    onEnable() { }

    /** Called every time  the component is removed from the gameobject or when switching enabled value to false. */
    onDisable() { }

    /** Called every frame. */
    onUpdate(deltaTime: number) { }

    /** Properly destroys the component to allow garbage collection. */
    destroy() {
        this.enabled = false; // Ensure `onDisable` is called

        if (this.gameObject) {
            this.gameObject.removeComponent(this);
        }

        internal_ComponentManager.removeComponent(this);

        // Break references to allow GC
        this.gameObject = undefined;
    }

    /** Getter and setter for enabling/disabling the component */
    get enabled(): boolean {
        return this._enabled;
    }

    set enabled(value: boolean) {
        if (this._enabled === value) return;

        if (!this.gameObject) {
            throw new Error("Component must be added to a GameObject before enabling/disabling.");
        }

        this._enabled = value;

        if (value) {
            internal_ComponentManager.addComponent(this);
            this.onEnable();
        } else {
            internal_ComponentManager.removeComponent(this);
            this.onDisable();
        }
    }
}
