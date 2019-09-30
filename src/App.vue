<template>
  <v-app id="doi-public">
    <app-header />

    <router-view />
  </v-app>
</template>

<script>
import AppHeader from "./components/partial/AppHeader";

export default {
  name: "App",
  components: {
    AppHeader
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Nunito:200,300,400,600,700,800,900&display=swap");

#doi-public {
  font-family: "Nunito", sans-serif !important;
}
</style>
