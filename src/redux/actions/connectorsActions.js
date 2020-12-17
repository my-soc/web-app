import * as types from '../constants'
import axios from 'axios'

const apiUrl = 'http://localhost:8000/api'

/*
UI Errors Actions
*/
export const clearGetConnectorsError = () => {
    return {
        type: types.CLEAR_ERROR,
        payload: "getConnectorsError"
    }
}
export const clearRegisterConnectorError = () => {
    return {
        type: types.CLEAR_ERROR,
        payload: "registerConnectorError"
    }
}
export const clearDeleteConnectorError = () => {
    return {
        type: types.CLEAR_ERROR,
        payload: "deleteConnectorError"
    }
}
export const clearAddInstanceError = () => {
    return {
        type: types.CLEAR_ERROR,
        payload: "addInstanceError"
    }
}
export const clearUpdateInstanceError = () => {
    return {
        type: types.CLEAR_ERROR,
        payload: "updateInstanceError"
    }
}
export const clearDeleteInstanceError = () => {
    return {
        type: types.CLEAR_ERROR,
        payload: "deleteInstanceError"
    }
}

/*
CRUD Connectors Actions
*/
export const getConnectors = () => {

    const getConnectorsAction = (connectors) => {
        return {
            type: types.GET_CONNECTORS,
            payload: connectors
        }
    }

    const getConnectorsFailed = () => {
        return {
            type: types.GET_CONNECTORS_FAILED
        }
    }

    return (dispatch) => {
        return axios.get(`${apiUrl}/connectors`)
            .then(response => {
                dispatch(getConnectorsAction(response.data.payload))
            })
            .catch( error => {
                    console.log(error)
                    dispatch(getConnectorsFailed())
                }
            )
    }
}
export const uploadConnector = (file) => {

    const uploadConnectorAction = () => {
        return {
            type: types.REGISTER_CONNECTOR
        }
    }

    const uploadConnectorsFailed = () => {
        return {
            type: types.REGISTER_CONNECTOR_FAILED
        }
    }

    return (dispatch) => {
        let connector = new FormData()
        connector.append('connector',file[0])
        return axios.post(
            `${apiUrl}/connector/`,
            connector
        )
            .then(() => {
                dispatch(uploadConnectorAction())
                dispatch(getConnectors())
            })
            .catch( error => {
                    console.log(error)
                    dispatch(uploadConnectorsFailed())
                }
            )
    }
}
export const deleteConnector = (connector) => {

    const deleteConnectorAction = (connector) => {
        return {
            type: types.DELETE_CONNECTOR,
            payload: connector
        }
    }

    const deleteConnectorsFailed = () => {
        return {
            type: types.DELETE_CONNECTOR_FAILED
        }
    }

    return (dispatch) => {
        return axios.delete(`${apiUrl}/connector/${connector}`)
            .then(() => {
                dispatch(deleteConnectorAction(connector))
            })
            .catch( error => {
                    console.log(error)
                    dispatch(deleteConnectorsFailed())
                }
            )
    }
}

/*
CRUD Instances Actions
*/
export const addInstance = (connector,config) => {

    const addInstanceAction = (connector,config) => {
        return {
            type: types.ADD_INSTANCE,
            payload:{
                connector: connector,
                config: config
            }
        }
    }

    const addInstanceFailed = () => {
        return {
            type: types.ADD_INSTANCE_FAILED
        }
    }

    return (dispatch) => {
        return axios.post(
            `${apiUrl}/connectors/${connector}/config`,
            config
        )
            .then(() => {
                dispatch(addInstanceAction(connector,config))
            })
            .catch( error => {
                    console.log(error)
                    dispatch(addInstanceFailed())
                }
            )
    }

}
export const updateInstance = (connector,instance,instanceUpdates) => {

    const updateInstanceAction = (connector,instance,instanceUpdates) => {
        return {
            type: types.UPDATE_INSTANCE,
            payload:{
                connector: connector,
                instance: instance,
                instanceUpdates: instanceUpdates
            }
        }
    }

    const updateInstanceFailed = () => {
        return {
            type: types.UPDATE_INSTANCE_FAILED
        }
    }

    return (dispatch) => {
        return axios.put(
            `${apiUrl}/connectors/${connector}/config/${instance}`,
            instanceUpdates
        )
            .then(() => {
                dispatch(updateInstanceAction(connector,instance,instanceUpdates))
            })
            .catch( error => {
                    console.log(error)
                    dispatch(updateInstanceFailed())
                }
            )
    }

}
export const deleteInstance = (connector,instance) => {

    const deleteInstanceAction = (connector,instance) => {
        return {
            type: types.DELETE_INSTANCE,
            payload:{
                connector: connector,
                instance: instance
            }
        }
    }

    const deleteInstanceFailed = () => {
        return {
            type: types.DELETE_INSTANCE_FAILED
        }
    }

    return (dispatch) => {
        return axios.delete(`${apiUrl}/connectors/${connector}/config/${instance}`)
            .then(() => {
                dispatch(deleteInstanceAction(connector,instance))
            })
            .catch( error => {
                    console.log(error)
                    dispatch(deleteInstanceFailed())
                }
            )
    }

}

