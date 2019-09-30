import getters from "./getters";
import actions from "./actions";
import mutations from "./mutations";

const state = {
  loadingState: false,
  dois: [],
  doiCount: 0
};

export default {
  state,
  getters,
  actions,
  mutations
};
