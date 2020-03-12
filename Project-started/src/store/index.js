import Vue from "vue";
import Vuex from "vuex";
import VueMaterial from "vue-material";
import "vue-material/dist/vue-material.min.css";
import Vuetify from "vuetify";
import Vuesax from "vuesax";
import VueNoty from "vuejs-noty";

Vue.use(VueMaterial);
Vue.use(Vuetify);
Vue.use(Vuesax);
Vue.use(VueNoty, {
  timeout: 1000,
  progressBar: true,
  layout: "topRight"
});

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      loggedIn: false,
      data: null
    }
  },
  mutations: {
    SET_LOGGED_IN(state, value) {
      state.user.loggedIn = value;
    },
    SET_USER(state, data) {
      state.user.data = data;
    }
  },
  actions: {
    fetchUser({ commit }, user) {
      commit("SET_LOGGED_IN", user !== null);
      if (user) {
        commit("SET_USER", {
          displayName: user.displayName,
          email: user.email
        });
      } else {
        commit("SET_USER", null);
      }
    }
  },
  modules: {},
  getters: {
    user(state) {
      return state.user;
    }
  }
});
