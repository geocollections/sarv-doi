<template>
  <div id="app-header">
    <!-- DRAWER -->
    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
      dark
      disable-resize-watcher
      temporary
      color="brown"
    >
      <v-list dense>
        <v-subheader>ROUTES</v-subheader>
        <v-list-item
          v-for="item in routes"
          :key="item.text"
          :to="item.path"
          :title="item.text"
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title>
              {{ item.text }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-subheader>OTHER RESOURCES</v-subheader>
        <v-list-item
          v-for="item in otherLinks"
          :key="item.text"
          :href="item.url"
          target="OtherLinkWindow"
          :title="item.text"
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title>
              {{ item.text }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- HEADER -->
    <v-app-bar app clipped-right dark dense fixed color="brown">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />

      <v-toolbar-title class="pr-9 align-center">
        <span class="font-weight-bold">SARV·DOI</span>
      </v-toolbar-title>

      <v-toolbar-items class="d-none d-sm-block">
        <v-btn text title="Home" to="/">Home</v-btn>
      </v-toolbar-items>

      <div class="flex-grow-1"></div>

      <v-toolbar-items class="d-none d-sm-block">
        <v-menu v-model="showOtherLinkDropdown" offset-y z-index="1101">
          <template v-slot:activator="{ on }">
            <v-btn text v-on="on">
              Resources&nbsp;
              <v-icon>{{
                showOtherLinkDropdown ? "fas fa-caret-up" : "fas fa-caret-down"
              }}</v-icon>
            </v-btn>
          </template>

          <v-list color="brown" dark dense>
            <v-list-item
              v-for="item in otherLinks"
              :key="item.text"
              :href="item.url"
              target="OtherLinkWindow"
            >
              <v-list-item-icon>
                <v-icon v-text="item.icon" />
              </v-list-item-icon>
              <v-list-item-title>{{ item.text }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-toolbar-items>

      <!--      <v-app-bar-nav-icon-->
      <!--        @click.stop="drawerRight = !drawerRight"-->
      <!--        v-if="$route.path === '/'"-->
      <!--      ></v-app-bar-nav-icon>-->
    </v-app-bar>

    <!-- LANDING IMAGE -->
    <div class="fullscreen-landing-image">
      <div class="d-flex flex-column justify-center" style="height: 100%">
        <div
          class="text-center font-weight-bold page-header animated fadeIn faster"
        >
          <router-link
            :to="{ path: '/' }"
            class="white--text"
            title="Go to home"
          >
            SARV·DOI
          </router-link>
        </div>
        <div class="text-center page-subheader py-2 animated fadeIn faster">
          Geoscience Data Repository
        </div>
        <div class="mx-auto">
          <v-text-field
            v-model.trim="fastSearch"
            hide-details
            autofocus
            clear-icon="fas fa-times"
            clearable
            color="brown"
            solo
            label="DOI search..."
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import debounce from "lodash/debounce";

export default {
  name: "AppHeader",
  data: () => ({
    fastSearch: null,
    drawer: null,
    drawerRight: null,
    routes: [{ icon: "fas fa-home", text: "Home", path: "/" }],
    showOtherLinkDropdown: false,
    otherLinks: [
      {
        icon: "fas fa-database",
        text: "DataCite",
        url: "https://datacite.org/"
      },
      {
        icon: "fas fa-database",
        text: "DataCite Estonia",
        url: "http://datacite.ut.ee/"
      },
      {
        icon: "fas fa-sitemap",
        text: "NATARC",
        url: "https://natarc.ut.ee/"
      },
      {
        icon: "fas fa-globe",
        text: "Geocollections portal",
        url: "https://geocollections.info/"
      },
      {
        icon: "fas fa-fish",
        text: "Baltic fossils",
        url: "https://fossiilid.info/"
      },
      {
        icon: "far fa-gem",
        text: "Minerals and rocks",
        url: "https://kivid.info/"
      },
      {
        icon: "fas fa-book",
        text: "Geological literature",
        url: "http://geoloogia.info/"
      },
      {
        icon: "fas fa-code",
        text: "SARV API",
        url: "https://api.geocollections.info/"
      },
      {
        icon: "fas fa-atlas",
        text: "Geoloogiafond",
        url: "https://www.egt.ee/et/fond-search"
      }
    ]
  }),
  watch: {
    "$route.query": {
      handler: function(newVal) {
        if (newVal && newVal.q) {
          this.fastSearch = newVal.q;
        }
      },
      immediate: true
    },
    fastSearch() {
      this.doFastSearch();
    },
    drawerRight(newVal) {
      this.$store.dispatch("logDrawerRightState", newVal);
    }
  },
  methods: {
    doFastSearch: debounce(function() {
      if (this.fastSearch) {
        if (this.$route.query.q) {
          if (this.$route.query.q !== this.fastSearch) {
            this.$router.push({ path: "/", query: { q: this.fastSearch } });
          }
        } else this.$router.push({ path: "/", query: { q: this.fastSearch } });
      } else if (this.$route.path === "/" && this.$route.query.q) this.$router.push({ path: "/" });
    }, 500)
  }
};
</script>

<style scoped>
#app-header {
  color: #000000 !important;
  z-index: 1100; /* This z-index must be above other z-indexes, for example leaflet has 1000 max */
}

.fullscreen-landing-image {
  z-index: 15 !important;
  height: 30vh;
  min-height: 160px;
  margin-top: 48px;
  background: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0.2) 0%,
      rgba(44, 53, 49, 0.7) 100%
    ),
    url("https://files.geocollections.info/img/doi/header.jpg");
  background-size: cover;
}

.page-header {
  font-size: 3rem;
  color: #ffffff;
  text-shadow: 2px 2px 4px #000000;
  line-height: 90%;
}

.page-header > a {
  text-decoration: none;
}

.page-header > a:hover {
  opacity: 0.8;
}

.page-subheader {
  font-size: 1.5rem;
  color: #ffffff;
  text-shadow: 2px 2px 4px #000000;
  font-weight: 600;
  line-height: 90%;
}
</style>
