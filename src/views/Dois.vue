<template>
  <v-container
    class="dois"
    :class="{ 'drawer-padding': global.drawerRight }"
    fluid
  >

    <list-module-core
      module="doi"
      :headers="headers"
      :items="doi.dois"
      :item-count="doi.doiCount"
      :loading-state="doi.loadingState"
      :search-parameters="searchParameters"
    />
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import ListModuleCore from "../components/partial/ListModuleCore";
import isEmpty from "lodash/isEmpty";

export default {
  name: "Dois",
  components: {
    ListModuleCore
  },
  data: () => ({
    headers: [
      { text: "DOI", value: "identifier" },
      { text: "Author", value: "creators" },
      { text: "Year", value: "publication_year" },
      { text: "Title", value: "title" },
      { text: "Type", value: "resource" },
      { text: "DataCite registration", value: "datacite_created" }
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
        if (newVal) {
          if (newVal.q) this.$store.dispatch("getDoisFast", newVal.q);
          else if (!isEmpty(newVal)) this.$store.dispatch("getDois", newVal);
          else this.$store.dispatch("getDois", this.searchParameters);
        }
      },
      immediate: true
    }
  },
  methods: {
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
