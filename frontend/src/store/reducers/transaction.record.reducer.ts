import { SAVE_TRANSACTION_SUCCESS, SAVE_TRANSACTION_FAILED, UPLOAD_NEW_FILE_SUCCESS, SAVE_METAMASK_SUCCESS, GET_MODULES_SUCCESS } from "../action/type";

const initialState = {
    records: {},
    loading: false,
    error: '',
    fileId: '',
    address: '',
    loginStatus: false,
    models: []
}

const transactionReducer = (state = initialState, action: any) => {

    const { type, payload } = action

    switch (type) {
        case SAVE_TRANSACTION_FAILED:
            return {
                ...state,
                error: payload
            }
        case SAVE_TRANSACTION_SUCCESS:
            return {
                ...state,
                records: payload
            }
        case UPLOAD_NEW_FILE_SUCCESS:
            return {
                ...state,
                fileId: payload
            }
        case SAVE_METAMASK_SUCCESS:
            return {
                ...state,
                address: payload,
                loginStatus: true
            }
        case GET_MODULES_SUCCESS:
            return {
                ...state,
                models: payload
            }
        default:
            return state
    }

}

export default transactionReducer;
