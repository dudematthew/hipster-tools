import { defineStore } from "pinia";
import axios from 'axios';

const useServerStore = defineStore('server', {
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
        const response = await axios.get("http://localhost:3000/api/users");
        console.log(response.data);
        this.userList = response.data;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    async login(id, password) {
      try {
        const response = await axios.post("http://localhost:3000/api/auth/login", {
          id,
          password,
        });
        
        // Get response status code
        const statusCode = response.status;

        console.log(response.status);

        // If login success, set isLoggedIn to true
        if (statusCode === 200 || statusCode === 201) {
          this.isLoggedIn = true;
        }

        console.log(response);

        return statusCode;

      } catch (error) {
        if (error.response) {
          return error.response.status;
        } else {
          console.error(error);
          throw error;
        }
      }
    }
  },
});

export { useServerStore };
