import {Map, List} from 'immutable';

import routerStateReducer from 'redux-router/lib/routerStateReducer';

import menu from './reducers/menu';

import { INITIALIZE } from './actions';
import { TOGGLE_MENU } from './actions';

/**
 * TODO: fix router initial state
 * @author tony.pizzicato
 * @date 08.01.16
 * @time 18:39
 */

export const INITIAL_STATE = Map({
    router:      {routes: [], params: {}, location: {query: {q: ''}}, components: []},
    initialized: false,
    menuOpened:  false
});

/**
 *
 * TODO: compose reducers with multiple files
 * @author tony.pizzicato
 * @date 06.01.16
 * @time 17:54
 *
 *
 * Main application reducer function.
 *
 * It handles actions and mutate app state according to handled action type if specific reducer is defined
 * Read more about reducers: {@link http://rackt.org/redux/docs/basics/Reducers.html}
 *
 * @param {Object} state Current app state
 * @param {Object} action Currently processing action
 *
 * @returns {Object} New app state
 */
const reducer = function (state = INITIAL_STATE, action) {
    return state.merge({
        router:      routerStateReducer(state.get('router'), action),
        initialized: true,
        menuOpened:  menu(state.get('menuOpened'), action)
    });
}

export default reducer;

