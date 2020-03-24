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
          <v-text-field v-model="form.lastName" label="Last Name"></v-text-field>
          <v-text-field v-model="form.contactEmail" label="Email Address"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn color="black" :loading="loading" @click.native="update">Save Changes</v-btn>
        </v-card-actions>
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
        lastName: "Doe",
        contactEmail: "john@doe.com",
        avatar: "MALE_CAUCASIAN_BLOND_BEARD"
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
    }
  }
};
</script>