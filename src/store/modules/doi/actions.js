import {
  getDoi,
  getDoiAgent,
  getDoiAttachment,
  getDoiDate,
  getDoiGeolocation,
  getDoiRelatedIdentifier,
  getDois
} from "../../../middleware/api";

const actions = {
  async getDois({ dispatch, commit }, params) {
    await dispatch("setLoadingState", true);
    const response = await getDois(params.routeParams, params.searchParams);

    if (response && response.results) {
      commit("SET_DOIS", {
        results: response.results,
        count: response.count
      });
    }

    await dispatch("setLoadingState", false);
  },

  async getDoiDetail({ dispatch, commit }, params) {
    await dispatch("setLoadingState", true);
    const response = await getDoi(params.id);

    if (response && response.results) {
      commit("SET_DOI", { doi: response.results });

      await dispatch("getDoiAttachments", params.id);
      await dispatch("getDoiAgents", params.id);
      await dispatch("getDoiDates", params.id);
      await dispatch("getDoiGeolocations", params.id);
      await dispatch("getDoiRelatedIdentifiers", params.id);
    }

    await dispatch("setLoadingState", false);
  },

  async getDoiAttachments({ commit }, id) {
    const doiAttachments = await getDoiAttachment(id);
    if (doiAttachments && doiAttachments.results) {
      commit("SET_DOI_ATTACHMENTS", doiAttachments.results);
    }
  },

  async getDoiAgents({ commit }, id) {
    const doiAgents = await getDoiAgent(id);
    if (doiAgents && doiAgents.results) {
      commit("SET_DOI_AGENTS", doiAgents.results);
    }
  },

  async getDoiDates({ commit }, id) {
    const doiDates = await getDoiDate(id);
    if (doiDates && doiDates.results) {
      commit("SET_DOI_DATES", doiDates.results);
    }
  },

  async getDoiGeolocations({ commit }, id) {
    const doiGeolocations = await getDoiGeolocation(id);
    if (doiGeolocations && doiGeolocations.results) {
      commit("SET_DOI_GEOLOCATIONS", doiGeolocations.results);
    }
  },

  async getDoiRelatedIdentifiers({ commit }, id) {
    const doiRelatedIdentifiers = await getDoiRelatedIdentifier(id);
    if (doiRelatedIdentifiers && doiRelatedIdentifiers.results) {
      commit("SET_DOI_RELATED_IDENTIFIERS", doiRelatedIdentifiers.results);
    }
  },

  setLoadingState({ commit }, state) {
    commit("SET_LOADING_STATE", { loadingState: state });
  }
};

export default actions;
