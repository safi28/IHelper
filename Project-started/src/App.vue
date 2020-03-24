<template>
  <div class="app">
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
import { mapState } from "vuex";
export default {
  name: "App",
  components: {
    ContactInfo,
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
