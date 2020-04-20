import { combineReducers } from 'redux'
import { TOGGLE_MENU } from '../actionsType'

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

export default combineReducers({ menuToggle })