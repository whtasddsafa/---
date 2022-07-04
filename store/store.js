import Vue from 'vue'
import Vuex from 'vuex'
import moduleUser from '@/store/user.js'

Vue.use(Vuex)
const store = new Vuex.Store({
	// state: {
	// 	address: {},
	// 	token: uni.getStorageSync('token') || ''
	// },
  modules: {
    'm_user': moduleUser
  }

	// mutations: {
    
	// 	UpdateAddress(state, address) {
	// 	  state.address = address
	// 	}
 //  }
})
export default store