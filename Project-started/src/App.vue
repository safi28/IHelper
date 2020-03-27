<template>
  <div class="app">
    <router-view></router-view>
    <Footer></Footer>
  </div>
</template>
<script>
import publicHome from "./components/core/Home/Home-public";
import Footer from "./components/core/Footer";
import login from "./components/auth/Auth";
import * as firebase from "firebase";
import privateHome from "./components/core/Home/Home-private";
import appHeader from "./components/core/Header";
import { mapState } from "vuex";
export default {
  name: "App",
  components: {
    publicHome,
    Footer,
    login,
    appHeader
  },
  data: () => ({
    isLoggedIn: true
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
  },
  computed: {
    ...mapState(["user"])
  },
  beforeMount() {
    firebase.auth().onAuthStateChanged(user => {
      // initially user = null, after auth it will be either <fb_user> or false
      if (user) {
        this.$store.commit("setUser", user);
        if (user !== null && this.$route.path === "/login") {
          this.$router.replace("/");
        }
      }
    });
  }
};
</script>
