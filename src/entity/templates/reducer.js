import { handleActions } from 'redux-actions';

import { <%= entityNameSnake %>_FETCH, <%= entityNameSnake %>_FETCH_SUCCESS, <%= entityNameSnake %>_FETCH_FAILURE } from '../actions/<%= entityNameCamel %>';
import { <%= entityNameSnake %>_ADD, <%= entityNameSnake %>_ADD_SUCCESS, <%= entityNameSnake %>_ADD_FAILURE } from '../actions/<%= entityNameCamel %>';
import { <%= entityNameSnake %>_REMOVE, <%= entityNameSnake %>_REMOVE_SUCCESS, <%= entityNameSnake %>_REMOVE_FAILURE } from '../actions/<%= entityNameCamel %>';

export default handleActions({
    [<%= entityNameSnake %>_FETCH]:         (state, action) => state.set('isFetching', true),
    [<%= entityNameSnake %>_FETCH_SUCCESS]: (state, action) => state.merge({'isFetching': false, items: action.payload}),
    [<%= entityNameSnake %>_FETCH_FAILURE]: (state, action) => state.set('isFetching', false),

    [<%= entityNameSnake %>_ADD]:         (state, action) => state.set('isFetching', true),
    [<%= entityNameSnake %>_ADD_SUCCESS]: (state, action) => state.merge({'isFetching': false, items: action.payload}),
    [<%= entityNameSnake %>_ADD_FAILURE]: (state, action) => state.set('isFetching', false),

    [<%= entityNameSnake %>_REMOVE]:         (state, action) => state.set('isFetching', true),
    [<%= entityNameSnake %>_REMOVE_SUCCESS]: (state, action) => state.merge({'isFetching': false, items: action.payload}),
    [<%= entityNameSnake %>_REMOVE_FAILURE]: (state, action) => state.set('isFetching', false)
})