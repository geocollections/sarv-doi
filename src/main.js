import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import store from "./store";
import VueIziToast from "vue-izitoast";
import VueMeta from "vue-meta";
import "@fortawesome/fontawesome-free/css/all.css";
import "izitoast/dist/css/iziToast.min.css";

Vue.config.productionTip = false;

Vue.use(require("vue-moment"));
Vue.use(VueIziToast);
Vue.use(VueMeta);

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount("#app");
