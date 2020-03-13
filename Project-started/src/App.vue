<template>
  <div class="app">
    <Header></Header>
    <router-view></router-view>
    
    <Footer></Footer>
  </div>
</template>
<script>
import ContactInfo from "./components/Contact";
import Footer from "./components/Footer";
import Header from "./components/Header";
import login from "./components/auth/Auth";
import * as firebase from "firebase";

export default {
  name: "App",
  components: {
    ContactInfo,
    Footer,
    Header,
    login
  },
  data: () => ({
    isLoggedIn: false
  }),
  methods: {
    isSignedIn() {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          this.isLoggedIn = true;
        } else {
          this.isLoggedIn = false;
        }
      });
    }
  },
  mounted() {
    this.isSignedIn();
  }
};
</script>
