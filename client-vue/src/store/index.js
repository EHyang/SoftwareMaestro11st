import { createStore } from 'vuex'

const types = {
  STATISTICS: 'STATISTICS',
}

const 

export default createStore({
  state: {
    total: 0
  },
  mutations: {

  },
  actions: {
    addTotal({state, commit}, {type, name}){
      commit(types.STATISTICS, {
        type,
        name,
      })
    }
  },
  modules: {
  }
})
