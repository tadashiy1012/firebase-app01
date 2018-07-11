const db = {
  namespaced: true,
  state: {
    hoge: 'hoge',
    snapshot: null
  },
  mutations: {
    muSetSnapshot: function(state, payload) {
      state.snapshot = payload.newSnapshot;
    }
  },
  getters: {
    getHoge: function(state) {
      return state.hoge;
    },
    getSnapshot: function(state) {
      return state.snapshot;
    }
  },
  actions: {
    aysncSetSnapshot: async function({commit}) {
      
    }
  }
};

export default db;