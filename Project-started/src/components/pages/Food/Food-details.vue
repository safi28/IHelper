<template>
  <div id="nav">
    <nav class="main-nav">
      <mainMenu></mainMenu>
    </nav>
    <div class="container">
      <div class="cellphone-container">
        <div class="movie">
          <div class="menu">
            <i class="material-icons"></i>
          </div>
          <v-img class="movie-img" :src="food.img"></v-img>
          <div>
            <div class="text-movie-cont">
              <div class="mr-grid">
                <div class="col1">
                  <h1>{{food.name}}</h1>
                </div>
              </div>
              <div class="mr-grid summary-row">
                <div class="col2">
                  <h5>Details</h5>
                </div>
              </div>
              <div class="mr-grid">
                <div class="col1">
                  <p class="movie-description" v-model="food.details">{{food.details}}</p>
                </div>
              </div>
              <div class="mr-grid actors-row">
                <div class="col1">
                  <p class="movie-actors" v-model="food.ingredients">{{food.ingredients}}</p>
                </div>
              </div>
              <div class="mr-grid action-row">
                <div class="col2">
                  <div class="watch-btn">
                    <v-row>
                      <v-col>
                        <button>
                          <h3>
                            <i class="material-icons"></i>Edit
                          </h3>
                        </button>
                      </v-col>
                      <v-divider class="mx-6" inset vertical></v-divider>
                      <v-col>
                        <button @click="deleteData()">
                          <h3>
                            <i class="material-icons"></i>Delete
                          </h3>
                        </button>
                      </v-col>
                    </v-row>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vuetify from "vuetify";
import Noty from "noty";
import * as firebase from "firebase/app";
import mainMenu from "@/components/core/Menu/Main.vue";
import EventBus from "../../../eventBus";
import DataService from "../../../services/DataService";
export default {
  name: "foods",
  vuetify: new Vuetify(),
  components: {
    mainMenu
  },
  data() {
    return {
      foods: [],
      currentIndex: -1,
      currentFood: null,
      food: {
        id: null,
        name: "",
        kg: Number,
        ingredients: "",
        details: ""
      },
      id: null
    };
  },

  methods: {
    retrieveFood() {
      firebase
        .firestore()
        .collection("foods")
        .doc(this.$route.params.id)
        .get()
        .then(el => {
          this.food = el.data();
          console.log(el.data());
        });
    },

    setActive(food, i) {
      this.currentIndex = i;
      this.currentFood = food;
    },

    updateData(playload) {
      this.food = playload;
    },

    deleteData() {
      firebase
        .firestore()
        .collection("foods")
        .doc(this.$route.params.id)
        .delete()
        .then(el => {
          this.$router.replace({ name: "Food" });
        });
    }
  },

  mounted() {
    this.retrieveFood();
    EventBus.$on("DATA_PUBLISHED", playload => {
      this.updateData(playload);
    });
  }
};
</script>

<style scoped>
@import url("./style.css");
</style>