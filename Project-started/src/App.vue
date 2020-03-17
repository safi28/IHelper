<template>
  <div class="app">
 
    <app-header></app-header>  
    <router-view></router-view>
    <Footer></Footer>
  </div>
</template>
<script>
import ContactInfo from "./components/Contact";
import Footer from "./components/core/Footer";
import login from "./components/auth/Auth";
import * as firebase from "firebase";
import LoggedHome from "./components/pages/LoggedPage";
import HeaderMain from "./views/Header";
import appHeader from "./components/core/Header";

export default {
  name: "App",
  components: {
    ContactInfo,
    Footer,
    login,
    appHeader
 
  },
  data: () => ({
    isLoggedIn: false
  }),
  methods: {
    isSignedIn() {
      if (firebase.auth().currentUser) {
        return true;
      } else {
        return false;
      }
    }
  },
  mounted() {
    this.isSignedIn();
  }
};
</script>
