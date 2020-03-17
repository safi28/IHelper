<template>
  <div class="contact">
    <ContactInfo></ContactInfo>
  </div>
</template>

<style lang="css" scoped>
.contact {
  /* background-image: url("../assets/img.png"); */
  background-size: cover;
  width: 100%;
  height: 800%;
}
</style>

<script>
import ContactInfo from "@/components/Contact.vue";
import Header from "@/components/core/Header.vue";

export default {
  name: "Contact",
  components: { ContactInfo, Header }
};
</script>

<style></style>
