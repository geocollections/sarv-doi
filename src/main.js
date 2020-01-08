import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import animated from "animate.css";
import store from "./store";
import "leaflet/dist/leaflet.css";

Vue.config.productionTip = false;

Vue.use(animated);
Vue.use(require("vue-moment"));

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount("#app");
