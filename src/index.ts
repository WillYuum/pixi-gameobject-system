import { public_ComponentManager } from "./ComponentManager";

//Main API entry point for the library
export * from "./Component";
export * from "./GameObject";

export function PlayOneLifeCycle(deltaTime: number) {
    public_ComponentManager.AwakeAvailableComponents();
    public_ComponentManager.UpdateComponents(deltaTime);
}