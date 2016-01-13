import { API_CALL } from '../middlewares/fetchMiddleware';

export const <%= entityNameSnake %>_FETCH         = '<%= entityNameSnake %>_FETCH';
export const <%= entityNameSnake %>_FETCH_SUCCESS = '<%= entityNameSnake %>_FETCH_SUCCESS';
export const <%= entityNameSnake %>_FETCH_FAILURE = '<%= entityNameSnake %>_FETCH_FAILURE';

function fetch() {
    return {
        [API_CALL]: {
            types:    [<%= entityNameSnake %>_FETCH, <%= entityNameSnake %>_FETCH_SUCCESS, <%= entityNameSnake %>_FETCH_FAILURE],
            endpoint: '<%= remotePath %>',
            method:   'GET'
        }
    }
}

export default {
    fetch
}