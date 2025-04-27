import { Component } from "./Component";
import { Container, ViewContainer } from "pixi.js";
import { internal_ComponentManager } from "./ComponentManager";

/**
 * GameObject class is a container for components and visual components.
 * This class will help to keep game and rendering logic separate
 * but still accessible to each other.
 * 
 * Each GameObject will need a holder so if it had visual components,
 * it can be added to the stage and be rendered.
 */
export class GameObject {
    name: string;
    components: Component[] = [];
    viewComponents: ViewContainer[] = [];
    holder: Container;

    constructor(name: string, parent: Container) {
        this.name = name;
        this.holder = new Container();
        parent.addChild(this.holder);
    }


    addComponent<T extends Component>(component: T): T {
        this.components.push(component);

        component.gameObject = this;
        internal_ComponentManager.addComponent(component);

        return component;
    }

    getComponent<T extends Component>(componentClass: new (...args: any[]) => T): T | undefined {
        return this.components.find(c => c instanceof componentClass) as T | undefined;
    }

    removeComponent(component: Component): Boolean {
        const index = this.components.indexOf(component);
        if (index !== -1) {
            this.components.splice(index, 1);
            component.enabled = false;
            return true;
        }

        return false;
    }

    addVisualComponent<T extends ViewContainer>(viewComponent: T): T {
        this.viewComponents.push(viewComponent);
        this.holder.addChild(viewComponent);
        return viewComponent;
    }

    getVisualComponent<T extends ViewContainer>(componentClass: new (...args: any[]) => T): T | undefined {
        return this.viewComponents.find(vc => vc instanceof componentClass) as T | undefined;
    }

    removeVisualComponent(viewComponent: ViewContainer): void {
        const index = this.viewComponents.indexOf(viewComponent);
        if (index !== -1) {
            this.viewComponents.splice(index, 1);
        }
    }


    destroy() {
        // Destroy all visual components
        for (const view of this.viewComponents) {
            if (view.parent) {
                view.parent.removeChild(view);
            }
            view.destroy({ children: true });
        }
        this.viewComponents.length = 0;

        // Destroy all components
        for (const component of this.components) {
            component.destroy();
        }
        this.components.length = 0;

        // Remove and destroy the holder
        if (this.holder.parent) {
            this.holder.parent.removeChild(this.holder);
        }
        this.holder.destroy({ children: true });

        // Break references to allow GC
        this.holder = null as any;
    }

}