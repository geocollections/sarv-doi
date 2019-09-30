import isEmpty from "lodash/isEmpty";

const api = {
  geocollectionsUrl: process.env.VUE_APP_GEOCOLLECTIONS_PUBLIC_API_URL,
  solrUrl: "https://api.geocollections.info/solr/"
};

async function get(child = "", customUrl) {
  let url = api.geocollectionsUrl + child;
  if (customUrl) url = customUrl + child;

  const response = await fetch(url, { method: "GET" });
  return await response.json();
}

export function getDoisFromFastSearch(query) {
  if (query) return get(`doi/?q=${query}&format=json`, api.solrUrl);
}

export function getDoisFromAdvancedSearch(searchParameters) {
  if (!isEmpty(searchParameters)) {
    return get(
      `doi/?page=${searchParameters.page}&paginate_by=${searchParameters.paginateBy}&order_by=${searchParameters.orderBy}&format=json`
    );
  } else {
    return get(`doi/?format=json`);
  }
}
