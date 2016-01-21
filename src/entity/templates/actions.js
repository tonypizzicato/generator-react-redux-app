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

export const <%= entityNameSnake %>_ADD         = '<%= entityNameSnake %>_ADD';
export const <%= entityNameSnake %>_ADD_SUCCESS = '<%= entityNameSnake %>_ADD_SUCCESS';
export const <%= entityNameSnake %>_ADD_FAILURE = '<%= entityNameSnake %>_ADD_FAILURE';

function add() {
    return {
        [API_CALL]: {
            types:    [<%= entityNameSnake %>_ADD, <%= entityNameSnake %>_ADD_SUCCESS, <%= entityNameSnake %>_ADD_FAILURE],
            endpoint: `<%= remotePath %>`,
            method:   'PUT'
        }
    }
}

export const <%= entityNameSnake %>_REMOVE         = '<%= entityNameSnake %>_REMOVE';
export const <%= entityNameSnake %>_REMOVE_SUCCESS = '<%= entityNameSnake %>_REMOVE_SUCCESS';
export const <%= entityNameSnake %>_REMOVE_FAILURE = '<%= entityNameSnake %>_REMOVE_FAILURE';

function remove(id) {
        return {
        [API_CALL]: {
            types:    [<%= entityNameSnake %>_REMOVE, <%= entityNameSnake %>_REMOVE_SUCCESS, <%= entityNameSnake %>_REMOVE_FAILURE],
            endpoint: `<%= remotePath %>/${id}`,
            method:   'DELETE'
        }
    }
}

export default {
    fetch,
    add,
    remove
}