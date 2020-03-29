import Vue from "vue";
import VueRouter from "vue-router";
import login from "@/components/auth/Auth.vue";
import privateHome from "@/components/core/Home/Home-private.vue";
import Calories from "@/components/pages/Food/Calories.vue";
import youTable from "@/components/pages/Food/dailyCounter.vue";
import Meistask from "@/components/pages/MTask/Task.vue";
import profile from "@/components/pages/Profile/Profile.vue";
import publicHome from "@/components/core/Home/Home-public.vue";
import Error from "@/components/core/Error/Error.vue";
import store from "../store";
import portfolio from "@/components/pages/Calendar/Calendar.vue"

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "publicHome",
    component: publicHome
  },
  {
    path: "/login",
    name: "login",
    component: login
  },
  {
    path: "/profile",
    name: "profile",
    component: profile
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../components/core/About.vue")
  },
  {
    path: "/dashboard",
    name: "privateHome",
    component: privateHome
  },
  {
    path: "/calories",
    name: "Calories",
    component: Calories
  },
  {
    path: "/youTable",
    name: "youTable",
    component: youTable
  },
  {
    path: "/portfolio",
    name: "portfolio",
    component: portfolio
  },
  {
    path: "/meistask",
    name: "Meistask",
    component: Meistask
  },
  {
    path: "**",
    name: "Error",
    component: Error
  }
];

const router = new VueRouter({
  routes
});
// router.beforeEach((to, from, next) => {
//   store.dispatch("fetchAccessToken");

 
//   if (to.fullPath === "/") {
//     if (store.state.accessToken) {
//       next("/profile");
//     }
//   }
//   if (to.fullPath === "/login") {
//     if (store.state.accessToken) {
//       next("/profile");
//     }
//   }
//   next();
// });
export default router;
