import { defineStore } from "pinia";

const useMainStore = defineStore('main', {
  id: "main",
  state: () => ({
    previousRoute: null,
  }),
  actions: {
    setPreviousRoute(route) {
      this.previousRoute = route;
    },
    clearPreviousRoute() {
      this.previousRoute = null;
    }
  },
});

export { useMainStore };