<template>
  <span class="app">
    <Header></Header>
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
    Header
  },

  data: () => ({
    //
  })
};
</script>
