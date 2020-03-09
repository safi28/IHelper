<template>
  <div class="app">
      <ContactInfo></ContactInfo>
  </div>
</template>
<style lang="css" scoped>
img {
  background-size: cover;
  width: 100%;
  height: 100%;
}
</style>


<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import ContactInfo from "@/components/Contact.vue";
import { Footer } from "@/components/Footer.vue";

export default {
  name: "Home",
  components: {
    HelloWorld,
    ContactInfo,
    Footer
  }
};
</script>
