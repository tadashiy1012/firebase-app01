import { checkAuth } from './funcs';
const myStore = {
  state: {
    login: false
  },
  mutations: {
    muSetLogin: function(state, payload) {
      state.login = payload.newLoginState;
    }
  },
  getters: {
    getLogin: function(state) {
      return state.login
    }
  },
  actions: {
    setLogin: function({ commit }, payload) {
      return new Promise((resolve, reject) => {
        commit('muSetLogin', payload);
        resolve(true);
      });
    },
    asyncSetLogin: async function({ commit }) {
      const result = await checkAuth();
      return new Promise((resolve, reject) => {
        const payload = {newLoginState: !result ? false : true};
        console.log(payload);
        commit('muSetLogin', payload);
        resolve([true, result]);
      });
    }
  }
};

export default myStore;