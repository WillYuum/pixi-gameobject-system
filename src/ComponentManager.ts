import { Component } from "./Component";

/**
 * ComponentManager is a singleton class which will manage all the important parts
 * in the components so they can run as expected.
 * These parts are:
 * 1. Awake all components
 * 2. Update all components
 * 3. Add components
 * 4. Remove components
 */
export class ComponentManager {
    private static instance: ComponentManager;
    private components: Set<Component> = new Set();

    // Private constructor to prevent direct instantiation
    private constructor() { }

    // Get the singleton instance
    static getInstance() {
        if (!this.instance) {
            this.instance = new ComponentManager();
        }
        return this.instance;
    }

    awakeComponents() {
        for (let component of this.components) {
            component.awake();
        }
    }



    addComponent(component: Component) {
        this.components.add(component);
    }

    removeComponent(component: Component) {
        this.components.delete(component);
    }

    updateComponents(deltaTime: number) {
        for (let component of this.components) {
            component.update(deltaTime);
        }
    }
}
