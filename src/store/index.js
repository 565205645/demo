import { createStore } from 'vuex'
import { one } from './module'
export default createStore({
  state: {
    fn:'',
    num:10,
    name:'张三',
    age:100,
    obj:{
      name:'李四',
      job:'偷吃'
    }
  },
  getters: {
  },
  mutations: {
    DEPOSIT_FN(state,fun){
      state.fn = fun
    }
  },
  actions: {
  },
  modules: {
    one
  }
})
