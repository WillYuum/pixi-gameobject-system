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
        compsToAwake.add(component);
        components.add(component);
    },
    removeComponent: (component: Component) => {
        const isInAwakeSet = compsToAwake.has(component);
        if (isInAwakeSet) {
            compsToAwake.delete(component);
        }

        components.delete(component);
    },
}

export const public_ComponentManager = {
    AwakeAvailableComponents: () => {
        const noNeedToAwake = compsToAwake.size === 0;
        if (noNeedToAwake) return;

        for (let component of compsToAwake) {
            component.onAwake();
        }

        compsToAwake.clear();
    },
    UpdateComponents: (deltaTime: number) => {
        for (let component of components) {
            component.onUpdate(deltaTime);
        }
    }
}