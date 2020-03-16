<template>
  <div class="main">
    <div class="header">
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
    <div class="app">
      <v-app id="inspire">
        <div>
          <v-carousel v-model="model">
            <v-carousel-item v-for="(image, i) in images" :key="i">
              <v-img
                gradient="to top right, rgba(100,113,201,.7), rgba(24,32,72,.7)"
                class="medical"
                :src="image"
                width="100%"
                aspect-ratio="2"
                tile
              >
                <v-row class="fill-height" align="center" justify="center">
                  <div class="display-3">Take care of your health</div>
                </v-row>
              </v-img>
            </v-carousel-item>
            <v-banner two-line>
              <v-avatar slot="icon" color="deep-purple accent-4" size="40">
                <v-icon icon="mdi-lock" color="white">mdi-lock</v-icon>
              </v-avatar>Three line text string example with two actions. One to two lines is preferable. Three lines should be considered the maximum string length on desktop in order to keep messages short and actionable.
              <template
                v-slot:actions
              >
                <v-btn text color="deep-purple accent-4">Action</v-btn>
                <v-btn text color="deep-purple accent-4">Action</v-btn>
              </template>
            </v-banner>
          </v-carousel>
        </div>
      </v-app>
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
</style>
<script>
import Vuetify from "vuetify";
export default {
  name: "ContactInfo",
  props: {
    info: String
  },
  vuetify: new Vuetify(),
  data: () => {
    return {
      images: [
        "https://static1.squarespace.com/static/564dfd3ee4b0678bea6ec649/5653036de4b037d305e758b6/59a5441d4c0dbf78d3dad8e7/1511535681017/v-img_6973.JPG?format=1500w",
        "https://i.pinimg.com/564x/34/5d/c9/345dc950876f8bb6a14a43dccc6be7e3.jpg",
        "https://www.thailandmedical.news/uploads/editor/files/study-confirms-ai.jpg"
      ],
      model: 0,
      drawer: false,
      group: null,
      title: "Click Me"
    };
  },
  watch: {
    group() {
      this.drawer = false;
    }
  }
};
</script>
<style></style>