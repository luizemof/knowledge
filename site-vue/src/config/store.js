import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { userKey } from '@/global'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        isMenuVisible: false,
        user: null
    },
    mutations: {
        toggleMenu(state, isVisible) {
            if (isVisible === undefined) {
                state.isMenuVisible = !state.isMenuVisible
            } else {
                state.isMenuVisible = isVisible
            }
        },
        setUser(state, user) {
            state.user = user
            if (state.user) {
                localStorage.setItem(userKey, JSON.stringify(state.user))
                state.isMenuVisible = true
                axios.defaults.headers.common['Authorization'] = `bearer ${user.token}`
            } else {
                localStorage.removeItem(userKey)
                state.isMenuVisible = false
                axios.defaults.headers.common['Authorization'] = ''
            }
        }
    }
})