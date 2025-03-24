import { ComponentManager } from "./ComponentManager";
import { GameObject } from "./GameObject";

/**
 *  Base class for all components which will allow to add game logic in
 *  Example: ReelRender, SpinRender, WinRender
 */
export class Component {
    gameObject: GameObject | undefined;

    awake() {

    }

    enable() {
        ComponentManager.getInstance().addComponent(this);
        this.onEnable();
    }

    disable(){
        ComponentManager.getInstance().removeComponent(this);
        this.onDisable();
    }

    onDisable(){

    }

    onEnable(){

    }

    update(deltaTime: number) {
    }

    destroy(){
        this.disable();
    }
}
