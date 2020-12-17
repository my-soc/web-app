import * as types from '../constants'

const initialState = {
    connectors: null,
    commands: null,
    instances: null,
    loading: true,
    errors: {
        getConnectorsError: false,
        registerConnectorError: false,
        deleteConnectorError: false,
        addInstanceError: false,
        updateInstanceError: false,
        deleteInstanceError: false,
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
CRUD Connectors Reducers
*/
export const getConnectors = (state= initialState, action) => {
    let payload=action.payload
    return {
        ...state,
        connectors: payload.Connectors,
        commands: payload.Commands,
        instances: payload.Instances,
        loading:false,
        errors: {
            ...state.errors,
            getConnectorsError: false
        }
    }
}
export const getConnectorsFailed = (state= initialState) => {
    return {
        ...state,
        loading:false,
        errors: {
            ...state.errors,
            getConnectorsError: true
        }
    }
}
export const registerConnector = (state= initialState) => {
    return {
        ...state,
        loading:false,
        errors: {
            ...state.errors,
            registerConnectorError: false
        }
    }
}
export const registerConnectorFailed = (state= initialState) => {
    return {
        ...state,
        loading:false,
        errors: {
            ...state.errors,
            registerConnectorError: true
        }
    }
}
export const deleteConnector = (state= initialState,action) => {

    let id=action.payload
    return {
        ...state,
        connectors: state.connectors.filter((connector) => connector.ID !== id)
    }
}
export const deleteConnectorFailed = (state= initialState) => {
    return {
        ...state,
        loading:false,
        errors: {
            ...state.errors,
            deleteConnectorError:true
        }
    }
}


/*
CRUD Instances Reducers
*/
export const addInstance = (state= initialState, action) => {
    const updated_connectors = state.connectors.map(connector =>
        connector.ID === action.payload.connector
            ? {
                ...connector,
                Instances: connector.Instances.concat(action.payload.config)
            }
            : connector
    );
    return {
        ...state,
        connectors: updated_connectors,
        loading:false,
        errors: {
            ...state.errors,
            addInstanceError:false
        }
    }
}
export const addInstanceFailed = (state= initialState) => {
    return {
        ...state,
        loading:false,
        errors: {
            ...state.errors,
            addInstanceError: true
        }
    }
}
export const updateInstance = (state= initialState, action) => {
    const updated_connectors = state.connectors.map(connector =>
        connector.ID === action.payload.connector
            ? {
                ...connector,
                Instances: connector.Instances.map(instance =>
                instance.configName ===action.payload.instance
                ?
                    {
                        ...instance,
                        ...action.payload.instanceUpdates
                    }
                    : instance
                )
            }
            : connector
    );
    return {
        ...state,
        connectors: updated_connectors,
        loading:false,
        errors: {
            ...state.errors,
            updateInstanceError:false
        }
    }
}
export const updateInstanceFailed = (state= initialState) => {
    return {
        ...state,
        loading:false,
        errors: {
            ...state.errors,
            updateInstanceError: true
        }
    }
}
export const deleteInstance = (state= initialState, action) => {
    const updated_connectors = state.connectors.map(connector =>
        connector.ID === action.payload.connector
            ? {
                ...connector,
                Instances: connector.Instances.filter((instance) => instance.configName !== action.payload.instance)
             }
            : connector
    );
    return {
        ...state,
        connectors: updated_connectors,
        loading:false,
        errors: {
            ...state.errors,
            deleteInstanceError:false
        }
    }
}
export const deleteInstanceFailed = (state= initialState) => {
    return {
        ...state,
        loading:false,
        errors: {
            ...state.errors,
            deleteInstanceError:true
        }
    }
}


const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case types.CLEAR_ERROR: return clearError(state,action)
        case types.GET_CONNECTORS: return getConnectors( state,action)
        case types.GET_CONNECTORS_FAILED: return getConnectorsFailed(state)
        case types.DELETE_CONNECTOR: return deleteConnector(state,action)
        case types.DELETE_CONNECTOR_FAILED: return deleteConnectorFailed(state)
        case types.REGISTER_CONNECTOR_FAILED: return registerConnectorFailed(state)
        case types.ADD_INSTANCE: return addInstance( state,action )
        case types.ADD_INSTANCE_FAILED: return addInstanceFailed(state)
        case types.DELETE_INSTANCE: return deleteInstance(state,action)
        case types.DELETE_INSTANCE_FAILED: return deleteInstanceFailed(state)
        case types.UPDATE_INSTANCE: return updateInstance(state,action)
        case types.UPDATE_INSTANCE_FAILED: return updateInstanceFailed(state)
        default: return state
    }
}

export default reducer;