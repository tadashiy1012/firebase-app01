import { execFetchDb, execPushDb, checkAuth } from './../fbFuncs';

const initSS = {};

const db = {
  namespaced: true,
  state: {
    snapshot: Object.assign({}, initSS)
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
    },
    fetchSnapshot: async function({commit}) {
      const auth = await checkAuth();
      let ss = Object.assign({}, initSS);
      if (auth) {
        const fetched = await execFetchDb();
        ss = Object.assign({}, fetched.val());
      }
      return new Promise((resolve, reject) => {
        console.log(ss);
        commit('muSetSnapshot', {newSnapshot: ss});
        resolve(true);
      });
    },
    pushData: async function({}, tgtData) {
      const auth = await checkAuth();
      const result = auth ? await execPushDb(tgtData) : null;
      return new Promise((resolve, reject) => {
        console.log(result);
        resolve(true);
      });
    }
  }
};

export default db;