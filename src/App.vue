<template>
  <div id="app">
    <Navbar />
    <router-view />
  </div>
</template>

<script>
import Navbar from './components/NavbarComponent.vue';

export default {
  components: {
    Navbar,
  },
};
</script>

<style>
@import "~bootstrap/dist/css/bootstrap.min.css";
</style>
