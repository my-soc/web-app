import * as types from '../constants'
import axios from 'axios'

const apiUrl = 'http://localhost:8000/api'

/*
UI Errors Actions
*/
export const clearGetEntriesError = () => {
    return {
        type: types.CLEAR_ERROR,
        payload: "getEntriesError"
    }
}
export const clearPostEntryError = () => {
    return {
        type: types.CLEAR_ERROR,
        payload: "postEntryError"
    }
}
export const clearDeleteEntryError = () => {
    return {
        type: types.CLEAR_ERROR,
        payload: "deleteEntryError"
    }
}

/*
CRUD Connectors Actions
*/
export const getEntries = () => {

    const getEntriesAction = (entries) => {

        return {
            type: types.GET_ENTRIES,
            payload: entries.data
        }
    }

    const getEntriesFailed = () => {
        return {
            type: types.GET_ENTRIES_FAILED
        }
    }

    return (dispatch) => {
        return axios.get(`${apiUrl}/notebook/entries`)
            .then(response => {
                dispatch(getEntriesAction(response.data.payload))
            })
            .catch( error => {
                    console.log(error)
                    dispatch(getEntriesFailed())
                }
            )
    }
}
export const deleteEntry = (entry) => {

    const deleteEntryAction = (entry) => {
        return {
            type: types.DELETE_ENTRY,
            payload: entry
        }
    }

    const deleteEntryFailed = () => {
        return {
            type: types.DELETE_ENTRY_FAILED
        }
    }

    return (dispatch) => {
        return axios.delete(`${apiUrl}/notebook/${entry}`)
            .then(() => {
                dispatch(deleteEntryAction(entry))
            })
            .catch( error => {
                    console.log(error)
                    dispatch(deleteEntryFailed())
                }
            )
    }
}
export const postEntry = (entry) => {

    const postEntryAction = (response) => {
        console.log(response)
        return {
            type: types.POST_ENTRY,
            payload: response
        }
    }

    const postEntryFailed = () => {
        return {
            type: types.POST_ENTRY_FAILED
        }
    }

    return (dispatch) => {
            fetch(`${apiUrl}/notebook/entry`, {
                method: "POST",
                body: JSON.stringify(entry),
                mode: 'no-cors'
            })
            .then(response => {
                dispatch(postEntryAction(response.data.payload))
            })
            .catch( error => {
                console.log(error)
                dispatch(postEntryFailed())
                }
            )
    }
}





