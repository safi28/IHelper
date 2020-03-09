<template>
  <v-app id="inspire">
    <div>
      <v-carousel v-model="model">
        <v-carousel-item v-for="(image, i) in images" :key="image">
          <v-img
            gradient="to top right, rgba(100,113,201,.7), rgba(24,32,72,.7)"
            class="medical"
            :src="image"
            width="100%"
            aspect-ratio="2"
            tile
          >
            <v-row class="fill-height" align="center" justify="center">
              <!-- <div class="display-3">  {{ i + 1 }}</div> -->
              <div class="display-3" v-if="i=1">Take care for your health</div>
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
</template>
<style lang="css" scoped>
#inspire {
  background: none;
}
.medical {
  background-size: cover;
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
  data() {
    return {
      images: [
        "https://static1.squarespace.com/static/564dfd3ee4b0678bea6ec649/5653036de4b037d305e758b6/59a5441d4c0dbf78d3dad8e7/1511535681017/v-img_6973.JPG?format=1500w",
        "https://i.pinimg.com/564x/34/5d/c9/345dc950876f8bb6a14a43dccc6be7e3.jpg",
        "https://www.thailandmedical.news/uploads/editor/files/study-confirms-ai.jpg"
      ],
      model: 0
    };
  }
};
</script>
<style></style>