import Vue from "vue";
import Vuetify from "vuetify/lib";

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: "fa"
  },
  theme: {
    themes: {
      light: {
        primary: "#0097A7",
        anchor: "#d24444",
        customRed: "#d24444"
      },
      dark: {
        primary: "#0097A7",
        anchor: "#d24444",
        customRed: "#d24444"
      }
    }
  }
});
