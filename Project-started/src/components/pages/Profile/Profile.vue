<template>
  <v-container fluid>
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
  </v-container>
</template>

<script>
import * as firebase from "firebase/app";
import { mapState } from "vuex";
export default {
  pageTitle: "My Profile",
  name: "profile",
  data() {
    return {
      loading: false,
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