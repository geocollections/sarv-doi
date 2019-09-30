import Vue from "vue";
import Vuex from "vuex";
import doi from "./modules/doi/doi";
import global from "./modules/global/global";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    global,
    doi
  },
  strict: process.env.NODE_ENV !== "production"
});
