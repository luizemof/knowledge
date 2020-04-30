import { TOGGLE_MENU, USER_LOGGED } from './actionsType'
import { user_key } from '../global'

export function menuToggle(menuToggle) {
    return {
        type: TOGGLE_MENU,
        payload: {
            menuToggle
        }
    }
}

export function setUser(user) {
    if (user) {
        localStorage.setItem(user_key, JSON.stringify(user))
    }else {
        localStorage.removeItem(user_key)
    }

    return {
        type: USER_LOGGED,
        payload: { user }
    }
}