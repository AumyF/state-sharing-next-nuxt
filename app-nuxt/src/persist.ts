import type { PiniaPluginContext } from "pinia";

let isRegistered = false;

export const PiniaPersistencePlugin = ({ store }: PiniaPluginContext) => {
  console.log("plugin");
  if (!isRegistered) {
    store.$subscribe(() => {
      console.log("subsc");
    });
    isRegistered = true;
  }
};
