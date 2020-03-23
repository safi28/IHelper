<template>
  <div class="app">
    <div id="main">
      <v-app id="inspire">
        <v-container>
          <v-row class="mb-6" no-gutters>
            <v-col cols="14" md="8">
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
                      <router-link :to="{ name: 'profile' }">
                        <v-list-item-avatar>
                          <img src="https://svgur.com/i/65U.svg" />
                        </v-list-item-avatar>
                      </router-link>

                      <v-list-item-content>
                        <v-list-item-title>Profile</v-list-item-title>
                        <v-list-item-subtitle>Subtext</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>

                    <v-divider></v-divider>

                    <router-link :to="{ name: 'Meistask' }">
                      <v-list-item link>
                        <v-list-item-icon>
                          <v-icon>mdi-view-dashboard</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>
                          Dashboard
                          <router-link to="/meistask"></router-link>
                        </v-list-item-title>

                        <v-list-item-icon></v-list-item-icon>
                      </v-list-item>
                    </router-link>
                    <router-link :to="{ name: 'calendar'}">
                      <v-list-item link>
                        <v-list-item-icon>
                          <v-icon>mdi-heart</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>
                          Health
                          <router-link to="/calendar"></router-link>
                        </v-list-item-title>

                        <v-list-item-icon></v-list-item-icon>
                      </v-list-item>
                    </router-link>
                    <router-link :to="{ name: 'Calories'}">
                      <v-list-item link>
                        <v-list-item-icon>
                          <v-icon>mdi-food-apple</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>
                          Food
                          <router-link to="/calories"></router-link>
                        </v-list-item-title>

                        <v-list-item-icon></v-list-item-icon>
                      </v-list-item>
                    </router-link>
                    <router-link :to="{ name: 'About'}">
                      <v-list-item link>
                        <v-list-item-icon>
                          <v-icon>mdi-help-box</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>
                          About
                          <router-link to="/about"></router-link>
                        </v-list-item-title>

                        <v-list-item-icon></v-list-item-icon>
                      </v-list-item>
                    </router-link>
                  </v-list>
                </v-navigation-drawer>

                <v-parallax height="1000" class="parall" width="900" dark>
                  <v-row align="center" justify="center">
                    <v-col class="text-center" cols="16">
                      <h1 class="display-1 font-weight-thin mb-4">Your online health assistant</h1>
                      <h4 class="subheading">Track your results!</h4>
                    </v-col>
                  </v-row>
                </v-parallax>
              </v-card>
            </v-col>
            <v-col cols="14" md="4">
              <v-card height="900" width="9000" outlined tile>
                <v-timeline>
                  <v-timeline-item v-for="(year, i) in years" :key="i" :color="year.color" small>
                    <template v-slot:opposite>
                      <span
                        :class="`headline font-weight-bold ${year.color}--text`"
                        v-text="year.year"
                      ></span>
                    </template>
                    <div class="py-4">
                      <h2 :class="`headline font-weight-light mb-4 ${year.color}--text`">Lorem ipsum</h2>
                      <div>Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod convenire principes at. Est et nobis iisque percipit, an vim zril disputando voluptatibus, vix an salutandi sententiae.</div>
                    </div>
                  </v-timeline-item>
                </v-timeline>
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
  background-image: linear-gradient(
      to top right,
      rgba(97, 116, 223, 0.7),
      rgba(25, 32, 72, 0.7)
    ),
    url("https://i.pinimg.com/736x/68/46/10/684610d7617668e4c68c19431a4f338f.jpg");
}
.home {
  color: aliceblue;
}
</style>

<script>
import * as firebase from "firebase";
import { mapGetters } from "vuex";
import AppHeader from "@/components/core/Header.vue";

export default {
  name: "LoggedHome",
  components: { AppHeader },
  data() {
    return {
      isLoggedIn: false,
      drawer: true,
      items: [
        { title: "Dashboard", icon: "mdi-view-dashboard", link: "/about" },
        { title: "Health", icon: "mdi-heart", link: "/about" },
        { title: "Food", icon: "mdi-food-apple", link: "/calories" },
        { title: "Photos", icon: "mdi-image", link: "/health" },
        { title: "About", icon: "mdi-help-box", link: "/about" }
      ],
      color: "primary",
      right: false,
      miniVariant: true,
      expandOnHover: true,
      background: true,
      tab: null,
      years: [
        {
          color: "cyan",
          year: "1960"
        },
        {
          color: "green",
          year: "1970"
        },
        {
          color: "pink",
          year: "1980"
        }
      ]
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