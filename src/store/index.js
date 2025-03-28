import { createStore } from 'vuex'

export default createStore({
  state: {
    user: null,
  },
  getters: {
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },
    CLEAR_USER(state) {
      state.user = null;
    }

  },
  actions: {
    async login({ commit }, udetails) {
      // Login code here
    },
    async register({ commit }, udetails) {
      // Register code here
    },
    async logout({ commit }) {
      // Logout code here
    },

  },

  modules: {
  }
})
