<template>
  <div class="contact">
    <ContactInfo></ContactInfo>
    <!-- <EventCar></EventCar> -->
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
import Footer from "@/components/Footer.vue";
import  EventCar  from "@/components/EventCar.vue";
export default {
  name: "Contact",
  components: { ContactInfo, Footer, EventCar }
};
</script>

<style></style>
