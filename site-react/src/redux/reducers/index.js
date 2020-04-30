import { combineReducers } from 'redux'
import { TOGGLE_MENU, USER_LOGGED } from '../actionsType'

const menuToggle = function (state = { menuToggle: false }, action) {
    switch (action.type) {
        case TOGGLE_MENU:
            return {
                ...state,
                menuToggle: action.payload.menuToggle
            }
        default:
            return { ...state }
    }
}

const userLogged = function (state = { user: null }, action) {
    switch (action.type) {
        case USER_LOGGED:
            return {
                ...state,
                user: { ...action.payload.user }
            }
        default:
            return { ...state }
    }
}

export default combineReducers({ menuToggle, userLogged })