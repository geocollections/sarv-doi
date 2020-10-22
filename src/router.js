import Vue from "vue";
import Router from "vue-router";
import Dois from "./views/Dois";
import About from "./views/About";
import DoiHowTo from "./views/DoiHowTo";

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
    },
    {
      path: "/10.23679/:id(\\d+)",
      name: "doi",
      component: () => import("./components/doi/Doi.vue")
    },
    {
      path: "/about",
      name: "about",
      component: About
    },
    {
      path: "/how_to",
      name: "DOI howto",
      component: DoiHowTo
    }
  ]
});
