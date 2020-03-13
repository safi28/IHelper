<template>
  <div class="app">
    <div class="logged" v-if="isSignedIn">
      <Dashboard></Dashboard>
    </div>
    <div v-else>
      <ContactInfo></ContactInfo>
    </div>
    
  </div>
</template>
<style lang="css" scoped>
img {
  background-size: cover;
  width: 100%;
  height: 100%;
}
</style>


<script>
import ContactInfo from "@/components/Contact.vue";
import EventCar from "@/components/EventCar.vue";
import * as firebase from "firebase/app";
import Dashboard from "@/components/Dashboard.vue";

export default {
  name: "Home",
  components: {
    ContactInfo,
    EventCar,
    Dashboard
  },
  methods: {
    isSignedIn() {
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          var user = firebase.auth().currentUser;
          var name, email, photoUrl, uid, emailVerified;

          if (user != null) {
            name = user.displayName;
            email = user.email;
            photoUrl = user.photoURL;
            emailVerified = user.emailVerified;
            uid = user.uid;
            console.log(user);
          }
          return true;
        } else {
          return false;
        }
      });
    },
    mounted() {
      this.isSignedIn();
    }
  }
};
</script>
