import { getAboutSarvDoi, getDoiHowTo } from "../../../middleware/api";

const state = {
  about: null,
  doiHowTo: null,
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
  },

  async getDoiHowToInfo({ commit }) {
    const response = await getDoiHowTo();
    if (response && response.results) {
      commit("DOI_HOW_TO_INFO", response.results);
    }
  }
};

const mutations = {
  ABOUT_PAGE_INFO(state, payload) {
    state.about = payload[0];
  },

  DOI_HOW_TO_INFO(state, payload) {
    state.doiHowTo = payload[0];
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
