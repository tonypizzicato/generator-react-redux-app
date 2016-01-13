import {createAction} from 'redux-actions';

export const UI_TOGGLE_MENU = 'UI_TOGGLE_MENU';

const toggleMenu = createAction(UI_TOGGLE_MENU);

export default {
    toggleMenu
};