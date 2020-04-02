<template>
  <div class="main">
    <HeaderUnL></HeaderUnL>
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

<script>
import Vuetify from "vuetify";
import HeaderUnL from "@/components/core/HeaderUnL.vue";

export default {
  name: "publicHome",
  props: {
    isAuth: Boolean
  },
  vuetify: new Vuetify(),
  components: {
    HeaderUnL
  },
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
  },
  beforeCreate() {
    this.$emit("onAuth", localStorage.getItem("token") !== null);
  }
};
</script>
<style scoped>
.main {
  background-image: linear-gradient(
      to top right,
      rgba(97, 116, 223, 0.7),
      rgba(25, 32, 72, 0.7)
    ),
    url("https://i.pinimg.com/736x/68/46/10/684610d7617668e4c68c19431a4f338f.jpg");
}
.grey {
  background-size: cover;
}
.auth {
  color: wheat;
}
</style>