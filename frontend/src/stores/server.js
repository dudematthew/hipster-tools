import { defineStore } from "pinia";
import axios from 'axios';
import bartoszImage from '@/assets/img/profile-pictures/bartosz.jpg';
import matiImage from '@/assets/img/profile-pictures/mati.png';

const useServerStore = defineStore({
  id: "server",
  state: () => ({
    isLoggedIn: false,
    userList: [],
  }),
  getters: {},
  actions: {
    async fetchLoginStatus() {
      try {
        // const response = await axios.get("http://localhost:5000/api/check-login");
        // this.isLoggedIn = response.data.isLoggedIn;
        this.isLoggedIn = false;
      } catch (error) {
        // Handle error
        console.error(error);
        throw error;
      }
    },
    async fetchUserList() {
      try {
        // const response = await axios.get("http://localhost:5000/api/users");
        // this.userList = response.data;
        this.userList = [
          {
            name: "Bartosz",
            id: 1,
            image: bartoszImage,
            online: false,
            appAmount: 1,
          },
          {
            name: "Mati",
            id: 2,
            image: matiImage,
            online: true,
            appAmount: 0,
          },
        ]
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
  },
});

export { useServerStore };
