<template>
  <v-container class="doi-detail-view" v-if="doi && doi.doi">
    <v-banner
      icon-color="#191414"
      elevation="3"
      class="text-center"
      :sticky="$vuetify.breakpoint.mdAndUp"
      :style="$vuetify.breakpoint.mdAndUp ? 'top: 60px; z-index: 1050' : ''"
      icon="fas fa-book-open"
    >
      <div class="larger">
        <span>{{ doi.doi[0].identifier }}: </span>
        <span class="font-weight-bold">{{ doi.doi[0].title }}</span>
      </div>

      <template v-slot:actions>
        <v-btn color="#1db954" icon title="Share">
          <v-icon>fas fa-share-alt</v-icon>
        </v-btn>
        <v-btn color="#1db954" icon title="Copy link">
          <v-icon>far fa-copy</v-icon>
        </v-btn>
        <v-btn color="#1db954" icon title="Print">
          <v-icon>fas fa-print</v-icon>
        </v-btn>
      </template>
    </v-banner>

    <v-row>
      <v-col cols="12" md="6">
        <v-row no-gutters>
          <!-- GENERAL INFO -->
          <v-col cols="12 pt-3">
            <v-card class="general-info-card elevation-3">
              <v-card-title>
                <span>General info</span>
                <v-spacer />
                <v-icon color="#191414">fas fa-list</v-icon>
              </v-card-title>
              <v-data-table
                :mobile-breakpoint="9000"
                disable-sort
                disable-filtering
                disable-pagination
                hide-default-header
                hide-default-footer
                :headers="computedGeneralDataHeaders"
                :items="doi.doi"
              >
                <template v-slot:item.id="{ item }">
                  <span>{{ getCitation(item) }}</span>
                </template>

                <template v-slot:item.licence__licence_en="{ item }">
                  <v-btn
                    class="pa-0"
                    height="unset"
                    min-width="unset"
                    text
                    color="#1db954"
                    :href="item.licence__licence_url_en"
                    :title="item.licence__licence_url_en"
                    target="LicenceWindow"
                    >{{ item.licence__licence_en }}</v-btn
                  >
                </template>

                <template v-slot:item.dataset="{ item }">
                  <v-btn
                    class="text-none wrap-link pa-0"
                    height="unset"
                    min-width="unset"
                    text
                    color="#1db954"
                    :href="
                      getGeocollectionsUrl({
                        object: 'dataset',
                        id: item.dataset
                      })
                    "
                    :title="
                      getGeocollectionsUrl({
                        object: 'dataset',
                        id: item.dataset
                      })
                    "
                    target="GeocollectionsWindow"
                    >{{ item.dataset__name_en }}</v-btn
                  >
                </template>

                <template v-slot:item.reference="{ item }">
                  <v-btn
                    class="text-none wrap-link pa-0"
                    height="unset"
                    min-width="unset"
                    text
                    color="#1db954"
                    :href="
                      getGeocollectionsUrl({
                        object: 'reference',
                        id: item.reference
                      })
                    "
                    :title="
                      getGeocollectionsUrl({
                        object: 'reference',
                        id: item.reference
                      })
                    "
                    target="GeocollectionsWindow"
                    >{{ item.reference__reference }}</v-btn
                  >
                </template>

                <template v-slot:item.date_added="{ item }">
                  <span v-if="item.date_added">{{
                    new Date(item.date_added).toDateString()
                  }}</span>
                  <span v-else>{{ item.date_added }}</span>
                </template>

                <template v-slot:item.date_changed="{ item }">
                  <span v-if="item.date_changed">{{
                    new Date(item.date_changed).toDateString()
                  }}</span>
                  <span v-else>{{ item.date_changed }}</span>
                </template>

                <template v-slot:item.datacite_created="{ item }">
                  <span v-if="item.datacite_created">{{
                    new Date(item.datacite_created).toDateString()
                  }}</span>
                  <span v-else>{{ item.datacite_created }}</span>
                </template>

                <template v-slot:item.datacite_updated="{ item }">
                  <span v-if="item.datacite_updated">{{
                    new Date(item.datacite_updated).toDateString()
                  }}</span>
                  <span v-else>{{ item.datacite_updated }}</span>
                </template>
              </v-data-table>
            </v-card>
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="12" md="6">
        <v-row no-gutters>
          <v-col cols="12" class="py-3" v-if="isDoiFromEgf">
            <v-card class="mobile-override elevation-3">
              <v-card-title>
                <span>EGF landing page</span>
                <v-spacer />
                <v-icon color="#191414">fas fa-atlas</v-icon>
              </v-card-title>

              <v-card-actions class="justify-center" v-if="doi.doi[0].egf">
                <v-btn
                  text
                  color="#1db954"
                  :href="egfUrl + doi.doi[0].egf"
                  :title="egfUrl + doi.doi[0].egf"
                  target="EgfWindow"
                  >See DOI in EGF portal</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-col>

          <!-- FILES -->
          <v-col
            cols="12"
            class="py-3"
            v-if="!isDoiFromEgf && doi.doiAttachments.length > 0"
          >
            <v-card class="mobile-override elevation-3">
              <v-card-title>
                <span>Files</span>
                <v-spacer />
                <v-icon color="#191414">far fa-folder-open</v-icon>
              </v-card-title>
              <v-data-table
                disable-sort
                :headers="attachmentHeaders"
                :items="doi.doiAttachments"
              >
                <template v-slot:item.id="{ item }">
                  <file-preview :data="item" />
                </template>
              </v-data-table>
            </v-card>
          </v-col>

          <!-- RELATED PERSONS AND INSTITUTIONS -->
          <v-col cols="12" class="py-3" v-if="doi.doiAgents.length > 0">
            <v-card class="mobile-override elevation-3">
              <v-card-title>
                <span>Related persons and institutions</span>
                <v-spacer />
                <v-icon color="#191414">fas fa-users</v-icon>
              </v-card-title>
              <v-data-table
                disable-sort
                :headers="agentHeaders"
                :items="doi.doiAgents"
              >
                <template v-slot:item.name="{ item }">
                  <v-btn
                    v-if="item.orcid"
                    class="text-none wrap-link pa-0"
                    height="unset"
                    min-width="unset"
                    text
                    color="#1db954"
                    :href="getOrcidUrl(item.orcid)"
                    :title="getOrcidUrl(item.orcid)"
                    target="OrcidWindow"
                  >
                    {{ item.name }}
                  </v-btn>
                  <span v-else>{{ item.name }}</span>
                </template>
              </v-data-table>
            </v-card>
          </v-col>

          <!-- RELATED IDENTIFIERS -->
          <v-col
            cols="12"
            class="py-3"
            v-if="doi.doiRelatedIdentifiers.length > 0"
          >
            <v-card class="mobile-override elevation-3">
              <v-card-title>
                <span>Related identifiers</span>
                <v-spacer />
                <v-icon color="#191414">fas fa-project-diagram</v-icon>
              </v-card-title>
              <v-data-table
                disable-sort
                :headers="relatedIdentifiersHeaders"
                :items="doi.doiRelatedIdentifiers"
              >
                <template v-slot:item.value="{ item }">
                  <span style="word-break: break-all">{{ item.value }}</span>
                </template>

                <template v-slot:item.id="{ item }">
                  <v-btn
                    icon
                    color="#1db954"
                    :href="getDoiUrl({ doi: item.value })"
                    :title="getDoiUrl({ doi: item.value })"
                    target="DoiWindow"
                  >
                    <v-icon>fas fa-link</v-icon>
                  </v-btn>
                </template>
              </v-data-table>
            </v-card>
          </v-col>

          <!-- MAP -->
          <v-col
            cols="12"
            class="py-3"
            v-if="computedGeolocations.length > 0 || computedPolygon.length > 0"
          >
            <v-card class="elevation-3">
              <v-card-title>
                <span>Related geolocations</span>
                <v-spacer />
                <v-icon color="#191414">far fa-map</v-icon>
              </v-card-title>

              <Map
                :locations="computedGeolocations"
                :polygon="computedPolygon"
              />
            </v-card>
          </v-col>

          <!-- RELATED GEOLOCATIONS -->
          <v-col cols="12" class="py-3" v-if="doi.doiGeolocations.length > 0">
            <v-card class="mobile-override elevation-3">
              <v-card-title>
                <span>Related geolocations (table)</span>
                <v-spacer />
                <v-btn
                  icon
                  color="#1db954"
                  @click="showGeolocationsTable = !showGeolocationsTable"
                >
                  <v-icon>{{
                    showGeolocationsTable
                      ? "fas fa-chevron-up"
                      : "fas fa-chevron-down"
                  }}</v-icon>
                </v-btn>
              </v-card-title>
              <v-expand-transition>
                <div v-show="showGeolocationsTable">
                  <v-data-table
                    disable-sort
                    :headers="geolocationsHeaders"
                    :items="doi.doiGeolocations"
                  >
                    <template v-slot:item.place="{ item }">
                      <v-btn
                        v-if="item.locality"
                        class="text-none wrap-link pa-0"
                        height="unset"
                        min-width="unset"
                        text
                        color="#1db954"
                        :href="
                          getGeocollectionsUrl({
                            object: 'locality',
                            id: item.locality
                          })
                        "
                        :title="
                          getGeocollectionsUrl({
                            object: 'locality',
                            id: item.locality
                          })
                        "
                        target="GeocollectionsWindow"
                        >{{ item.locality__locality_en }}</v-btn
                      >
                      <span v-else>{{ item.place }}</span>
                    </template>

                    <template v-slot:item.point="{ item }">
                      <span
                        v-if="item.point_latitude && item.point_longitude"
                        >{{
                          `${item.point_latitude} ${item.point_longitude}`
                        }}</span
                      >
                      <span v-else-if="item.point">{{
                        `${item.point.split(" ")[0]} ${
                          item.point.split(" ")[1]
                        }`
                      }}</span>
                    </template>

                    <template v-slot:item.polygon="{ item }">
                      <v-icon v-if="item.polygon" color="green accent-4"
                        >far fa-check-circle</v-icon
                      >
                    </template>
                  </v-data-table>
                </div>
              </v-expand-transition>
            </v-card>
          </v-col>

          <!-- LINKED DATES -->
          <v-col cols="12" class="pt-3" v-if="doi.doiDates.length > 0">
            <v-card class="mobile-override elevation-3">
              <v-card-title>
                <span>Linked dates</span>
                <v-spacer />
                <v-icon color="#191414">far fa-calendar-alt</v-icon>
              </v-card-title>
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

  <v-container v-else class="doi-detail-error">
    <v-alert
      v-if="!doi.loadingState"
      border="right"
      color="red"
      elevation="3"
      icon="fas fa-exclamation-circle"
      prominent
    >
      <span
        >Unfortunately DOI with an identifier
        <b>{{ $route.path.substring(1) }}</b> couldn't be found.</span
      >
    </v-alert>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import FilePreview from "../partial/FilePreview";
import Map from "../partial/map/Map";

export default {
  name: "Doi",
  components: { FilePreview, Map },
  data: () => ({
    egfUrl: "https://tarkvara.datel.ee/fond/egf/",
    showGeolocationsTable: false,
    generalDataHeaders: [
      { text: "Citation", value: "id" },
      { text: "DOI", value: "identifier" },
      { text: "Resource type", value: "resource_type__value" },
      { text: "Resource topic", value: "resource" },
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
      { text: "Dataset", value: "dataset" },
      { text: "Related reference", value: "reference" },
      { text: "SARV created", value: "date_added" },
      { text: "SARV updated", value: "date_changed" },
      { text: "DataCite created", value: "datacite_created" },
      { text: "DataCite updated", value: "datacite_updated" }
    ],
    attachmentHeaders: [
      { text: "Type", value: "attachment__type__value_en" },
      { text: "Description", value: "attachment__description_en" },
      { text: "Formats", value: "attachment__attachment_format__value" },
      { text: "Preview", value: "id", align: "center" }
    ],
    agentHeaders: [
      { text: "Name", value: "name" },
      { text: "Relation", value: "agent_type__value" }
    ],
    relatedIdentifiersHeaders: [
      { text: "Relation", value: "relation_type__value" },
      { text: "Identifier", value: "identifier_type__value" },
      { text: "Value", value: "value", class: "break-all" },
      { text: "Remarks", value: "remarks" },
      { text: "Link", value: "id", align: "center" }
    ],
    geolocationsHeaders: [
      { text: "Named place", value: "place" },
      { text: "Point (Lat Long)", value: "point" },
      { text: "Polygon", value: "polygon", align: "center" }
    ],
    datesHeaders: [
      { text: "Date/range", value: "date" },
      { text: "Date type", value: "date_type__value" },
      { text: "Remarks", value: "remarks" }
    ]
  }),
  beforeRouteLeave(to, from, next) {
    this.$store.dispatch("resetDoi");
    next();
  },
  computed: {
    ...mapState(["doi"]),

    computedGeneralDataHeaders() {
      return this.generalDataHeaders.filter(header => {
        if (this.doi.doi[0][header.value]) {
          return header;
        }
      });
    },

    computedGeolocations() {
      if (this.doi.doiGeolocations && this.doi.doiGeolocations.length > 0) {
        return this.doi.doiGeolocations
          .map(location => {
            if (location.point_latitude && location.point_longitude) {
              return {
                lat: location.point_latitude,
                lng: location.point_longitude,
                id: location.locality ? location.locality : null,
                name: location.place
                  ? location.place
                  : location.locality__locality_en
              };
            } else if (location.point) {
              let point = location.point.split(" ");
              return {
                lat: point[0],
                lng: point[1],
                id: location.locality ? location.locality : null,
                name: location.place
                  ? location.place
                  : location.locality__locality_en
              };
            } else return null;
          })
          .filter(item => typeof item !== "undefined" && item !== null);
      } else return [];
    },

    computedPolygon() {
      if (this.doi.doiGeolocations && this.doi.doiGeolocations.length > 0) {
        return this.doi.doiGeolocations
          .map(location => {
            if (location.polygon) {
              return {
                polygon: JSON.parse(location.polygon),
                id: location.locality ? location.locality : null,
                name: location.place
                  ? location.place
                  : location.locality__locality_en
              };
            } else return null;
          })
          .filter(item => typeof item !== "undefined" && item !== null);
      } else return [];
    },

    isDoiFromEgf() {
      return !!(
        this.doi &&
        this.doi.doi &&
        this.doi.doi.length > 0 &&
        this.doi.doi[0].egf
      );
    }
  },
  watch: {
    "$route.params.id": {
      handler: function(newVal) {
        this.$store.dispatch("getDoiDetail", { id: newVal });
      },
      immediate: true
    }
  },
  methods: {
    getGeocollectionsUrl(params) {
      if (params && params.object && params.id) {
        return `https://geocollections.info/${params.object}/${params.id}`;
      }
    },

    getDoiUrl(params) {
      if (params && params.doi) {
        let url = params.doi.replace(/\s/g, "");
        if (url.startsWith("http")) return url;
        else {
          url = "1" + url.substring(url.indexOf("10.") + 1);
          return `https://doi.org/${url}`;
        }
      }
    },

    getOrcidUrl(orcid) {
      if (orcid) return "https://orcid.org/" + orcid;
    },

    getCitation(doi) {
      if (doi) {
        let citation = "";
        if (
          doi.creators &&
          doi.publication_year &&
          doi.title &&
          doi.publisher &&
          doi.identifier
        ) {
          citation = `${doi.creators} (${doi.publication_year}): ${doi.title}. ${doi.publisher}. doi:${doi.identifier}. `;
        }
        if (
          doi.reference__author &&
          doi.reference__year &&
          doi.reference__title &&
          doi.reference__journal__journal_short &&
          doi.reference__volume &&
          doi.reference__pages &&
          doi.reference__doi
        ) {
          citation += `Supplement to: ${doi.reference__author} (${doi.reference__year}): ${doi.reference__title}. ${doi.reference__journal__journal_short} ${doi.reference__volume}: ${doi.reference__pages}. doi:${doi.reference__doi}. `;
        }
        return citation;
      }
    }
  }
};
</script>

<style scoped>
.larger {
  font-size: large;
}

.general-info-card >>> tr:hover {
  background-color: unset !important;
}

.general-info-card >>> .v-data-table__mobile-row:hover {
  background: #eeeeee;
}

.general-info-card >>> .v-data-table__mobile-row {
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
}

.general-info-card >>> .v-data-table__mobile-row:last-child {
  border-bottom: unset;
}

.general-info-card >>> .v-data-table__mobile-row__header {
  min-width: 100px;
  align-self: start;
}

.general-info-card >>> .v-data-table td {
  height: unset;
  min-height: 48px;
}

.general-info-card >>> .v-data-table__mobile-row__cell {
  text-align: left;
  width: 100%;
  padding-left: 10px;
}

.wrap-link >>> .v-btn__content {
  flex: auto;
  white-space: normal;
}

@media (max-width: 599px) {
  .mobile-override >>> .v-data-table__mobile-row__header {
    min-width: 100px;
    align-self: start;
  }

  .mobile-override >>> .v-data-table td {
    height: unset;
    min-height: 48px;
  }
}
</style>
