// src/auth.js
import { reactive } from 'vue';

export const authState = reactive({
  isAuthenticated: false,
  user: null,
});

export function checkAuthentication() {
  const token = localStorage.getItem("token");
  if (token) {
    authState.isAuthenticated = true;
    authState.user = JSON.parse(localStorage.getItem("user")); // Store user data as JSON string
  }
}
