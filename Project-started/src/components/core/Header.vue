<template>
  <div id="app">
    <div v-if="!isSignedIn">
      <div id="inspire">
        <div>
          <v-app-bar color="deep-purple accent-4" dense dark>
            <router-link :to="{ name: 'LoggedHome'}">
              <div class="my-2">
                <v-btn text small color="primary">Health Information</v-btn>
                <router-link to="/dashboard"></router-link>
              </div>
            </router-link>

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
    </div>
    <div v-if="isSignedIn">
      <v-card class="overflow-hidden">
        <v-app-bar
          color="#6A76AB"
          dark
          shrink-on-scroll
          src="https://picsum.photos/1920/1080?random"
          fade-img-on-scroll
          scroll-target="#scrolling-techniques-2"
        >
          <template v-slot:img="{ props }">
            <v-img v-bind="props" gradient="to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)"></v-img>
          </template>

          <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

          <v-navigation-drawer v-model="drawer" absolute bottom temporary>
            <v-list nav dense>
              <v-list-item-group v-model="group" active-class="deep-purple--text text--accent-4">
                <v-list-item>
                  <v-list-item-title>
                    <router-link to="login" class="auth">Log In</router-link>
                  </v-list-item-title>
                </v-list-item>

                <v-list-item>
                  <v-list-item-title>
                    <router-link to="login" class="auth">Register</router-link>
                  </v-list-item-title>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-navigation-drawer>

          <v-toolbar-title>Health Information</v-toolbar-title>

          <v-spacer></v-spacer>

          <v-btn icon>
            <v-icon>mdi-heart</v-icon>
          </v-btn>

          <v-btn icon>
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </v-app-bar>
      </v-card>
    </div>
  </div>
</template>

<style scoped>
.grey {
  background-size: cover;
}
.auth {
  color: wheat;
}
.dashboard {
  color: wheat;
  text-decoration: none;
}
</style>
<script>
import ContactInfo from "../../components/Contact";
import Vuetify from "vuetify";
import login from "../../components/auth/Auth";
import * as firebase from "firebase/app";
import Noty from "noty";

export default {
  vuetify: new Vuetify(),
  components: {
    ContactInfo,
    login
  },
  props: {
    isLoggedIn: false
  },
  data: () => ({
    drawer: false,
    group: null,
    title: "Click Me",
    user: null,
    authUser: null
  }),
  watch: {
    group() {
      this.drawer = false;
    }
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
    },
    signOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$noty.success("Logged out successfully!");
          this.$router.replace({ name: "ContactInfo" }).catch(err => {
            this.$noty.error("Error router!");
          });
        })
        .catch(err => {
          this.$noty.error("Error");
          console.log(err);
        });
    }
  }
};
</script>