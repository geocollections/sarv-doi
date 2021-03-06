const mutations = {
  SET_LOADING_STATE(state, payload) {
    state.loadingState = payload.loadingState;
  },

  SET_DOIS(state, payload) {
    state.dois = payload.results;
    state.doiCount = payload.count;
  },

  SET_DOI(state, payload) {
    state.doi = payload.doi;
  },

  SET_DOI_ATTACHMENTS(state, results) {
    state.doiAttachments = results;
  },

  SET_DOI_AGENTS(state, results) {
    state.doiAgents = results;
  },

  SET_DOI_DATES(state, results) {
    state.doiDates = results;
  },

  SET_DOI_GEOLOCATIONS(state, results) {
    state.doiGeolocations = results;
  },

  SET_DOI_RELATED_IDENTIFIERS(state, results) {
    state.doiRelatedIdentifiers = results;
  },

  SET_DOI_EGF_FILES(state, results) {
    state.doiEgfFiles = results;
  },

  RESET_DOI(state) {
    state.doi = null;
    state.doiAttachments = [];
    state.doiAgents = [];
    state.doiDates = [];
    state.doiGeolocations = [];
    state.doiRelatedIdentifiers = [];
    state.doiEgfFiles = [];
  }
};

export default mutations;
