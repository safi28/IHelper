<template>
  <div class="app">
    <span class="main">
      <ContactInfo></ContactInfo>
    </span>
    <!-- <span class="banner">
      <EventCar></EventCar>
    </span> -->
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
import  EventCar  from "@/components/EventCar.vue";

export default {
  name: "Home",
  components: {
    ContactInfo,
    EventCar
  }
};
</script>
