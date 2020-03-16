<template>
  <div class="app">
    <div class="header">
      <div id="inspire">
        <v-app-bar color="deep-purple accent-4" dense dark>
          <v-toolbar-title>
            Health Information
            <v-btn icon>
              <v-icon>mdi-heart-outline</v-icon>
            </v-btn>
          </v-toolbar-title>

          <v-spacer></v-spacer>

          <div class="my-2">
            <v-btn text small @click="signOut">Logout</v-btn>
          </div>

          <v-menu left bottom>
            <template v-slot:activator="{ on }">
              <v-btn icon v-on="on">
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>

            <v-list>
              <v-list-item v-for="n in 5" :key="n" @click="() => {}">
                <v-list-item-title>Option {{ n }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-app-bar>
      </div>
    </div>
    <div id="main">
      <v-app id="inspire">
        <v-container>
          <v-row class="mb-4" no-gutters>
            <v-col cols="12" md="8">
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
                <v-parallax
                  height="1000"
                  class="parall"
                  width="900"
                  dark
                  src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
                >
                  <v-row align="center" justify="center">
                    <v-col class="text-center" cols="16">
                      <h1 class="display-1 font-weight-thin mb-4">Vuetify.js</h1>
                      <h4 class="subheading">Build your application today!</h4>
                    </v-col>
                  </v-row>
                </v-parallax>
              </v-card>
            </v-col>
            <v-col cols="12" md="6">
              <v-card height="900" width="9000" outlined tile>
                <v-card-title class="text-center justify-center py-6">
                  <h1 class="font-weight-bold display-3 basil--text">BASiL</h1>
                </v-card-title>

                <v-tabs v-model="tab" background-color="transparent" color="basil" grow>
                  <v-tab v-for="item in categories" :key="item">{{ item }}</v-tab>
                </v-tabs>

                <v-tabs-items v-model="tab">
                  <v-tab-item v-for="item in items" :key="item">
                    <v-card color="basil" flat>
                      <v-card-text>{{ text }}</v-card-text>
                    </v-card>
                  </v-tab-item>
                </v-tabs-items>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-app>
    </div>
  </div>
</template>
<style scoped>
.overflow-hidden {
  right: 264px;
  bottom: 13px;
}
.parall {
  bottom: 50px;
}
</style>

<script>
import * as firebase from "firebase";
import { mapGetters } from "vuex";

export default {
  name: "LoggedHome",
  data() {
    return {
      isLoggedIn: false,
      drawer: true,
      items: [
        { title: "Dashboard", icon: "mdi-view-dashboard" },
        { title: "Health", icon: "mdi-heart" },
        { title: "Food", icon: "mdi-food-apple" },
        { title: "Photos", icon: "mdi-image" },
        { title: "About", icon: "mdi-help-box" }
      ],
      color: "primary",
      right: false,
      miniVariant: true,
      expandOnHover: true,
      background: true,
      tab: null,
      categories: ["Appetizers", "Entrees", "Deserts", "Cocktails"],
      text:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
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
    }
  }
};
</script>