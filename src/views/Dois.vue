<template>
  <v-container class="dois" :class="{ 'drawer-padding': global.drawerRight }">
    <list-module-core
      module="doi"
      :headers="headers"
      :items="doi.dois"
      :item-count="doi.doiCount"
      :loading-state="doi.loadingState"
      :search-parameters="searchParameters"
      v-on:search-parameters-changed="onSearchParametersChange"
    />
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import ListModuleCore from "../components/partial/ListModuleCore";

export default {
  name: "Dois",
  components: {
    ListModuleCore
  },
  data: () => ({
    headers: [
      { text: "DOI", value: "identifier", class: "no-wrap" },
      { text: "Author", value: "creators", class: "no-wrap" },
      { text: "Year", value: "publication_year", class: "no-wrap" },
      { text: "Title", value: "title", class: "no-wrap" },
      { text: "Type", value: "resource", class: "no-wrap" },
      {
        text: "DataCite registration",
        value: "datacite_created",
        class: "no-wrap"
      }
    ],
    searchParameters: {
      page: 1,
      paginateBy: 50,
      orderBy: "-id"
    }
  }),
  computed: {
    ...mapState(["doi", "global"])
  },
  watch: {
    "$route.query": {
      handler: function(newVal) {
        this.$store.dispatch("getDois", {
          routeParams: newVal,
          searchParams: this.searchParameters
        });
      },
      immediate: true
    }
  },
  methods: {
    onSearchParametersChange(newParams) {
      this.$store.dispatch("getDois", {
        routeParams: this.$route.query,
        searchParams: newParams
      });
    },

    setDefaultSearchParameters() {
      return {
        page: 1,
        paginateBy: 50,
        orderBy: "-id"
      };
    }
  }
};
</script>

<style scoped>
.drawer-padding {
  padding-right: 92px;
}
</style>
