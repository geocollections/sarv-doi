import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/doi",
      name: "dois",
      component: () => import("./views/Dois.vue")
    },
    {
      path: "/doi/:id",
      name: "doi",
      component: () => import("./components/doi/Doi.vue")
    }
  ]
});
