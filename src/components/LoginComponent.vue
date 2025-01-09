<template>
  <div class="container mt-5">
    <h2>Login Page</h2>
    <form @submit.prevent="login">
      <div class="form-group">
        <label for="username">Username</label>
        <input v-model="username" type="text" class="form-control" id="username" required />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input v-model="password" type="password" class="form-control" id="password" required />
      </div>
      <button type="submit" class="btn btn-primary">Login</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import { authState } from "@/auth"; // Import the auth state

export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post(`${process.env.VUE_APP_API_URL}/login/`, {
          username: this.username,
          password: this.password,
        });

        // Log the formatted response for debugging
        console.log("Login Response:", JSON.stringify(response.data, null, 2));

        const user = response.data.data.user;
        const token = response.data.data.token;

        // Store token and user details in localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("userId", user.id);

        localStorage.setItem("user", JSON.stringify(user)); // Store user data as JSON string

        // Update the shared auth state
        authState.isAuthenticated = true;
        authState.user = user;

        // Redirect to the home page
        this.$router.push("/");
      } catch (error) {
        console.error("Login error:", error);
      }
    },
  },
};
</script>

<style scoped>
/* Add any additional styling here */
</style>
