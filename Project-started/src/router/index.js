import Vue from "vue";
import VueRouter from "vue-router";
import login from "@/components/auth/Auth.vue";
const Signup = () => import('@/components/auth/Sign-Up')
const Signin = () => import('@/components/auth/Sign-In')
import privateHome from "@/components/core/Home/Home-private.vue";
import Foods from "@/components/pages/Food/Foods.vue";
import Meistask from "@/components/pages/MTask/Task.vue";
import profile from "@/components/pages/Profile/Profile.vue";
import publicHome from "@/components/core/Home/Home-public.vue";
import Error from "@/components/core/Error/Error.vue";
import create from "@/components/core/Create/Create.vue";
import Health from "@/components/pages/Health/Health-form.vue";
import AuthGuard from "./auth-guard";


Vue.use(VueRouter);
function authGuard(to, from, next) {
  if (to.fullPath === "/dashboard")
    if (localStorage.getItem("token") !== null) {
      next("/dashboard");
    } else {
      next("/");
    }
  next();
}
const routes = [
  {
    path: "/",
    name: "publicHome",
    component: publicHome,
  },
  {
    path: "/dashboard",
    name: "privateHome",
    component: privateHome
  },
  {
    path: "/profile",
    name: "profile",
    component: profile,
    // beforeEnter: AuthGuard
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/signin',
    name: 'Signin',
    component: Signin
  },
  {
    path: "/health",
    name: "Health",
    component: Health,
    // beforeEnter: AuthGuard

  },
  {
    path: "/create",
    name: "Create",
    component: create,
    // beforeEnter: AuthGuard

  },
  {
    path: "/foods",
    name: "Food",
    component: Foods,
    //  beforeEnter: AuthGuard

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
  mode: "history",
  routes
});
export default router;
