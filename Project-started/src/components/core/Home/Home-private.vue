<template>
  <div class="k">
    <headerLoad></headerLoad>
    <section class="hero">
      <div class="overlay">
        <div class="content">
          <h1>
            Health
            <br />care.
          </h1>
          <p>We are creating healthy diets for you based on your manners!!</p>
          <button @click="logout()">Logout</button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import headerLoad from "@/components/core/Header.vue";
export default {
  name: "dashboard",
  components: { headerLoad },
  methods: {
    logout() {
      this.$store.dispatch("logout").then(el => {
        console.log(el);
        localStorage.removeItem("token");
        this.$router.replace({ name: "publicHome" });
      });
    }
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Poppins:200,400,800,900&display=swap");
body {
  margin: 0;
  padding: 0;
  background: #333;
  justify-content: center;
}

.hero {
  background: #133a53
    url("https://images.pexels.com/photos/461428/pexels-photo-461428.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940");
  /* background: url(""); */
  position: relative;
  display: flex;
  align-items: center;
  justify-content: left;
  font-family: "Poppins", sans-serif;
  height: 100vh;
  width: 100vw;
}
.hero .overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
}
.hero .overlay .content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  width: 70vw;

  margin: auto;
  transform-origin: left;
  animation: reveal 1s ease-in-out forwards;
}
.hero .overlay .content h1 {
  font-size: 90px;
  line-height: 0.9;
  margin-bottom: 10px;
  color: white;
  left: 209%;
  right: 20%;
}
.hero .overlay .content p {
  font-size: 24px;
  color: white;
  right: 29px;
}
.hero .overlay:before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #ff6700;
  z-index: 3;
  animation: reveal 0.5s reverse forwards;
  animation-delay: 0.5s;
  transform-origin: left;
}
.hero .overlay:after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #133a53;
  z-index: 2;
  animation: reveal 0.7s reverse forwards;
  animation-delay: 0.7s;
  transform-origin: left;
}

@keyframes reveal {
  0% {
    transform: scaleX(0);
  }
  100% {
    transform: scaleX(1);
  }
}
</style>