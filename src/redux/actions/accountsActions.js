import * as types from '../constants';

export function handleAccountChange(event) {
    return {
        type: types.CHANGE_ACCOUNT,
        payload: {
            [event.target.name]: event.target.value
        }
    }
}
