<template>
    <div class="container mt-5">
      <h2>Register</h2>
      <form @submit.prevent="register">
        <div class="form-group">
          <label for="username">Username</label>
          <input v-model="username" type="text" class="form-control" id="username" required>
        </div>
        <div class="form-group">
          <label for="first_name">First Name</label>
          <input v-model="first_name" type="text" class="form-control" id="first_name" required>
        </div>
        <div class="form-group">
          <label for="last_name">Last Name</label>
          <input v-model="last_name" type="text" class="form-control" id="last_name" required>
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input v-model="password" type="password" class="form-control" id="password" required>
        </div>
        <button type="submit" class="btn btn-primary">Register</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        username: '',
        first_name: '',
        last_name: '',
        password: '',
      };
    },
    methods: {
      async register() {
        try {
          await axios.post(`${process.env.VUE_APP_API_URL}/register/`, {
            username: this.username,
            first_name: this.first_name,
            last_name: this.last_name,
            password: this.password,
          });
          this.$router.push('/login');
        } catch (error) {
          console.error('Registration error:', error);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add any additional styling here */
  </style>
  