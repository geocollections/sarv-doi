import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./registerServiceWorker";
import vuetify from "./plugins/vuetify";
import animated from "animate.css";
import store from "./store";

Vue.config.productionTip = false;

Vue.use(animated);

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount("#app");
