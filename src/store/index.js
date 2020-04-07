import Vue from "vue";
import Vuex from "vuex";
import doi from "./modules/doi/doi";
import global from "./modules/global/global";
import settings from "./modules/settings/index";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    global,
    doi,
    settings
  },
  strict: process.env.NODE_ENV !== "production"
});
