import { ComponentManager } from "./ComponentManager";
import { GameObject } from "./GameObject";

/**
 *  Base class for all components which will allow to add game logic in
 *  Example: ReelRender, SpinRender, WinRender
 */
export class Component {
    gameObject: GameObject | undefined;
    private _enabled: boolean = false;
    private _isAwake: boolean = false;

    constructor() { }

    /** Called once when the Component Manager Calls Awake */
    awake() { }

    /** Called every time the component is added to the gameobject or when switching enabled value to true. */
    onEnable() { }

    /** Called every time  the component is removed from the gameobject or when switching enabled value to false. */
    onDisable() { }

    /** Called every frame. */
    update(deltaTime: number) { }

    /** Properly destroys the component to allow garbage collection. */
    destroy() {
        this.enabled = false; // Ensure `onDisable` is called

        if (this.gameObject) {
            this.gameObject.removeComponent(this);
        }

        ComponentManager.getInstance().removeComponent(this);

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
            if (!this._isAwake) {
                this.awake();
                this._isAwake = true;
            }
            ComponentManager.getInstance().addComponent(this);
            this.onEnable();
        } else {
            ComponentManager.getInstance().removeComponent(this);
            this.onDisable();
        }
    }
}
