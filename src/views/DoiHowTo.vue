<template>
  <div class="doi-howto">
    <v-carousel
      prev-icon="fas fa-angle-left"
      next-icon="fas fa-angle-right"
      height="85.7vh"
      hide-delimiters
      :show-arrows="false"
    >
      <v-carousel-item
        v-for="slide in carouselSlides"
        :key="slide.id"
        :src="slide.src"
        transition="slide-x-transition"
        reverse-transition="slide-x-transition"
      >
        <v-overlay absolute>
          <v-sheet height="100%" tile color="transparent">
            <v-row class="fill-height" align="center" no-gutters>
              <v-col cols="2" md="1"></v-col>
              <v-col cols="8" md="6" lg="5" xl="4" class="pl-1">
                <div
                  v-if="doiHowTo && doiHowTo.content_en"
                  class="font-weight-medium carousel-text"
                  :class="{
                    'carousel-text-xs': $vuetify.breakpoint.xsOnly,
                    'carousel-text-sm': $vuetify.breakpoint.smOnly
                  }"
                >
                  <div
                    class="title-text mb-2"
                    :class="{
                      'title-text-xs': $vuetify.breakpoint.xsOnly,
                      'title-text-sm': $vuetify.breakpoint.smOnly
                    }"
                  >
                    {{ doiHowTo.title_en }}
                  </div>
                  <div v-html="doiHowTo.content_en" />
                </div>
              </v-col>
              <v-col cols="2" md="5"></v-col>
            </v-row>
          </v-sheet>
        </v-overlay>
      </v-carousel-item>
    </v-carousel>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "DoiHowTo",
  created() {
    this.getDoiHowToInfo();
  },
  computed: {
    ...mapState("settings", ["doiHowTo", "carouselSlides"])
  },
  methods: {
    ...mapActions("settings", ["getDoiHowToInfo"])
  }
};
</script>

<style scoped>
.doi-howto >>> .v-overlay__content {
  width: 100%;
}

.doi-howto >>> a {
  font-weight: bold;
}

.carousel-text {
  font-size: 18px;
}

.carousel-text-sm {
  font-size: 14px;
}

.carousel-text-xs {
  font-size: 12px;
}

.title-text {
  font-size: 48px;
}

.title-text-sm {
  font-size: 34px;
}

.title-text-xs {
  font-size: 24px;
}
</style>
