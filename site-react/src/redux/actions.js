import { TOGGLE_MENU, USER_LOGGED } from './actionsType'

export function menuToggle(menuToggle) {
    return {
        type: TOGGLE_MENU,
        payload: {
            menuToggle
        }
    }
}

export function setUser(user) {
    return {
        type: USER_LOGGED,
        payload: { user }
    }
}