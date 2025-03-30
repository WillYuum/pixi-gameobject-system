/**
 * This module handles the management and operation of all components in the system.
 * Components are managed through internal and public APIs for adding, removing, updating, and awakening components.
 *
 * **Internal API**: 
 * - Handles the internal operations of adding and removing components to/from the collection.
 * - Should not be accessed directly by consumers of the module.
 *
 * **Public API**: 
 * - Provides external methods for updating and awakening all components in the collection.
 * - These methods are safe to call from other parts of the codebase.
 */

import { Component } from "./Component";


const components: Set<Component> = new Set();
const compsToAwake: Set<Component> = new Set();


export const internal_ComponentManager = {
    addComponent: (component: Component) => {
        components.add(component);
    },
    removeComponent: (component: Component) => {
        components.delete(component);
    },
    queueAwake: (component: Component) => {
        compsToAwake.add(component);
    }
}

export const public_ComponentManager = {
    UpdateComponents: (deltaTime: number) => {
        if (compsToAwake.size > 0) {
            AwakeComponents();
        }

        for (let component of components) {
            component.onUpdate(deltaTime);
        }
    }
}


function AwakeComponents() {
    for (let component of compsToAwake) {
        component.onAwake();
    }

    compsToAwake.clear();
}