import getters from "./getters";
import actions from "./actions";
import mutations from "./mutations";

const state = {
  loadingState: false,
  doi: null,
  doiAttachments: [],
  doiAgents: [],
  doiDates: [],
  doiGeolocations: [],
  doiRelatedIdentifiers: [],
  doiEgfFiles: [],
  dois: [],
  doiCount: 0
};

export default {
  state,
  getters,
  actions,
  mutations
};
