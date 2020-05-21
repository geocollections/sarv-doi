<template>
  <div class="about">
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
                  v-if="about && about.content_en"
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
                    {{ about.title_en }}
                  </div>
                  <div v-html="about.content_en" />
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
  name: "About",
  created() {
    this.getAboutPageInfo();
  },
  computed: {
    ...mapState("settings", ["about", "carouselSlides"])
  },
  methods: {
    ...mapActions("settings", ["getAboutPageInfo"])
  }
};
</script>

<style scoped>
.about >>> .v-overlay__content {
  width: 100%;
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
