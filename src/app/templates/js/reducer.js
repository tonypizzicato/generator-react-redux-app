import { handleActions } from 'redux-actions';

import { routeReducer } from 'redux-simple-router';

import INITIAL_STATE from '../../config/state.json';

import uiReducer from './reducers/ui';
/** inject:reducer-import */

/**
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
const reducer = function (state = fromJS(INITIAL_STATE), action) {
    return state.merge({
        routing: routeReducer(state.get('routing').toJS(), action),

        ui: uiReducer(state.get('ui'), action),
        /** inject:reducer */
    });
}

export default reducer;

