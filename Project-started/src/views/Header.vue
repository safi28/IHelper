<template>
<!-- <Header></Header> -->
</template>

<style scoped>
.grey {
  background-size: cover;
}
.auth {
  color: wheat;
}
</style>
<script>
import ContactInfo from "@/components/Contact";
import Vuetify from "vuetify";
import login from "@/components/auth/Auth";
import * as firebase from "firebase/app";
import Noty from "noty";
import Header from "@/components/core/Header";

export default {
  name: "HeaderMain",
  vuetify: new Vuetify(),
  components: {
    ContactInfo,
    login,
    Header
  }
};
</script>