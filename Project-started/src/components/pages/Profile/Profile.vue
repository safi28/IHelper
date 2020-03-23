<template>
  <v-container class="profile">
    <v-row 
      <div class="mx-3"></div>

      <v-badge bordered bottom color="deep-purple accent-6" dot offset-x="10" offset-y="10">
        <v-avatar size="90">
          <v-img src="../../../assets/slogo.png"></v-img>
        </v-avatar>
      </v-badge>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "profile",
  pageTitle: "My Profile",
  data() {
    return {
      loading: false,
      form: {
        firstName: "John",
        lastName: "Doe",
        contactEmail: "john@doe.com",
        avatar: "../../assets/slogo.png"
      },
      showAvatarPicker: false
    };
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

<style scoped>
.profile {
    right: 20px;
}
</style>