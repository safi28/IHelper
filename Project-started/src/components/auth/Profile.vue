
<template>
  <v-container>
  <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-card-text>
          <div class="text-md-center">
            <v-icon large color="green darken-2">check_circle</v-icon>
              <h1 class="green--text">Login Success</h1>
              <h4 class="headline mb-0"><b class="red--text">Name :</b> {{ user.name }}</h4>
              <h4 class="headline mb-0"><b class="red--text">Email :</b> {{ user.email }}</h4>
          </div>
        </v-card-text>
     </v-card>
    </v-flex>
  </v-layout>
  </v-container>
</template>

<script>
import * as firebase from "firebase/app";
import { mapState, mapMutations } from "vuex";
import mainMenu from "@/components/core/Menu/Main.vue";

export default {
  pageTitle: "My Profile",
  name: "profile",
  components: { mainMenu },
  props: {
    isAuth: Boolean
  },
  data() {
    return {
      username: null
    };
  },
  computed: {
    // ...mapState(["user"]),
    user() {
      return this.$store.getters.user;
    }
  },
  methods: {                          
    signOut() {
      this.$store.dispatch("logout");
      localStorage.removeItem("userId");
      localStorage.removeItem("token");

      this.$emit("onAuth", false);
      this.$noty.success("Logged out successfully!");
      this.$router.replace({ name: "publicHome" });
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