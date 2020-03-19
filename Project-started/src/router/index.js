import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import login from "@/components/auth/Auth.vue";
import LoggedHome from "@/components/pages/LoggedPage.vue";
import Calories from "@/components/pages/Food/Calories.vue";
import youTable from "@/components/pages/Food/dailyCounter.vue";
import calendar from "@/components/pages/Calendar/Calendar.vue";
import Meistask from "@/components/MTask/Task.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/home",
    name: "Home",
    component: Home
  },
  {
    path: "/login",
    name: "login",
    component: login
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../views/About.vue")
  },
  {
    path: "/contact",
    name: "ContactInfo",
    component: () => import("../views/Contact.vue")
  },
  {
    path: "/dashboard",
    name: "LoggedHome",
    component: LoggedHome
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
  },
];

const router = new VueRouter({
  routes
});

export default router;
