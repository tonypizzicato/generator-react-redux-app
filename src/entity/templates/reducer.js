import { handleActions } from 'redux-actions';

import { <%= entityNameSnake %>_FETCH, <%= entityNameSnake %>_FETCH_SUCCESS, <%= entityNameSnake %>_FETCH_FAILURE } from '../actions/<%= entityNameCamel %>';

export default handleActions({
    [<%= entityNameSnake %>_FETCH]:         (state, action) => state.set('isFetching', true),
    [<%= entityNameSnake %>_FETCH_SUCCESS]: (state, action) => state.merge({'isFetching': false, items: action.payload}),
    [<%= entityNameSnake %>_FETCH_FAILURE]: (state, action) => state.set('isFetching', false)
})