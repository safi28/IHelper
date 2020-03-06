<template>
  <div class="about">
    <h1>This is an about page</h1>
    <Media />
  </div>
</template>
<script>
import Media from "@/components/Cards.vue"
export default {
  name: "about",
  components: {Media}
}
</script>