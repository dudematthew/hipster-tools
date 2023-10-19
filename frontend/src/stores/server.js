import { defineStore } from "pinia";
import axios from 'axios';

const useServerStore = defineStore({
  id: "server",
  state: () => ({
    isLoggedIn: false,
  }),
  getters: {},
  actions: {
    async checkLoginStatus() {
      try {
        // const response = await axios.get("http://localhost:5000/api/check-login");
        // this.isLoggedIn = response.data.isLoggedIn;
        this.isLoggedIn = false;
      } catch (error) {
        // Handle error
        console.error(error);
        throw error;
      }
    }
  },
});

export { useServerStore };
