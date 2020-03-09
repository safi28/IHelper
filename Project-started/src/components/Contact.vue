<template>
  <v-app id="inspire">
       <v-carousel v-model="model">
        <v-carousel-item v-for="(color, i) in colors" :key="color">
          <v-sheet :color="color" height="100%" tile>
            <v-row class="fill-height" align="center" justify="center">
              <div class="display-3">Slide {{ i + 1 }}</div>
            </v-row>
          </v-sheet>
        </v-carousel-item>
      </v-carousel>
  </v-app>
</template>
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
      colors: ["primary", "secondary", "yellow darken-2", "red", "orange"],
      model: 0
    };
  }
};
</script>
<style></style>