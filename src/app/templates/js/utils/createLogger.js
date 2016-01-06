import Immutable from 'immutable';
import createLogger from 'redux-logger';

export default createLogger({
    duration:          true,
    predicate:         () => process.env.NODE_ENV === `development`,
    actionTransformer: action => {
        let newAction = {};

        for (let i of Object.keys(action)) {
            newAction[i] = JSON.stringify(action[i]);
        }

        return newAction;
    },
    stateTransformer:  state => {
        if (Immutable.Map.isMap(state) || Immutable.List.isList(state)) {
            state = state.toJS();
        }

        return state;
    }
});