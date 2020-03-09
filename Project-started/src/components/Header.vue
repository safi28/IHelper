<template>
  <div id="app">
    <v-card class="overflow-hidden">
      <v-app-bar
        absolute
        color="#6A76AB"
        dark
        shrink-on-scroll
        prominent
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
              <v-list-item-title><router-link to="login" class="auth">Log In</router-link></v-list-item-title>
              </v-list-item>

              <v-list-item>
              <v-list-item-title><router-link to="login" class="auth">Register</router-link></v-list-item-title>
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
</template>
<style scoped>
.grey {
  background-size: cover;
}
.auth {
    color: wheat;
}
</style>
<script>
import ContactInfo from "../components/Contact";
import Vuetify from "vuetify";
import { login } from "../components/Login";

export default {
  name: "Header",
  vuetify: new Vuetify(),
  components: {
    ContactInfo,
    login
  },
  data: () => ({
    drawer: false,
    group: null
  }),
  watch: {
    group() {
      this.drawer = false;
    }
  }
};
</script>