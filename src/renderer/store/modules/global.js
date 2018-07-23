const state = {
  id: '',
  synchronizing: false
}

const mutations = {
  GLOBAL_ID (state, data) {
    state.id = data
  },
  SYNC (state, data) {
    state.synchronizing = data
  }
}

const actions = {
  globalId ({ commit }, data) {
    return new Promise((resolve, reject) => {
      commit('GLOBAL_ID', data)
      resolve(data)
    })
  },
  isSynchronizing ({ commit }, data) {
    commit('SYNC', data)
  }
}

export default {
  state,
  mutations,
  actions
}
