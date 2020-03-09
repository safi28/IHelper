<template>
  <div class="contact">
    <!-- <img src="../assets/img.png"> -->
    <ContactInfo info="in" />
  </div>
</template>

<style lang="css" scoped>
.contact {
  background-image: url("../assets/img.png");
  background-size: cover;
  width: 100%;
  height: 800%;
}
</style>

<script>
import ContactInfo from "@/components/Contact.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "Contact",
  components: { ContactInfo, Footer }
};
</script>

<style></style>
