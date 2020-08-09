import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import auth0Client from "../store/AuthService";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/share-your-thoughts",
    name: "ShareThoughts",
    component: () =>
      import(
        /* webpackChunkName: "shareThoughts" */ "@/components/ShareThoughts.vue"
      ),
    beforeEnter: (to, from, next) => {
      if (auth0Client.isAuthenticated()) {
        return next();
      }
      next("/");
    },
  },
  {
    path: "/callback",
    name: "Callback",
    component: () =>
      import(/* webpackChunkName: "callback" */ "@/components/Callback.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
