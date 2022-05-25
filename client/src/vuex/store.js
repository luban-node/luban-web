import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        user: '' || sessionStorage.getItem('user'),
    },
    getters: {
        user: (state) => state.user && JSON.parse(state.user)
    },
    mutations: {
        setUser(state, user) {
            user = JSON.stringify(user)
            sessionStorage.setItem('user', user)
            state.user = user
        },
        deleteUser(state) {
            sessionStorage.removeItem('user')
            state.user = ''
        }
    }
})

export default store