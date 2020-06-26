const axios = require("axios");

module.exports = [
  {
    path: "*",
    redirect: "/"
  },
  {
    path: "/",
    name: "dois",
    component: () => import("./views/Dois")
  },
  {
    path: "/10.15152/GEO.:id",
    name: "doi",
    component: () => import("./components/doi/Doi.vue"),
    meta: {
      sitemap: {
        slugs: async () => await getIdsForSitemap("doi")
      }
    }
  },
  {
    path: "/about",
    name: "about",
    component: () => import("./views/About")
  },
  {
    path: "/how_to",
    name: "DOI howto",
    component: () => import("./views/DoiHowTo")
  }
];

async function getIdsForSitemap(table) {
  if (table) {
    const API_URL = "https://api.geocollections.info/";

    let url = API_URL + table + "?";

    // if (table === "area") {
    //   url += "area_type=2&";
    // } else if (table === "site") {
    //   url += "project=20&";
    // } else if (table === "sample") {
    //   url += "site__project=20&";
    // }

    url += "fields=id&format=json";

    const response = await axios.get(url);

    if (response.status === 200) return response.data.results || [2];
    else return [1];
  } else return [1];
}
