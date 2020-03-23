<template>
  <div class="app">
    <Header></Header>
    <ContactInfo></ContactInfo>
  </div>
</template>

<script>
import ContactInfo from "@/components/Contact.vue";
import * as firebase from "firebase/app";
import Dashboard from "@/components/Dashboard.vue";
import LoggedHome from "@/components/pages/LoggedPage.vue";
import HeaderMain from "@/views/Header.vue";
import Header from "@/components/core/Header";

export default {
  name: "Home",
  components: {
    ContactInfo,
    Dashboard,
    LoggedHome,
    HeaderMain,
    Header
  },
  data: function() {
    return {
      isLoggedIn: false
    };
  },
  methods: {
    isSignedIn() {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          this.isLoggedIn = true;
        } else {
          this.isLoggedIn = false;
        }
      });
    },
    mounted() {
      this.isSignedIn();
    }
  }
};
</script>

<style lang="css" scoped>
img {
  background-size: cover;
  width: 100%;
  height: 100%;
}

</style>