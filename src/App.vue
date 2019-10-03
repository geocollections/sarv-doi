<template>
  <v-app id="doi-public">
    <app-header />

    <router-view />

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
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Nunito:200,300,400,600,700,800,900&display=swap");

#doi-public {
  font-family: "Nunito", sans-serif !important;
}

/* Overlay must hide everything except app header which has z-index of 1100 */
.v-overlay--active {
  z-index: 1075 !important;
}
</style>
