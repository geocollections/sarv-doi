import { getAboutSarvDoi } from "../../../middleware/api";

const state = {
  about: null,
  carouselSlides: [
    {
      id: 1,
      src: "https://files.geocollections.info/img/doi/header.jpg"
    }
  ]
};

const actions = {
  async getAboutPageInfo({ commit }) {
    const response = await getAboutSarvDoi();
    if (response && response.results) {
      commit("ABOUT_PAGE_INFO", response.results);
    }
  }
};

const mutations = {
  ABOUT_PAGE_INFO(state, payload) {
    state.about = payload[0];
  }
};

const getters = {};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};
