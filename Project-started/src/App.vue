<template>
  <div class="app">
    <router-view @onAuth="isAuth = $event" :isAuth="isAuth"></router-view>
    <Footer></Footer>
  </div>
</template>
<script>
import Footer from "./components/core/Footer";
import * as firebase from "firebase";

import { mapState } from "vuex";
export default {
  name: "App",
  components: {
    Footer,
  },
  data: () => ({
    isAuth: localStorage.getItem('token') !== null
  }),

  computed: {
    // ...mapState(["user"])
     userIsAuthenticated () {
        return this.$store.getters.user !== null && this.$store.getters.user !== undefined
      }
  },
  // beforeMount() {
  //   firebase.auth().onAuthStateChanged(user => {
  //     // initially user = null, after auth it will be either <fb_user> or false
  //     if (user) {
  //       this.$store.commit("setUser", user);
  //       if (user !== null && this.$route.path === "/signin") {
  //         this.$router.replace("/");
  //       }
  //     }
  //   });
  // }
};
</script>
