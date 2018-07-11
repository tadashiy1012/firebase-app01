import { execFetchDb, checkAuth } from './../funcs';

const db = {
  namespaced: true,
  state: {
    snapshot: ['hoge']
  },
  mutations: {
    muSetSnapshot: function(state, payload) {
      state.snapshot = payload.newSnapshot;
    }
  },
  getters: {
    getSnapshot: function(state) {
      return state.snapshot;
    }
  },
  actions: {
    setSnapshot: function({commit}, newSnapshot) {
      return new Promise((resolve, reject) => {
        const payload = { newSnapshot };
        commit('muSetSnapshot', payload);
        resolve(true);
      });
    }
  }
};

export default db;