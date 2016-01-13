require('whatwg-fetch');
import createAction from 'redux-actions/lib/createAction';

export const API_CALL = Symbol('API Call');

const API_ROOT = 'http://localhost:3008/api';

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response
    } else {
        const error    = new Error(response.statusText);
        error.response = response;

        throw error
    }
}

// Fetches an API response and normalizes the result JSON according to schema.
// This makes every API response have the same shape, regardless of how nested it was.
function callApi(endpoint, method = 'get', body = {}) {
    //const fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint;
    let fullUrl = endpoint;

    const params = {method};
    if (['post', 'put'].indexOf(method.toLowerCase()) > -1) {
        params.body    = JSON.stringify(body);
        params.headers = {
            'Accept':       'application/json',
            'Content-Type': 'application/json'
        }
    } else {
        if (Object.keys(body).length) {
            const params = Object.keys(body).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(body[key])).join('&');

            fullUrl = `${fullUrl}?${params}`;
        }
    }

    return fetch(fullUrl, params)
        .then(checkStatus)
        .then(response => response.json().then(json => ({json, response})))
        .then(({ json, response }) => {
            if (!response.ok) {
                return Promise.reject(json);
            }

            return json;
        });
}


export default store => next => action => {
    const apiCall = action[API_CALL];

    if (typeof apiCall === 'undefined') {
        return next(action)
    }

    let { endpoint, method, types } = apiCall;

    if (typeof endpoint !== 'string') {
        throw new Error('Specify a string endpoint URL.');
    }

    if (!Array.isArray(types) || types.length !== 3) {
        throw new Error('Expected an array of three action types.');
    }
    if (!types.every(type => typeof type === 'string')) {
        throw new Error('Expected action types to be strings.');
    }

    const [ requestType, successType, failureType ] = types;

    next(createAction(requestType)());

    return callApi(endpoint, method, action.payload).then(
        response => {
            return next(createAction(successType)(response))
        },
        error => {
            return next(createAction(failureType)(error.message || 'Something bad happened'))
        }
    );
}