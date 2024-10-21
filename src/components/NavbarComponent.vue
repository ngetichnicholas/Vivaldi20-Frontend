<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="#">Vivaldi20</a>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <router-link class="nav-link" to="/">Home</router-link>
        </li>
        <template v-if="!authState.isAuthenticated">
          <li class="nav-item">
            <router-link class="nav-link" to="/login">Login</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/register">Register</router-link>
          </li>
        </template>
        <template v-else>
          <li class="nav-item">
            <router-link class="nav-link" to="/profile">Profile</router-link>
          </li>
          <li class="nav-item">
            <button class="nav-link btn btn-link" @click="logout">Logout</button>
          </li>
        </template>
      </ul>
    </div>
  </nav>
</template>

<script>
import axios from "axios";
import { authState, checkAuthentication } from "@/auth"; // Import the auth state

export default {
  data() {
    return {
      authState,
    };
  },
  methods: {
    async logout() {
      try {
        // Make the logout request to the API
        const token = localStorage.getItem("token");
        await axios.post(`${process.env.VUE_APP_API_URL}/logout/`, {}, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });

        // Clear the token and user data from localStorage
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        // Update the authentication state
        authState.isAuthenticated = false;
        authState.user = null;

        // Redirect to the home page after logout
        this.$router.push("/");
      } catch (error) {
        console.error("Logout error:", error);
      }
    },
  },
  created() {
    // Check the authentication status when the component is created
    checkAuthentication();
  },
};
</script>

<style scoped>
/* Add any additional styling here */
</style>
