import { TOGGLE_MENU } from '../actions';

export default function menu(state, action) {
    switch (action.type) {
        case TOGGLE_MENU:
            return !state;

        default:
            return state;
    }
}