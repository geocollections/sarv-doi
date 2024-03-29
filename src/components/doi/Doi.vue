<template>
  <v-container class="doi-detail-view" v-if="doi && doi.doi">
    <v-card class="pa-1">
      <v-banner
        icon-color="cyan darken-2"
        icon="fas fa-book-open"
        style="border-bottom: 3px solid rgba(0, 0, 0, 0.12);"
      >
        <div class="banner-text">
          <span class="identifier">{{ doi.doi[0].identifier }}: </span>
          <span class="font-weight-bold">{{ doi.doi[0].title }}</span>
        </div>
      </v-banner>

      <v-row>
        <v-col cols="12" md="6">
          <v-row no-gutters>
            <!-- GENERAL INFO -->
            <v-col cols="12 pt-3">
              <v-card flat class="general-info-card">
                <v-card-title class="cyan--text darken-2 colored-border mb-2">
                  <span>General info</span>
                  <v-spacer />
                  <v-icon color="cyan darken-2">fas fa-list</v-icon>
                </v-card-title>
                <v-data-table
                  :mobile-breakpoint="9000"
                  disable-sort
                  disable-filtering
                  disable-pagination
                  hide-default-footer
                  :headers="computedGeneralDataHeaders"
                  :items="doi.doi"
                >
                  <template v-slot:item.id="{ item }">
                    <span>{{ getCitation(item) }}</span>
                  </template>

                  <template v-slot:item.egf="{ item }">
                    <v-btn
                      text
                      height="unset"
                      min-width="unset"
                      class="text-none wrap-link pa-0 font-weight-bold"
                      color="customRed"
                      :href="computedEgfUrl"
                      :title="computedEgfUrl"
                      target="EgfWindow"
                    >
                      {{ computedEgfUrl }}
                    </v-btn>
                  </template>

                  <template v-slot:item.licence__licence_en="{ item }">
                    <v-btn
                      class="pa-0 font-weight-bold"
                      height="unset"
                      min-width="unset"
                      text
                      color="customRed "
                      :href="item.licence__licence_url_en"
                      :title="item.licence__licence_url_en"
                      target="LicenceWindow"
                      >{{ item.licence__licence_en }}</v-btn
                    >
                  </template>

                  <template v-slot:item.dataset="{ item }">
                    <v-btn
                      class="text-none wrap-link pa-0 font-weight-bold"
                      height="unset"
                      min-width="unset"
                      text
                      color="customRed "
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
                      class="text-none wrap-link pa-0 font-weight-bold"
                      height="unset"
                      min-width="unset"
                      text
                      color="customRed "
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
                      item.date_added | moment("YYYY-MM-DD")
                    }}</span>
                    <span v-else>{{ item.date_added }}</span>
                  </template>

                  <template v-slot:item.date_changed="{ item }">
                    <span v-if="item.date_changed">{{
                      item.date_changed | moment("YYYY-MM-DD")
                    }}</span>
                    <span v-else>{{ item.date_changed }}</span>
                  </template>

                  <template v-slot:item.datacite_created="{ item }">
                    <span v-if="item.datacite_created">{{
                      item.datacite_created | moment("YYYY-MM-DD")
                    }}</span>
                    <span v-else>{{ item.datacite_created }}</span>
                  </template>

                  <template v-slot:item.datacite_updated="{ item }">
                    <span v-if="item.datacite_updated">{{
                      item.datacite_updated | moment("YYYY-MM-DD")
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
              <v-card flat class="mobile-override">
                <v-card-title class="cyan--text darken-2 colored-border mb-2">
                  <span>EGF Files</span>
                  <v-spacer />
                  <v-icon color="cyan darken-2">fas fa-atlas</v-icon>
                </v-card-title>
                <v-data-table
                  :hide-default-footer="doi.doiEgfFiles.length < 11"
                  :footer-props="{
                    itemsPerPageText: '',
                    itemsPerPageOptions: [5, -1],
                    itemsPerPageAllText: 'Kõik'
                  }"
                  disable-sort
                  :headers="egfHeaders"
                  :items="doi.doiEgfFiles"
                >
                  <template v-slot:item.preview="{ item }">
                    <v-img
                      v-if="item.preview"
                      alt="Image preview..."
                      :src="getEgfFile(doi.doi[0].egf, item.preview)"
                      :lazy-src="getEgfFile(doi.doi[0].egf, item.preview)"
                      :title="computedEgfUrl"
                      max-height="130"
                      max-width="175"
                      class="link my-1"
                      @click="
                        openUrl({
                          url: computedEgfUrl,
                          target: 'EgfWindow'
                        })
                      "
                    >
                    </v-img>

                    <v-btn
                      v-else
                      icon
                      color="customRed "
                      :href="computedEgfUrl"
                      :title="computedEgfUrl"
                      target="EgfWindow"
                    >
                      <v-icon color="customRed">far fa-file</v-icon>
                    </v-btn>
                  </template>

                  <template v-slot:item.title="{ item }">
                    <div>
                      <span class="font-weight-bold">{{ item.title }}</span>
                      <span
                        v-if="item.size"
                        class="ml-1"
                        style="white-space: nowrap;"
                        >({{ item.size }})</span
                      >
                    </div>
                  </template>

                  <template v-slot:item.url="{ item }">
                    <egf-file-download
                      :egf="doi.doi[0].egf"
                      :file-id="item.id"
                      :filename="item.title"
                    />
                  </template>
                </v-data-table>
              </v-card>
            </v-col>

            <!-- FILES -->
            <v-col
              cols="12"
              class="py-3"
              v-if="!isDoiFromEgf && doi.doiAttachments.length > 0"
            >
              <v-card flat class="mobile-override">
                <v-card-title class="cyan--text darken-2 colored-border mb-2">
                  <span>Files</span>
                  <v-spacer />
                  <v-icon color="cyan darken-2">far fa-folder-open</v-icon>
                </v-card-title>
                <v-data-table
                  disable-sort
                  :headers="attachmentHeaders"
                  :items="doi.doiAttachments"
                  :footer-props="{
                    'items-per-page-options': [10, 20, 50, 100, -1]
                  }"
                  :items-per-page="20"
                  :hide-default-footer="doi.doiAttachments.length < 10"
                >
                  <template v-slot:item.id="{ item }">
                    <file-preview :data="item" />
                  </template>
                </v-data-table>
              </v-card>
            </v-col>

            <!-- RELATED PERSONS AND INSTITUTIONS -->
            <v-col cols="12" class="py-3" v-if="doi.doiAgents.length > 0">
              <v-card flat class="mobile-override">
                <v-card-title class="cyan--text darken-2 colored-border mb-2">
                  <span>Related persons and institutions</span>
                  <v-spacer />
                  <v-icon color="cyan darken-2">fas fa-users</v-icon>
                </v-card-title>
                <v-data-table
                  disable-sort
                  :headers="agentHeaders"
                  :items="doi.doiAgents"
                  :footer-props="{
                    'items-per-page-options': [10, 20, 50, 100, -1]
                  }"
                  :items-per-page="20"
                  :hide-default-footer="doi.doiAgents.length < 10"
                >
                  <template v-slot:item.name="{ item }">
                    <v-btn
                      v-if="item.orcid"
                      class="text-none wrap-link pa-0"
                      height="unset"
                      min-width="unset"
                      text
                      color="customRed "
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
              <v-card flat class="mobile-override">
                <v-card-title class="cyan--text darken-2 colored-border mb-2">
                  <span>Related identifiers</span>
                  <v-spacer />
                  <v-icon color="cyan darken-2">fas fa-project-diagram</v-icon>
                </v-card-title>
                <v-data-table
                  disable-sort
                  :headers="relatedIdentifiersHeaders"
                  :items="doi.doiRelatedIdentifiers"
                  :footer-props="{
                    'items-per-page-options': [10, 20, 50, 100, -1]
                  }"
                  :items-per-page="20"
                  :hide-default-footer="doi.doiRelatedIdentifiers.length < 10"
                >
                  <template v-slot:item.value="{ item }">
                    <span style="word-break: break-all">{{ item.value }}</span>
                  </template>

                  <template v-slot:item.id="{ item }">
                    <v-btn
                      v-if="item.value"
                      icon
                      color="customRed "
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
              v-if="
                computedGeolocations.length > 0 || computedPolygon.length > 0
              "
            >
              <v-card flat>
                <v-card-title class="cyan--text darken-2 colored-border mb-2">
                  <span>Related geolocations</span>
                  <v-spacer />
                  <v-icon color="cyan darken-2">far fa-map</v-icon>
                </v-card-title>

                <Map
                  :locations="computedGeolocations"
                  :polygon="computedPolygon"
                />
              </v-card>
            </v-col>

            <!-- RELATED GEOLOCATIONS -->
            <v-col cols="12" class="py-3" v-if="doi.doiGeolocations.length > 0">
              <v-card flat class="mobile-override">
                <v-card-title class="cyan--text darken-2 colored-border mb-2">
                  <span>Related geolocations (table)</span>
                  <v-spacer />
                  <v-btn
                    icon
                    color="customRed "
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
                      :footer-props="{
                        'items-per-page-options': [10, 20, 50, 100, -1]
                      }"
                      :items-per-page="20"
                      :hide-default-footer="doi.doiGeolocations.length < 10"
                    >
                      <template v-slot:item.place="{ item }">
                        <v-btn
                          v-if="item.locality"
                          class="text-none wrap-link pa-0 font-weight-bold"
                          height="unset"
                          min-width="unset"
                          text
                          color="customRed "
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
                        <v-icon v-if="item.polygon" color="customRed "
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
              <v-card flat class="mobile-override">
                <v-card-title class="cyan--text darken-2 colored-border mb-2">
                  <span>Linked dates</span>
                  <v-spacer />
                  <v-icon color="cyan darken-2">far fa-calendar-alt</v-icon>
                </v-card-title>
                <v-data-table
                  disable-sort
                  :headers="datesHeaders"
                  :items="doi.doiDates"
                  :footer-props="{
                    'items-per-page-options': [10, 20, 50, 100, -1]
                  }"
                  :items-per-page="20"
                  :hide-default-footer="doi.doiDates.length < 10"
                />
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card>
  </v-container>

  <v-container v-else class="doi-detail-error">
    <v-alert
      v-if="!doi.loadingState"
      border="right"
      color="customRed "
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
import EgfFileDownload from "../partial/EgfFileDownload";

export default {
  name: "Doi",
  components: { EgfFileDownload, FilePreview, Map },
  metaInfo() {
    let identifier,
      description = "";
    if (this.doi.doi) {
      identifier = `DOI: ${this.doi.doi[0].identifier}`;
      description = this.doi.doi[0].title;
    }
    return {
      title: identifier,
      description: description
    };
  },
  data: () => ({
    egfUrl: "https://fond.egt.ee/fond/egf/",
    showGeolocationsTable: false,
    generalDataHeaders: [
      { text: "Citation", value: "id" },
      { text: "DOI", value: "identifier" },
      { text: "EGF link", value: "egf" },
      { text: "Resource type", value: "resource_type__value" },
      { text: "Resource topic", value: "resource" },
      { text: "Author(s)", value: "creators" },
      { text: "Title", value: "title" },
      { text: "Title alternative", value: "title_alternative" },
      { text: "Title translated", value: "title_translated" },
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
    egfHeaders: [
      { text: "Link / Preview", value: "preview", align: "center" },
      { text: "Title", value: "title" },
      { text: "EGF url", value: "url" }
    ],
    attachmentHeaders: [
      { text: "Preview", value: "id", align: "center" },
      { text: "Formats", value: "attachment__attachment_format__value" },
      // { text: "Type", value: "attachment__type__value_en" },
      { text: "Description", value: "attachment__description_en" }
    ],
    agentHeaders: [
      { text: "Name", value: "name" },
      { text: "Affiliation", value: "affiliation" },
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

    computedEgfUrl() {
      if (this.doi.doi[0].egf) {
        return this.egfUrl + this.doi.doi[0].egf;
      }
      return "";
    },

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
          citation = `${doi.creators} (${doi.publication_year}): ${doi.title}. ${doi.publisher}. https://doi.org/${doi.identifier}. `;
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
          citation += `Supplement to: ${doi.reference__author} (${doi.reference__year}): ${doi.reference__title}. ${doi.reference__journal__journal_short} ${doi.reference__volume}: ${doi.reference__pages}. https://doi.org/${doi.reference__doi}. `;
        }
        return citation;
      }
    },

    formatBytes(bytes, decimals = 2) {
      if (bytes === 0) return "0 Bytes";

      const k = 1000;
      const dm = decimals < 0 ? 0 : decimals;
      const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

      const i = Math.floor(Math.log(bytes) / Math.log(k));

      return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
    },

    getEgfFile(egfNumber, fileId) {
      if (egfNumber && fileId) {
        return `https://api.geoloogia.info/egf/get-file/${egfNumber}/${fileId}`;
      } else return "";
    },

    openUrl(params) {
      window.open(params.url, params.target || "FilePreviewWindow");
    },

    isPreviewImage(filename) {
      if (filename) {
        const imageTypes = [
          ".apng",
          ".bmp",
          ".gif",
          ".ico",
          ".cur",
          ".jpg",
          ".jpeg",
          ".jfif",
          ".pjpeg",
          ".pjp",
          ".png",
          ".svg",
          ".webp"
        ];
        return imageTypes.some(type => filename.endsWith(type));
      } else return false;
    }
  }
};
</script>

<style scoped>
.doi-detail-view,
.doi-detail-error {
  margin-top: 48px;
}

.doi-detail-view >>> .v-btn--text {
  text-decoration: underline;
}

.banner-text {
  font-size: 2rem;
  line-height: 1.1;
}

.banner-text > .identifier {
  word-break: break-all;
}

.colored-border {
  border-bottom: 1px solid #0097a7;
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
  }

  .mobile-override >>> .v-data-table td {
    height: unset;
    min-height: 48px;
  }
}

.link:hover {
  cursor: pointer;
  opacity: 0.85;
}
</style>
