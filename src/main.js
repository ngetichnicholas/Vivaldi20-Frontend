import { createApp } from 'vue'; // Import createApp for Vue 3
import App from './App.vue';
import router from './router'; // Import your router

import $ from 'jquery'; // Import jQuery
import 'bootstrap'; // Import Bootstrap JavaScript
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS


// Create a Vue application
const app = createApp(App);
app.use(router); // Use the router

app.config.globalProperties.$ = $; // Make jQuery available globally

app.mount('#app'); // Mount the app
