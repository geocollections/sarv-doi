<template>
  <v-container class="doi-detail-view" v-if="doi && doi.doi">
    <v-banner
      ref="doiBanner"
      icon-color="#1db954"
      elevation="3"
      class="text-center"
      icon="fas fa-book-open"
    >
      <div class="larger">
        <span>{{ doi.doi[0].identifier }}: </span>
        <span class="font-weight-bold">{{ doi.doi[0].title }}</span>
      </div>

      <template v-slot:actions>
        <v-btn text color="#1db954" icon title="Share">
          <v-icon>fas fa-share-alt</v-icon>
        </v-btn>
        <v-btn text color="#1db954" icon title="Copy link">
          <v-icon>far fa-copy</v-icon>
        </v-btn>
        <v-btn text color="#1db954" icon title="Print">
          <v-icon>fas fa-print</v-icon>
        </v-btn>
      </template>
    </v-banner>

    <v-row>
      <v-col cols="12" md="6">
        <v-row no-gutters>
          <!-- GENERAL INFO -->
          <v-col cols="12">
            <v-card class="general-info-card">
              <v-card-title>General info</v-card-title>
              <v-data-table
                :mobile-breakpoint="9000"
                disable-sort
                disable-filtering
                disable-pagination
                hide-default-header
                hide-default-footer
                :headers="generalDataHeaders"
                :items="doi.doi"
              >
                <template v-slot:item.datacite_created="{ item }">
                  <span v-if="item.datacite_created">{{
                    new Date(item.datacite_created).toDateString()
                  }}</span>
                  <span v-else>{{ item.datacite_created }}</span>
                </template>
              </v-data-table>
            </v-card>
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="12" md="6">
        <v-row no-gutters>
          <!-- FILES -->
          <v-col cols="12" class="pb-3" v-if="doi.doiAttachments.length > 0">
            <v-card>
              <v-card-title>Files</v-card-title>
              <v-data-table
                disable-sort
                :headers="attachmentHeaders"
                :items="doi.doiAttachments"
              ></v-data-table>
            </v-card>
          </v-col>

          <!-- RELATED PERSONS AND INSTITUTIONS -->
          <v-col cols="12" class="py-3" v-if="doi.doiAgents.length > 0">
            <v-card>
              <v-card-title>Related persons and institutions</v-card-title>
              <v-data-table
                disable-sort
                :headers="agentHeaders"
                :items="doi.doiAgents"
              ></v-data-table>
            </v-card>
          </v-col>

          <!-- RELATED IDENTIFIERS -->
          <v-col cols="12" class="py-3" v-if="doi.doiRelatedIdentifiers.length > 0">
            <v-card>
              <v-card-title>Related identifiers</v-card-title>
              <v-data-table
                disable-sort
                :headers="relatedIdentifiersHeaders"
                :items="doi.doiRelatedIdentifiers"
              ></v-data-table>
            </v-card>
          </v-col>

          <!-- RELATED GEOLOCATIONS -->
          <v-col cols="12" class="py-3" v-if="doi.doiGeolocations.length > 0">
            <v-card>
              <v-card-title>Related geolocations</v-card-title>
              <v-data-table
                disable-sort
                :headers="geolocationsHeaders"
                :items="doi.doiGeolocations"
              ></v-data-table>
            </v-card>
          </v-col>

          <!-- MAP -->
          <!-- Todo: correct v-if and map component -->
          <v-col cols="12" class="py-3" v-if="doi.doiGeolocations.length > 0">
            <v-card>
              <v-card-title>Map</v-card-title>
              Todo: Leaflet
            </v-card>
          </v-col>

          <!-- LINKED DATES -->
          <v-col cols="12" class="pt-3" v-if="doi.doiDates.length > 0">
            <v-card>
              <v-card-title>Linked dates</v-card-title>
              <v-data-table
                  disable-sort
                  :headers="datesHeaders"
                  :items="doi.doiDates"
              ></v-data-table>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>

  <v-container v-else class="doi-detail-error" fluid>
    <v-card :loading="doi.loadingState">
      <span v-if="!doi.loadingState">
        Todo: NO DOI
      </span>
    </v-card>
  </v-container>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Doi",
  data: () => ({
    generalDataHeaders: [
      { text: "Citation", value: "identifier" },
      { text: "DOI", value: "identifier" },
      { text: "Resource type", value: "resource_type__value" },
      { text: "Resource topic", value: "resource_type" },
      { text: "Author(s)", value: "creators" },
      { text: "Title", value: "title" },
      { text: "Publisher", value: "publisher" },
      { text: "Year", value: "publication_year" },
      { text: "Key words", value: "subjects" },
      { text: "Language", value: "language__value_en" },
      { text: "Abstract", value: "abstract" },
      { text: "Methods", value: "methods" },
      { text: "Version", value: "version" },
      { text: "Formats", value: "formats" },
      { text: "Size", value: "sizes" },
      { text: "Copyright", value: "copyright_agent__institution_name_en" },
      { text: "Licence", value: "licence__licence_en" },
      { text: "Dataset", value: "dataset__name_en" },
      { text: "Related reference", value: "reference__reference" },
      { text: "SARV created", value: "date_added" },
      { text: "SARV updated", value: "date_changed" },
      { text: "DataCite created", value: "datacite_created" },
      { text: "DataCite updated", value: "datacite_updated" }
    ],
    attachmentHeaders: [
      { text: "Type", value: "attachment__type__value_en" },
      { text: "Description", value: "attachment__description_en" },
      { text: "Formats", value: "attachment__attachment_format__value" },
      { text: "Preview" }
    ],
    agentHeaders: [
      { text: "Name", value: "name" },
      { text: "Affiliation", value: "affiliation" },
      { text: "Relation", value: "agent_type__value" },
      { text: "ORCID", value: "orcid" }
    ],
    datesHeaders: [
      { text: "Date/range", value: "date" },
      { text: "Date type", value: "date_type__value" },
      { text: "Remarks", value: "remarks" }
    ],
    geolocationsHeaders: [
      { text: "Named place", value: "place" },
      { text: "Point (Lat Long)", value: "point" },
      { text: "Polygon", value: "polygon" },
      { text: "Locality from database", value: "locality__locality_en" }
    ],
    relatedIdentifiersHeaders: [
      { text: "Relation", value: "relation_type__value" },
      { text: "Identifier", value: "identifier_type__value" },
      { text: "Value", value: "value" },
      { text: "Remarks", value: "remarks" },
      { text: "Link" }
    ]
  }),
  mounted() {
    console.log(this.doi);
    if (this.$refs.doiBanner) {
      this.$vuetify.goTo(this.$refs.doiBanner, {
        duration: 300,
        easing: "easeInCubic",
        offset: 35
      });
    }
  },
  computed: {
    ...mapState(["doi"])
  },
  watch: {
    "$route.params.id": {
      handler: function(newVal) {
        this.$store.dispatch("getDoiDetail", { id: newVal });
      },
      immediate: true
    }
  }
};
</script>

<style scoped>
.larger {
  font-size: larger;
}

.general-info-card >>> .v-data-table__mobile-row__header {
  min-width: 100px;
  align-self: start;
}

.general-info-card >>> .v-data-table td {
  height: unset;
  min-height: 48px;
}
</style>
