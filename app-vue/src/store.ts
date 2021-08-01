import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";
import { watch } from "vue";

export const useStore = defineStore({
  id: "store",
  state: () => ({
    count: 0,
    name: useStorage("name", "").value,
    nameInStorage: useStorage("name", ""),
  }),
  actions: {
    increment() {
      this.count++;
    },
    writeToStorage() {
      this.nameInStorage = this.name;
      // localStorage.setItem("name", this.name);
    },
  },
});
