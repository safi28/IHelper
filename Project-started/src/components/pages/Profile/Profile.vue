<template>
  <div id="app">
    <v-app id="inspire">
      <v-container>
        <v-row class="mb-6" no-gutters>
          <v-col cols="16" md="10">
            <v-card height="800" width="2000" class="overflow-hidden">
              <mainMenu></mainMenu>
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
  </div>
</template>

<script>
import * as firebase from "firebase/app";
import { mapState } from "vuex";
import mainMenu from "@/components/core/Menu/Main.vue";
export default {
  pageTitle: "My Profile",
  name: "profile",
  components: { mainMenu },
  data() {
    return {};
  },
  computed: {
    ...mapState(["user"])
  },

  methods: {
    signOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$noty.success("Logged out successfully!");
          localStorage.removeItem("userToken");
          this.$router.replace({ name: "publicHome" }).catch(err => {
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
<style scoped>
.mb-6 {
  background-image: linear-gradient(
      to top right,
      rgba(115, 129, 209, 0.171),
      rgba(25, 36, 97, 0.322)
    ),
    url("https://images.pexels.com/photos/313782/pexels-photo-313782.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940");

  /* box-shadow: white 0px 0px 0px 2px, rgb(0, 170, 255) 0px 0px 0px 4px; */
  background-position: center center;
  background-size: cover;
}
</style>