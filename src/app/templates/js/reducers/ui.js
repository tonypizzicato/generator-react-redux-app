import { handleActions } from 'redux-actions';

import { UI_TOGGLE_MENU } from '../actions/ui';

export default handleActions({
    [UI_TOGGLE_MENU]: (state, action) => state.set('menuOpened', !state.get('menuOpened'))
});