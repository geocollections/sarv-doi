const routes = require("./src/routesForSitemap");

module.exports = {
  // Disable source viewing in production
  productionSourceMap: false,
  // EDGE doesn't work otherwise
  transpileDependencies: ["vuetify"],
  pluginOptions: {
    sitemap: {
      pretty: true,
      baseURL: "https://doi.geocollections.info",
      routes
    }
  }
};
