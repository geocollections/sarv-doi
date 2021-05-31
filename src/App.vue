<template>
  <v-app id="doi-public">
    <app-header />

    <router-view style="margin-bottom: 140px" />

    <app-footer />
  </v-app>
</template>

<script>
import AppHeader from "./components/partial/AppHeader";
import AppFooter from "./components/partial/AppFooter";

export default {
  name: "App",
  components: {
    AppHeader,
    AppFooter
  },
  metaInfo: {
    title: "Geoscience Data Repository",
    titleTemplate: "%s | SARV·DOI"
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Nunito:200,300,400,600,700,800,900&display=swap");

html {
  overflow-y: auto !important;
}

.v-application {
  font-family: "Nunito", sans-serif !important;
  -webkit-font-smoothing: antialiased;
}

/* Overlay must hide everything except app header which has z-index of 1100 */
.v-overlay--active {
  z-index: 1075 !important;
}

/* Custom override for md and lower screens */
@media (max-width: 1264px) {
  .container {
    max-width: 100%;
  }
}

/* Custom override for xl screens */
@media (min-width: 1904px) {
  .container {
    max-width: 1264px !important;
  }
}
</style>
