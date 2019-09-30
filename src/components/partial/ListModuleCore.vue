<template>
  <div class="list-module-core">
    <!-- PAGINATION -->
    <div
      v-if="items && items.length > 0"
      class="pagination d-flex flex-column flex-md-row justify-space-between align-center"
    >
      <div>
        <v-select
          v-model="searchParameters.paginateBy"
          color="#1db954"
          dense
          :items="paginateByOptions"
          item-color="green"
          label="Paginate by"
        />
      </div>

      <!-- EXPORT -->
      <div></div>

      <div>
        <v-pagination
          v-model="searchParameters.page"
          color="#1db954"
          prev-icon="fas fa-caret-left"
          next-icon="fas fa-caret-right"
          :length="Math.ceil(itemCount / searchParameters.paginateBy)"
          :total-visible="5"
        />
      </div>
    </div>

    <!-- DATA TABLE -->
    <v-card class="table-card my-1">
      <v-card-title>
        <span id="table-title" class="text-uppercase">{{ module }}</span>
        <div class="flex-grow-1"></div>
        <v-text-field
          v-model="searchTable"
          append-outer-icon="fas fa-search"
          label="Search"
          clear-icon="fas fa-times"
          clearable
          color="#1db954"
        ></v-text-field>
      </v-card-title>

      <v-data-table
        class="elevation-1"
        :headers="headers"
        hide-default-footer
        :items="items"
        :items-per-page="searchParameters.paginateBy"
        :loading="loadingState"
        multi-sort
        :page="searchParameters.page"
        :search="searchTable"
        show-expand
        :expanded.sync="expanded"
        expand-icon="fas fa-caret-down"
      >
        <template v-if="module === 'doi'" v-slot:item.identifier="{ item }">
          <v-btn :to="{ path: '/doi/' + item.id }" color="#1db954" text>{{
            item.identifier
            }}</v-btn>
        </template>

        <template v-slot:expanded-item="{ headers, item }">
          <td :colspan="headers.length">
            <div v-for="(entity, index) in item" :key="index">
              {{ entity }}
            </div>
          </td>
        </template>
      </v-data-table>
    </v-card>

    <!-- PAGINATION -->
    <div
      v-if="items && items.length > 0"
      class="pagination d-flex flex-column flex-md-row justify-space-between align-center"
    >
      <div>
        <v-select
          v-model="searchParameters.paginateBy"
          color="#1db954"
          dense
          :items="paginateByOptions"
          item-color="green"
          label="Paginate by"
        />
      </div>

      <!-- EXPORT -->
      <div></div>

      <div>
        <v-pagination
          v-model="searchParameters.page"
          color="#1db954"
          prev-icon="fas fa-caret-left"
          next-icon="fas fa-caret-right"
          :length="Math.ceil(itemCount / searchParameters.paginateBy)"
          :total-visible="5"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ListModuleCore",
  props: {
    module: {
      type: String,
      required: true
    },
    headers: {
      type: Array,
      required: true
    },
    items: {
      type: Array,
      required: true
    },
    itemCount: {
      type: Number,
      required: true
    },
    loadingState: {
      type: Boolean,
      required: true
    },
    searchParameters: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    searchTable: "",
    expanded: [],
    paginateByOptions: [
      { text: "Show 10 results per page", value: 10 },
      { text: "Show 25 results per page", value: 25 },
      { text: "Show 50 results per page", value: 50 },
      { text: "Show 100 results per page", value: 100 },
      { text: "Show 250 results per page", value: 250 },
      { text: "Show 500 results per page", value: 500 },
      { text: "Show 1000 results per page", value: 1000 }
    ]
  }),
  mounted() {
    this.$vuetify.goTo("#table-title", {
      duration: 300,
      easing: "easeInCubic",
      offset: 115
    });
  },
  watch: {
    searchParameters: {
      handler: function(newVal) {
        this.$store.dispatch("getDois", newVal);
      },
      deep: true
    }
  }
};
</script>

<style scoped>
#table-title {
  font-size: 2.5rem;
}

.table-card >>> .v-input--is-focused .fa-times {
  color: #191414 !important;
  caret-color: #191414 !important;
}
</style>
