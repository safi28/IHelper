<template>
  <v-app>
    <div class="wrapper">
      <h1>404 Error Page #2</h1>
      <p class="zoom-area"></p>
      <section class="error-container">
        <span class="four">
          <span class="screen-reader-text">4</span>
        </span>
        <span class="zero">
          <span class="screen-reader-text">0</span>
        </span>
        <span class="four">
          <span class="screen-reader-text">4</span>
        </span>
      </section>
    </div>
    <div class="home" v-if="userIsAuthenticated">
      <router-link to="dashboard">
        <button>Home</button>
      </router-link>
    </div>
    <div class="home" v-else>
      <router-link to="/">
        <button>Home</button>
      </router-link>
    </div>
  </v-app>
</template>
<script>
export default {
  props: {
    isAuth: Boolean
  },
  data() {
    return {};
  },
  //   beforeCreate() {
  //     this.$emit("onAuth", localStorage.getItem("token") !== null);
  //     // console.log(this.isAuth);
  //   },
  computed: {
    userIsAuthenticated() {
      return (
        this.$store.getters.user !== null &&
        this.$store.getters.user !== undefined
      );
    }
  }
};
</script>
<style lang="css" scoped>
@import url("./styles-error.css");
</style>