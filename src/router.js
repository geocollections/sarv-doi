import Vue from "vue";
import Router from "vue-router";
import Dois from "./views/Dois";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "*",
      redirect: "/"
    },
    {
      path: "/",
      name: "dois",
      component: Dois
    },
    {
      path: "/10.15152/GEO.:id(\\d+)",
      name: "doi",
      component: () => import("./components/doi/Doi.vue")
    }
  ]
});
