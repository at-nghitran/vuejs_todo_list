import Vue from 'vue'
import Vuex from 'vuex'
import todoAPI from '../services/todos'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    items: [],
    itemsLeft: 0,
    filterStatus: 'all',
    isDisabled: true
  },
  mutations: {
    countItem: function (state) {
      todoAPI.queryData('active').then((data) => {
        state.itemsLeft = data.length
      })
    },
    getListItems: function (state) {
      todoAPI.getListTodo().then((data) => {
        state.items = data
        this.commit('countItem')
        this.commit('checkDisabled')
      })
    },
    fillter: function (state) {
      if (state.filterStatus != 'all') {
        todoAPI.queryData(state.filterStatus).then(data => {
          state.items = data
          this.commit('checkDisabled')
        })
      } else {
        this.commit('getListItems')
      }
    },
    updateStatus: function (state, status) {
      state.filterStatus = status
    },
    checkDisabled: function (state) {
      todoAPI.queryData('completed').then((data) => {
        state.isDisabled = data.length > 0 ? true : false
      })
    }
  },
  getters: {
    items: state => state.items,
    filterStatus: state => state.filterStatus,
    isDisabled: state => state.isDisabled,
    itemsLeft: (state) => {
      return state.itemsLeft
    }
  }
})
export default store
