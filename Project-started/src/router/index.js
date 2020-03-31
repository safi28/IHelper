import Vue from "vue";
import VueRouter from "vue-router";
import login from "@/components/auth/Auth.vue";
import privateHome from "@/components/core/Home/Home-private.vue";
import Foods from "@/components/pages/Food/Foods.vue";
import Meistask from "@/components/pages/MTask/Task.vue";
import profile from "@/components/pages/Profile/Profile.vue";
import publicHome from "@/components/core/Home/Home-public.vue";
import Error from "@/components/core/Error/Error.vue";
import create from "@/components/core/Create/Create.vue";

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
    path: "/create",
    name: "create",
    component: create
  },
  {
    path: "/foods",
    name: "Food",
    component: Foods
  },
  {
    path: "/foods/edit/:id",
    component: () => import("../components/pages/Food/Food-details.vue")
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
  mode: 'history',
  routes
});
// router.beforeEach((to, from, next) => {
//   store.dispatch("fetchAccessToken");

//   if (to.fullPath === "/dashboard") {
//     if (!store.state.accessToken) {
//       next("/login");
//     }
//   }
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
