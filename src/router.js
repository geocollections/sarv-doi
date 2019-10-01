import Vue from "vue";
import Router from "vue-router";
import Dois from "./views/Dois";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "dois",
      component: Dois
    },
    {
      path: "/doi/:id",
      name: "doi",
      component: () => import("./components/doi/Doi.vue")
    }
  ]
});
