<template>
  <div class="app">
    <ContactInfo></ContactInfo>
    <!-- <EventCar></EventCar> -->
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
import ContactInfo from "@/components/Contact.vue";
import EventCar from "@/components/EventCar.vue";

export default {
  name: "Home",
  components: {
    ContactInfo,
    EventCar
  }
};
</script>
