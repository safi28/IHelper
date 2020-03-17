<template>
  <div id="app">
    <v-app id="inspire">
      <v-container>
        <v-card height="900" width="9000" class="overflow-hidden">
          <v-navigation-drawer
            v-model="drawer"
            :color="color"
            :expand-on-hover="expandOnHover"
            :mini-variant="miniVariant"
            :right="right"
            absolute  
            dark
          >
            <v-list dense nav class="py-0">
              <v-list-item two-line :class="miniVariant && 'px-0'">
                <v-list-item-avatar>
                  <img src="https://svgur.com/i/65U.svg" />
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title>Application</v-list-item-title>
                  <v-list-item-subtitle>Subtext</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <v-divider></v-divider>

              <v-list-item v-for="item in items" :key="item.title" link>
                <v-list-item-icon>
                  <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-navigation-drawer>
        </v-card>
      </v-container>
    </v-app>
  </div>
</template>
<style scoped>
.overflow-hidden{
  right: 264px;
  bottom: 13px;
}
</style>>

</style>
<script>
import * as firebase from "firebase";
import { mapGetters } from "vuex";


export default {
  name: "Dashboard",
  components: {
    
  },
  data() {
    return {
      icons: {
      mdiAccount,
      mdiPencil,
      mdiShareVariant,
      mdiDelete,
    },
      isLoggedIn: false,
      drawer: true,
      items: [
        { title: "Dashboard", icon: "mdi-view-dashboard" },
        { title: "Photos", icon: "mdi-image" },
        { title: "About", icon: "mdi-help-box" }
      ],
      color: "primary",
      right: false,
      miniVariant: true,
      expandOnHover: true,
      background: false
    };
  },
  methods: {
    signOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace({
            name: "ContactInfo"
          });
        });
    },
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
    },
  }
};
</script>