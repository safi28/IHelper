<template>
  <v-app id="inspire">
    <v-container>
      <v-row class="mb-6" no-gutters>
        <v-col cols="14" md="8">
          <v-card height="1200" width="2000" class="overflow-hidden">
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
            <v-layout column>
              <v-card>
                <v-card-text>
                  <v-flex class="mb-4">
                    <v-avatar size="96" class="mr-4">
                      <img src="../../../assets/slogo.png" alt="Avatar" />
                    </v-avatar>
                    <v-btn @click="openAvatarPicker">Change Avatar</v-btn>
                  </v-flex>
                  <v-text-field v-model="user.displayName" label="FirstName"></v-text-field>
                  <v-text-field v-model="user.email" label="Email Address"></v-text-field>
                </v-card-text>
                <v-card-actions>
                  <v-btn color="black" :loading="loading" @click.native="update">Save Changes</v-btn>
                </v-card-actions>
                <v-spacer></v-spacer>

                <div class="my-2">
                  <v-btn text small @click="signOut">Logout</v-btn>
                </div>
              </v-card>
            </v-layout>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import * as firebase from "firebase/app";
import { mapState } from "vuex";
export default {
  pageTitle: "My Profile",
  name: "profile",
  data() {
    return {
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
      name: null,
      form: {
        firstName: "",
        lastName: "",
        contactEmail: "",
        avatar: ""
      },
      showAvatarPicker: false
    };
  },
  computed: {
    ...mapState(["user"])
  },

  methods: {
    openAvatarPicker() {
      this.showAvatarPicker = true;
    },
    selectAvatar(avatar) {
      this.form.avatar = avatar;
    },
    signOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$noty.success("Logged out successfully!");
          this.$router.replace({ name: "Home" }).catch(err => {
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