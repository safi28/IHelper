<template>
  <div id="app">
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
        <router-link :to="{ name: 'Health'}">
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
        <router-link :to="{ name: 'Food'}">
          <v-list-item link>
            <v-list-item-icon>
              <v-icon>mdi-food-apple</v-icon>
            </v-list-item-icon>
            <v-list-item-title>
              Food
              <router-link to="/foods"></router-link>
            </v-list-item-title>

            <v-list-item-icon></v-list-item-icon>
          </v-list-item>
        </router-link>
        <router-link :to="{ name: 'Create'}">
          <v-list-item link>
            <v-list-item-icon>
              <v-icon>mdi-help-box</v-icon>
            </v-list-item-icon>
            <v-list-item-title>
              About
              <router-link to="/create"></router-link>
            </v-list-item-title>

            <v-list-item-icon></v-list-item-icon>
          </v-list-item>
        </router-link>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import Vuetify from "vuetify";

export default {
  vuetify: new Vuetify(),
  name: "headerLoad",
  data() {
    return {
      drawer: true,
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
  }
};
</script>

<style scoped>

</style>