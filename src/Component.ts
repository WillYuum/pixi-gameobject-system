import { ComponentManager } from "./ComponentManager";
import { GameObject } from "./GameObject";

/**
 *  Base class for all components which will allow to add game logic in
 *  Example: ReelRender, SpinRender, WinRender
 */
export class Component {
    gameObject: GameObject | undefined;

    constructor() {
        //TODO: I believe it's better to have this happen when I add the component to a GameObject
        ComponentManager.getInstance().addComponent(this);
    }

    awake() {

    }

    update(deltaTime: number) {
    }
}
