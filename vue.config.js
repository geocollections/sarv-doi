const routes = require("./src/routesForSitemap");

module.exports = {
  // Disable source viewing in production
  productionSourceMap: false,
  // EDGE doesn't work otherwise
  transpileDependencies: ["vuetify"],
  parallel: process.env.CI ? +process.env.CIRCLE_NODE_TOTAL : undefined,
  pluginOptions: {
    sitemap: {
      productionOnly: true,
      outputDir: "./public",
      pretty: true,
      baseURL: "https://doi.geocollections.info",
      routes
    }
  }
};
