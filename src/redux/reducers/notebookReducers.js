import * as types from '../constants'

const initialState = {
    entries: null,
    loading: false,
    errors: {
        getEntriesError: false,
        postEntryError: false,
        deleteEntryError: false
    }
}

/*
UI Errors Reducers
*/
export const clearError = ( state = initialState, action) => {
    let error = action.payload
    return {
        ...state,
        loading:false,
        errors: {
            ...state.errors,
            [error]: false
        }
    }
}

/*
CRUD Entries Reducers
*/
export const getEntries = (state= initialState, action) => {
    let payload=action.payload
    return {
        ...state,
        entries: payload,
        loading:false,
        errors: {
            ...state.errors,
            getEntriesError: false
        }
    }
}
export const getEntriesFailed = (state= initialState) => {
    return {
        ...state,
        loading:false,
        errors: {
            ...state.errors,
            getEntriesError: true
        }
    }
}
export const postEntry = (state= initialState,action) => {
    console.log(action.payload)
    return {
        ...state,
        loading:false,
        errors: {
            ...state.errors,
            postEntryError: false
        }
    }
}
export const postEntryFailed = (state= initialState) => {
    return {
        ...state,
        loading:false,
        errors: {
            ...state.errors,
            postEntryError: true
        }
    }
}
export const deleteEntry = (state= initialState,action) => {
    let id=action.payload
    return {
        ...state,
        entries: state.entries.filter((entry) => entry.id !== id),
        loading:false,
        errors: {
            ...state.errors,
            deleteEntryError: false
        }
    }
}
export const deleteEntryFailed = (state= initialState) => {
    return {
        ...state,
        loading:false,
        errors: {
            ...state.errors,
            deleteEntryError: true
        }
    }
}


const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case types.CLEAR_ERROR: return clearError(state,action)
        case types.GET_ENTRIES: return getEntries( state, action )
        case types.GET_ENTRIES_FAILED: return getEntriesFailed(state)
        case types.DELETE_ENTRY: return deleteEntry(state, action)
        case types.DELETE_ENTRY_FAILED: return deleteEntryFailed(state)
        case types.POST_ENTRY: return postEntry(state, action)
        case types.POST_ENTRY_FAILED: return postEntryFailed(state)
        default: return state
    }
}

export default reducer;