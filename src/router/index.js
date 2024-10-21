import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/HomeComponent.vue';
import Login from '../components/LoginComponent.vue';
import Register from '../components/RegisterComponent.vue';
import Profile from '../components/ProfileComponent.vue';
import NotFound from '../views/NotFoundComponent.vue';

// Function to check if user is authenticated
function isAuthenticated() {
  return !!localStorage.getItem('token'); // Change this based on your auth logic
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: { requiresAuth: true }, // Require authentication for this route
  },
  {
    path: '/:catchAll(.*)', // Catch-all route for 404
    name: 'NotFound',
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation guard to protect routes that require authentication
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  
  if (requiresAuth && !isAuthenticated()) {
    // Redirect to login if the route requires authentication and user is not authenticated
    next({ name: 'Login' });
  } else {
    next(); // Allow access to the route
  }
});

export default router;
