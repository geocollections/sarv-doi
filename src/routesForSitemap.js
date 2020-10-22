const axios = require("axios");

module.exports = [
  {
    path: "*",
    redirect: "/"
  },
  {
    path: "/",
    name: "dois",
    component: () => import("./views/Dois"),
    meta: {
      sitemap: {
        priority: 1.0,
        changefreq: "weekly"
      }
    }
  },
  {
    path: "/10.15152/GEO.:id",
    name: "doi",
    component: () => import("./components/doi/Doi.vue"),
    meta: {
      sitemap: {
        slugs: async () => await getIdsForSitemap("doi", false)
      }
    }
  },
  {
    path: "/10.23679/:id",
    name: "doi",
    component: () => import("./components/doi/Doi.vue"),
    meta: {
      sitemap: {
        slugs: async () => await getIdsForSitemap("doi", true)
      }
    }
  },
  {
    path: "/about",
    name: "about",
    component: () => import("./views/About"),
    meta: {
      sitemap: {
        priority: 0.5,
        changefreq: "yearly"
      }
    }
  },
  {
    path: "/how_to",
    name: "DOI howto",
    component: () => import("./views/DoiHowTo"),
    meta: {
      sitemap: {
        priority: 0.5,
        changefreq: "yearly"
      }
    }
  }
];

async function getIdsForSitemap(table, isNew = true) {
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

    if (isNew) url += "id__gt=501&";
    else url += "id__lt=502&";

    url += "fields=id&format=json";

    const response = await axios.get(url);

    if (response.status === 200) {
      let mappedResults = response.data.results.map(item => {
        return {
          ...item,
          priority: 0.9,
          changefreq: isNew ? "yearly" : "never"
        };
      });
      return mappedResults || [2];
    } else return [1];
  } else return [1];
}
