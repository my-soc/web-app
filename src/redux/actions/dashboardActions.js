import * as types from '../constants';

export function searchDB(query) {
    return {
        type: types.SEARCH_DB,
        payload: query
    }
}
