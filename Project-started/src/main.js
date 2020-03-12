import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import * as firebase from "firebase/app";
import Vuesax from "vuesax";
import VueNoty from "vuejs-noty";

Vue.config.productionTip = false;

const configOptions = {
  apiKey: "AIzaSyDnQhgNny7mfLq-i49_RK2JHFvDGmDjz8I",
  authDomain: "vue-project-93965.firebaseapp.com",
  databaseURL: "https://vue-project-93965.firebaseio.com",
  projectId: "vue-project-93965",
  storageBucket: "vue-project-93965.appspot.com",
  messagingSenderId: "630574009533",
  appId: "1:630574009533:web:3e0a22134673233be53bd4"
};
firebase.initializeApp(configOptions);
new Vue({
  router,
  store,
  vuetify,
  Vuesax,
  VueNoty,
  render: h => h(App)
}).$mount("#app");
