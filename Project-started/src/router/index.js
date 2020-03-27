import Vue from "vue";
import VueRouter from "vue-router";
import login from "@/components/auth/Auth.vue";
import privateHome from "@/components/core/Home/Home-private.vue";
import Calories from "@/components/pages/Food/Calories.vue";
import youTable from "@/components/pages/Food/dailyCounter.vue";
import calendar from "@/components/pages/Calendar/Calendar.vue";
import Meistask from "@/components/MTask/Task.vue";
import profile from "@/components/pages/Profile/Profile.vue";
import publicHome from "@/components/core/Home/Home-public.vue";
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
    path: "/calendar",
    name: "calendar",
    component: calendar
  },
  {
    path: "/meistask",
    name: "Meistask",
    component: Meistask
  }
];

const router = new VueRouter({
  routes
});

export default router;
