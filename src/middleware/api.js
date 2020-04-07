import isEmpty from "lodash/isEmpty";

const api = {
  geocollectionsUrl: process.env.VUE_APP_GEOCOLLECTIONS_PUBLIC_API_URL,
  solrUrl: process.env.VUE_APP_GEOCOLLECTIONS_PUBLIC_API_URL + "solr/"
};

async function get(child = "", customUrl) {
  let url = api.geocollectionsUrl + child;
  if (customUrl) url = customUrl + child;

  const response = await fetch(url, { method: "GET" });
  return await response.json();
}

export function getDois(routeParams, searchParams) {
  if (!isEmpty(searchParams)) {
    if (!isEmpty(routeParams) && routeParams.q) {
      let start = (searchParams.page - 1) * searchParams.paginateBy;
      let sort = searchParams.orderBy.startsWith("-")
        ? `${searchParams.orderBy.substring(1)} desc`
        : `${searchParams.orderBy} asc`;
      return get(
        `doi/?q=${routeParams.q}&start=${start}&rows=${searchParams.paginateBy}&sort=${sort}&format=json`,
        api.solrUrl
      );
    } else {
      return get(
        `doi/?page=${searchParams.page}&paginate_by=${searchParams.paginateBy}&order_by=${searchParams.orderBy}&format=json`
      );
    }
  }
}

export function getDoi(id) {
  return get(`doi/${id}.json`);
}

export function getDoiAttachment(id) {
  return get(
    `attachment_link/?doi=${id}&fields=id,attachment__attachment_format__value,attachment__type__value,attachment__type__value_en,attachment__description,attachment__description_en,attachment__uuid_filename&format=json`
  );
}

export function getDoiAgent(id) {
  return get(`doi_agent/?doi=${id}&format=json`);
}

export function getDoiDate(id) {
  return get(`doi_date/?doi=${id}&format=json`);
}

export function getDoiGeolocation(id) {
  return get(`doi_geolocation/?doi=${id}&format=json`);
}

export function getDoiRelatedIdentifier(id) {
  return get(`doi_related_identifier/?doi=${id}&format=json`);
}

export function getAboutSarvDoi() {
  return get(`webpages/70`);
}
