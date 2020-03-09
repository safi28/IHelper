<template>
  <span class="app">
    <app-header></app-header>
    <router-view></router-view>
    <Footer></Footer>
  </span>
</template>
<script>
import ContactInfo from "./components/Contact";
import Footer from "./components/Footer";
import Header from "./components/Header";

export default {
  name: "App",
  components: {
    ContactInfo,
    Footer,
    "app-header": Header
  },

  data: () => ({
    //
  })
};
</script>
