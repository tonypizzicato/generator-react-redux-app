import {Map, List} from 'immutable';

import { INITIALIZE } from './actions';

const INITIAL_STATE = Map({
    initialized: false
});

/**
 *
 * TODO: compose reducers with multiple files
 * @author Tony Pizzicato
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
    return Map({
        initialized: true
    });
}

export default reducer;

