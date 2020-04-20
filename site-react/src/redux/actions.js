import { TOGGLE_MENU } from './actionsType'

export function menuToggle(menuToggle) {
    return {
        type: TOGGLE_MENU,
        payload: {
            menuToggle
        }
    }
}