const accountsInitialState = {
    anchorEl: null,
    account: "Account1",
    labelWidth: 0
}

export default function accountsReducer(state, action) {

    switch (action.type) {
        case "CHANGE_ACCOUNT":
            let payload=action.payload
            return {
                ...state,
                ...payload
            }
        default:
            return {
                ...state,
                ...accountsInitialState
            }
    }
}

