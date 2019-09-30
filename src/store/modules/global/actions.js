const actions = {
  logDrawerRightState({ commit }, state) {
    commit("LOG_DRAWER_RIGHT_STATE", { drawerRightState: state });
  }
};

export default actions;
