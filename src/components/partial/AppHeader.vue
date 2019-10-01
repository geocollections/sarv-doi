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
      color="#1db954"
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

        <v-subheader>OTHER LINKS</v-subheader>
        <v-list-item
          v-for="item in otherLinks"
          :key="item.text"
          :href="item.url"
          target="_blank"
          :title="item.text"
          rel="noopener noreferrer"
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

    <!-- DRAWER RIGHT -->
    <v-navigation-drawer
      :value="drawerRight"
      v-if="$route.path === '/'"
      app
      clipped
      color="#1db954"
      dark
      expand-on-hover
      right
      @input="changeDrawerRightState"
    >
      <!-- SEARCH -->
      <v-list dense>
        <v-list-group color="#191414" prepend-icon="fas fa-search" value="true">
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>Search</v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item>
            <v-list-item-content>
              Tavaline otsing
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>

      <!-- ADVANCED SEARCH -->
      <v-list dense>
        <v-list-group color="#191414" prepend-icon="fas fa-search-plus">
          <template v-slot:activator>
            <v-list-item-title>Advanced search</v-list-item-title>
          </template>

          <v-list-item>
            <v-list-item-content>
              Advanced otsing
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>

    <!-- HEADER -->
    <v-app-bar
      app
      clipped-right
      dark
      dense
      hide-on-scroll
      fixed
      color="#1db954"
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title class="pr-9 align-center">
        <span class="font-weight-bold">SARV DOI</span>
      </v-toolbar-title>

      <v-toolbar-items class="d-none d-sm-block">
        <v-btn text title="Home" to="/">Home</v-btn>
      </v-toolbar-items>

      <div class="flex-grow-1"></div>

      <v-btn
        icon
        href="https://edit.geocollections.info/"
        target="_blank"
        rel="noopener noreferrer"
        title="SARV Data Management"
      >
        <v-icon>fas fa-database</v-icon>
      </v-btn>

      <v-app-bar-nav-icon
        @click.stop="drawerRight = !drawerRight"
        v-if="$route.path === '/'"
      ></v-app-bar-nav-icon>
    </v-app-bar>

    <!-- LANDING IMAGE -->
    <div
      class="fullscreen-landing-image"
      :style="{ height: $vuetify.breakpoint.smAndDown ? '45vh' : '35vh' }"
    >
      <div class="d-flex flex-column justify-center" style="height: 100%">
        <div class="text-center font-weight-bold page-header">SARV DOI</div>
        <div class="mx-auto">
          <v-text-field
            v-model.trim="fastSearch"
            autofocus
            clear-icon="fas fa-times"
            clearable
            color="#1db954"
            dark
            filled
            placeholder="DOI search..."
            append-outer-icon="fas fa-search"
            @click:append-outer="doFastSearch"
          ></v-text-field>
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
    otherLinks: [
      {
        icon: "fas fa-database",
        text: "SARV Data Management",
        url: "https://edit.geocollections.info/"
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
    }, 500),

    changeDrawerRightState(drawerState) {
      this.drawerRight = drawerState;
    }
  }
};
</script>

<style scoped>
#app-header {
  color: #191414 !important;
}

.fullscreen-landing-image {
  margin-top: 48px;
  background: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0.2) 0%,
      rgba(44, 53, 49, 0.7) 100%
    ),
    url("https://files.geocollections.info/img/geocollections-front/rock.jpg");
  background-size: cover;
}

.page-header {
  font-size: 4rem;
  color: #ffffff;
  text-shadow: 2px 2px 4px #191414;
}
</style>
