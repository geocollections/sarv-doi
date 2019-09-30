const mutations = {
  SET_LOADING_STATE(state, payload) {
    state.loadingState = payload.loadingState;
  },

  SET_DOIS(state, payload) {
    state.dois = payload.results;
    state.doiCount = payload.count;
  }
};

export default mutations;
