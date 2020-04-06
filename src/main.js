import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import store from "./store";
import "@fortawesome/fontawesome-free/css/all.css";

Vue.config.productionTip = false;

Vue.use(require("vue-moment"));

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount("#app");
