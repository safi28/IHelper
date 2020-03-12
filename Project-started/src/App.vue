<template>
  <div class="app">
    <div v-if="isLogged">
      <!-- <Header></Header> -->
      <h2>here</h2>
    </div>
    <div v-else>
      <h1>hello</h1>
    </div>
    <router-view></router-view>
    <Footer></Footer>
  </div>
</template>
<script>
import ContactInfo from "./components/Contact";
import Footer from "./components/Footer";
import Header from "./components/Header";
import login from "./components/Login";
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
    isLogged() {
      var user = firebase.auth().currentUser;
      console.log(user);

      this.firebase.auth().onAuthStateChanged(user => {
        if (user) {
          isLoggedIn = true;
          
        } else {
          isLoggedIn = false;          
        }
      });
    }
  }
};
</script>
