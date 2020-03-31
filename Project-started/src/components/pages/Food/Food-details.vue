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
          <div class="movie-img"></div>
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
                    <h3>
                      <i class="material-icons"></i>Details
                    </h3>
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
import AppHeader from "@/components/core/Header.vue";
import Noty from "noty";
import * as firebase from "firebase/app";
import mainMenu from "@/components/core/Menu/Main.vue";
import EventBus from "../../../eventBus";
import {
  mdiAccount,
  mdiFileEdit,
  mdiPencil,
  mdiShareVariant,
  mdiDelete,
  mdiFolderPlusOutline
} from "@mdi/js";
import DataService from "../../../services/DataService";
export default {
  name: "foods",
  vuetify: new Vuetify(),
  components: {
    AppHeader,
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
        .doc()
        .get(this.food)
        .onSnapshot(snap => {
          snap.forEach(doc => {
            var food = doc.data();
            food.id = doc.id;
            this.id = doc.id;
            this.currentIndex = doc.id;
            this.foods.push(food);
          });
        });
    },

    setActive(food, i) {
      this.currentIndex = i;
      this.currentFood = food;
    },

    updateData(playload) {
      this.food = playload;
    }
  },

  mounted() {
      EventBus.$on('DATA_PUBLISHED',(playload) => {
          this.updateData(playload)
      })
  },
  
};
</script>

<style scoped>
@import url("./style.css");
</style>