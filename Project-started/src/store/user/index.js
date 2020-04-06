import * as firebase from "firebase";
import authAxios from "@/services/axios-auth";

export default {
  state: {
    user: null
  },
  mutations: {
    setUser(state, playload) {
      state.user = playload;
    }
  },
  actions: {
    signUserUp({ commit }, playload) {
      commit("setLoading", true);
      commit("clearError");

      const data = {
        email: playload.email,
        password: playload.password,
        returnSecureToken: true
      };
      authAxios
        .post("/accounts:signUp", data)
        .then(res => {
          commit("setLoading", false);
          const newUser = {
            id: res.uid,
            name: res.displayName,
            email: res.email,
            photoUrl: res.photoURL
          };
          commit("setUser", newUser);
          const { idToken, localId } = res.data;

          localStorage.setItem("token", idToken);
          localStorage.setItem("userId", localId);
        })
        .catch(err => {
          commit("setLoading", false);
          commit("setError", err);
        });
    },
    signUserIn({ commit }, playload) {
      commit("setLoading", true);
      commit("clearError");

      const data = {
        email: playload.email,
        password: playload.password,
        returnSecureToken: true
      };
      authAxios
        .post("/accounts:signInWithPassword", data)
        .then(res => {
          commit("setLoading", false);

          const newUser = {
            id: res.uid,
            name: res.displayName,
            email: res.email,
            photoUrl: res.photoURL
          };
          commit("setUser", newUser);
          const { idToken, localId } = res.data;

          localStorage.setItem("token", idToken);
          localStorage.setItem("userId", localId);
          console.log(newUser);
        })
        .catch(err => {
          commit("setLoading", false);
          commit("setError", err);
        });
    },

    autoSignIn({ commit }, playload) {
      commit("setUser", {
        id: playload.uid,
        name: playload.displayName,
        email: playload.email,
        photoUrl: playload.photoURL
      });
    },

    logout({ commit }) {
      firebase.auth().signOut();
      commit("setUser", null);
    }
  },
  getters: {
    user(state) {
      return state.user;
    }
  }
};
