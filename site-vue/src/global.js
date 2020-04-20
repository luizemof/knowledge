import Vue from 'vue'

const baseUrl = 'http://localhost:3000'
const categoriesUrl = `${baseUrl}/categories`
const usersUrl = `${baseUrl}/users`
const articlesUrl = `${baseUrl}/articles`

const userKey = '__knowledge_user'

export function showError(e) {
    if(e && e.response && e.response.data) {
        Vue.toasted.global.defaultError({ msg : e.response.data })
    } else if(typeof e === 'string') {
        Vue.toasted.global.defaultError({ msg : e })
    } else {
        Vue.toasted.global.defaultError()
    }
}


export { baseUrl, categoriesUrl, usersUrl, articlesUrl, userKey }