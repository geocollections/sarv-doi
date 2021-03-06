<template>
  <div class="list-module-core">
    <!-- PAGINATION -->
    <div
      v-if="itemCount > 0"
      class="pagination d-flex flex-column flex-md-row justify-space-between align-center mt-1 mt-md-0 mb-2"
    >
      <div>
        <v-select
          v-model="searchParameters.paginateBy"
          color="cyan darken-2"
          dense
          :items="paginateByOptions"
          item-color="green"
          label="Paginate by"
          hide-details
        />
      </div>

      <!-- EXPORT -->
      <div class="my-2 my-md-0 flex-md-grow-1 mx-3">
        <export-buttons :table-data="items" />
      </div>

      <div>
        <v-pagination
          v-model="searchParameters.page"
          circle
          color="cyan darken-2"
          prev-icon="fas fa-angle-left"
          next-icon="fas fa-angle-right"
          :length="Math.ceil(itemCount / searchParameters.paginateBy)"
          :total-visible="5"
        />
      </div>
    </div>

    <!-- DATA TABLE -->
    <v-card class="table-card py-1">
      <v-card-title>
        <v-icon class="mr-2" color="cyan darken-2" large>fas fa-list</v-icon>
        <v-badge color="cyan darken-2">
          <span id="table-title" class="text-uppercase">{{ module }}</span>
          <template v-slot:badge>
            <span class="font-weight-bold">{{ itemCount }}</span>
          </template>
        </v-badge>
        <div class="flex-grow-1"></div>
        <v-text-field
          v-model="searchTable"
          append-outer-icon="fas fa-search"
          label="Filter records"
          clear-icon="fas fa-times"
          clearable
          color="cyan darken-2"
          autocomplete="off"
        />
      </v-card-title>

      <v-data-table
        class="list-module-core-table"
        :headers="headers"
        hide-default-footer
        :items="items"
        :items-per-page.sync="searchParameters.paginateBy"
        multi-sort
        :page.sync="searchParameters.page"
        :search="searchTable"
        :loading="loadingState"
        show-expand
        :expanded.sync="expanded"
        expand-icon="fas fa-caret-down"
        @click:row="tableRowClick"
      >
        <template v-slot:progress>
          <v-progress-linear indeterminate color="cyan darken-2" />
        </template>

        <template v-slot:item.data-table-expand="{ expand, isExpanded, item }">
          <div
            v-if="
              typeof item.abstract !== 'undefined' &&
                item.abstract !== null &&
                item.abstract.length > 0
            "
            class="expanded-link py-2 px-3 text-center"
            @click.stop="expand(!isExpanded)"
            title="View summary"
          >
            <v-icon v-if="isExpanded" color="customRed "
              >fas fa-caret-up</v-icon
            >
            <v-icon v-else color="customRed ">fas fa-caret-down</v-icon>
          </div>
        </template>

        <template v-if="module === 'doi'" v-slot:item.identifier="{ item }">
          <div class="font-weight-bold">{{ item.identifier }}</div>
        </template>

        <template v-slot:item.resource="{ item }">
          <div v-if="item.resource_type__value && item.resource">
            {{ `${item.resource_type__value} / ${item.resource}` }}
          </div>
          <div v-else>
            {{ item.resource }}
          </div>
        </template>

        <template
          v-if="module === 'doi'"
          v-slot:item.datacite_created="{ item }"
        >
          <span v-if="item.datacite_created">{{
            item.datacite_created | moment("YYYY-MM-DD")
          }}</span>
          <span v-else>{{ item.datacite_created }}</span>
        </template>

        <template v-slot:expanded-item="{ headers, item }">
          <td :colspan="headers.length" class="pa-0">
            <v-card width="100%" v-if="item.abstract" tile class="summary">
              <v-card-title>Summary</v-card-title>
              <v-card-text>{{ item.abstract }}</v-card-text>
            </v-card>
          </td>
        </template>
      </v-data-table>
    </v-card>

    <!-- PAGINATION -->
    <div
      v-if="itemCount > 10"
      class="pagination d-flex flex-column flex-md-row justify-space-between align-center mt-4 mt-md-2"
    >
      <div>
        <v-select
          v-model="searchParameters.paginateBy"
          color="cyan darken-2"
          dense
          :items="paginateByOptions"
          item-color="green"
          label="Paginate by"
          hide-details
        />
      </div>

      <!-- EXPORT -->
      <div class="my-2 my-md-0 flex-md-grow-1 mx-3">
        <export-buttons :table-data="items" />
      </div>

      <div>
        <v-pagination
          v-model="searchParameters.page"
          circle
          color="cyan darken-2"
          prev-icon="fas fa-angle-left"
          next-icon="fas fa-angle-right"
          :length="Math.ceil(itemCount / searchParameters.paginateBy)"
          :total-visible="5"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ExportButtons from "./ExportButtons";
export default {
  name: "ListModuleCore",
  components: { ExportButtons },
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
  watch: {
    searchParameters: {
      handler: function(newVal) {
        this.$emit("search-parameters-changed", newVal);
      },
      deep: true
    }
  },
  methods: {
    tableRowClick(rowData) {
      if (
        typeof rowData !== "undefined" &&
        rowData !== null &&
        rowData.id !== null
      ) {
        this.$router.push({ path: rowData.identifier });
      }
    }
  }
};
</script>

<style scoped>
#table-title {
  font-size: 2.5rem;
}

.table-card >>> .v-input--is-focused .fa-times {
  color: #000000 !important;
  caret-color: #000000 !important;
}

.table-card >>> .no-wrap {
  white-space: nowrap;
}

.table-card >>> .no-wrap > span:after {
  content: "\00a0";
}

.summary {
  -webkit-box-shadow: inset 0px 4px 8px -5px rgba(50, 50, 50, 0.75),
    inset 0px -4px 8px -5px rgba(50, 50, 50, 0.75);
  box-shadow: inset 0px 4px 8px -5px rgba(50, 50, 50, 0.75),
    inset 0px -4px 8px -5px rgba(50, 50, 50, 0.75);
}

.list-module-core-table >>> tbody tr:hover {
  cursor: pointer;
  background-color: #e0f7fa !important;
}

.list-module-core-table >>> tbody > .v-data-table__expanded__content:hover {
  cursor: unset;
}

.list-module-core-table >>> tbody > tr > td:first-child {
  padding: 0;
}

.expanded-link:hover {
  opacity: 0.5;
}

.list-module-core >>> .v-data-table td,
.list-module-core >>> .v-data-table th {
  padding: 0 8px;
}
</style>
