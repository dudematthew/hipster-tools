import { defineStore } from "pinia";
import axios from 'axios';

const useServerStore = defineStore('server', {
  id: "server",
  state: () => ({
    userList: [],
    loginDisabled: false,
    profile: null,
    jwtToken: null,
  }),
  getters: {
    isLoggedIn: () => {
      return this.profile !== null;
    }
  },
  actions: {
    async fetchProfile() {
      console.log("Fetching profile");

      try {
        const response = await axios.get("http://localhost:3000/api/auth/profile");
        console.log(response.data);
        
        // Get response status code
        const statusCode = response.status;
        
        // If login success, set isLoggedIn to true
        if (statusCode === 200) {
          // this.isLoggedIn = true;
          this.profile = response.data;
        }
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    async fetchUserList() {
      try {
        const response = await axios.get("http://localhost:3000/api/users");
        console.log(response.data);
        
        // Get response status code
        const statusCode = response.status;

        // If login success, set isLoggedIn to true
        if (statusCode === 200) {
          // this.isLoggedIn = true;
          response.data.forEach((user) => {
            this.userList.push({
              id: user.id,
              name: user.name,
              image: user.image ?? `https://i.imgur.com/O8EfImP.png`,
              appAmount: 0,
              isAdmin: user.isAdmin ?? false,
            });
          });
        }
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    async login(id, password) {
      console.info(`Logging in with id: ${id}`);

      try {
        const response = await axios.post("http://localhost:3000/api/auth/login", {
          id,
          password,
        });
        
        // Get response status code
        const statusCode = response.status;

        console.log(`Tried to log in, response status: ${response.status}`);

        // If login success, set isLoggedIn to true
        if (statusCode === 200) {
          console.log("Login success: ", response.data);
          await this.fetchProfile();
        }

        console.log(response);

        return statusCode;

      } catch (error) {
        if (error.response) {
          // Check if the error status is 429 (Too Many Requests)
          if (error.response.status === 429) {
            // Set loginDisabled to true
            this.loginDisabled = true;

            // Set loginDisabled to false after 60 seconds
            setTimeout(() => {
              this.loginDisabled = false;
            }, 60000);

          }
          return error.response.status;
        } else {
          console.error(error);
          throw error;
        }
      }
    }
  },
  setup() {
    console.log("Server Store Setup");
    this.fetchProfile();
  }
});

export { useServerStore };
