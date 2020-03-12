import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import login from "@/components/Login.vue";
import Dashboard from "@/components/Dashboard.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
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
    component: () =>
      import(/* webpackChunkName: "contact" */ "../views/Contact.vue")
  },
  { path: "/dashboard", name: "Dashboard", component: Dashboard }
];

const router = new VueRouter({
  routes
});

export default router;
