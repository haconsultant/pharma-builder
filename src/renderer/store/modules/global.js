const state = {
  id: '',
  synchronizing: false,
  hasConfig: false
}

const mutations = {
  GLOBAL_ID (state, data) {
    state.id = data
  },
  SYNC (state, data) {
    state.synchronizing = data
  },
  HAS_CONFIG (state, data) {
    state.hasConfig = data
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
  },
  hasConfig ({ commit }, data) {
    console.log(data)
    commit('HAS_CONFIG', data)
  }
}

export default {
  state,
  mutations,
  actions
}
