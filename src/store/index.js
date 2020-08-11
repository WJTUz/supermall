import Vue from 'vue'
import VueX from 'vuex'

Vue.use(VueX)

const store = new VueX.Store({
  state: {
    homeCurrentIndex: 0,
    homeCurrentType: 'pop'
  },
  mutations: {
    changeCurrentType(state, type) {
      state.homeCurrentType = type
    },
    changeCurrentIndex(state, index) {
      state.homeCurrentIndex = index
    }
  }
})

export default store
