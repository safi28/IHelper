<template>
<div>
  <div class="home">
    <img alt="Vue logo" src="../assets/img.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
  <div class="event">
    <EventCar welcomee="Welcome from Saphie" />
  </div>
  <div class="contact">
    <ContactInfo info="Contacts" />
  </div>
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
import EventCar from "@/components/EventCar.vue";
import ContactInfo from "@/components/Contact.vue"

export default {
  name: "Home",
  components: {
    HelloWorld,
    EventCar,
    ContactInfo
  }
};
</script>
