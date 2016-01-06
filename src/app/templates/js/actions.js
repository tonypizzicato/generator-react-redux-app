import { createAction } from 'redux-actions';

/** App initialized action */
export const INITIALIZE = 'INITIALIZE';

/**
 *
 * TODO: compose actions with multiple files
 * @author Tony Pizzicato
 * @date 06.01.16
 * @time 17:54
 *
 *
 * Application actions, that can mutate app state.
 * Action is just a plain object with type and [optional] payload.
 *
 * @example
 * const myAction = {
 * .."type": 'INITIALIZE_APP',
 * .."payload": {
 * ....."initialized": true
 * ..}
 * }
 *
 * When object of this action is emitted, it can be handled by reducer by actions type.
 * Such reducer can mutate the state of an app according to action type or payload if needed.
 *
 * Actions here are generated with {@link https://github.com/acdlite/redux-actions redux-actions lib }
 * More about actions: {@link http://rackt.org/redux/docs/basics/Actions.html Actions}
 */
const actions = {
    initialize: createAction(INITIALIZE)
};

export default actions;