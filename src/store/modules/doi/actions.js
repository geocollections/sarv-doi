import {
  getDoisFromAdvancedSearch,
  getDoisFromFastSearch
} from "../../../middleware/api";

const actions = {
  async getDoisFast({ dispatch, commit }, query) {
    if (query) {
      await dispatch("setLoadingState", true);
      const response = await getDoisFromFastSearch(query);

      if (response && response.results) {
        commit("SET_DOIS", {
          results: response.results,
          count: response.count
        });
      }
      await dispatch("setLoadingState", false);
    }
  },

  async getDois({ dispatch, commit }, searchParameters) {
    if (searchParameters) {
      await dispatch("setLoadingState", true);
      const response = await getDoisFromAdvancedSearch(searchParameters);

      if (response && response.results) {
        commit("SET_DOIS", {
          results: response.results,
          count: response.count
        });
      }

      await dispatch("setLoadingState", false);
    }
  },

  setLoadingState({ commit }, state) {
    commit("SET_LOADING_STATE", { loadingState: state });
  }
};

export default actions;
