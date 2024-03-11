import { DONE, GET_MODULES_SUCCESS, LOADING, SAVE_METAMASK_FAILED, SAVE_METAMASK_SUCCESS } from "./type"

export const API_URL = 'http://127.0.0.1:8000'

export const saveTransaction = async (payType: string, amount: number, destinationAddress: string, txHash: string) => {
    const body = JSON.stringify(
        {
            payType,
            amount,
            destinationAddress,
            txHash,
        })

    try {

        // const token = window.localStorage.getItem('token');

        const res = await fetch(`${API_URL}/api/data-analysis/saveTransaction/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: body
        })

        const data = await res.json()

    }
    catch (e) {

        // dispatch({ type: SAVE_TRANSACTION_FAILED })
    }
}

export const saveMetaMaskAddress = (address: string) => async (dispatch: any) => {

    const body = JSON.stringify(
        {
            address
        }
    )

    dispatch({ type: LOADING })

    // dispatch({ type: SAVE_METAMASK_SUCCESS, payload: address })

    try { // const token = window.localStorage.getItem('token');

        const res = await fetch(`${API_URL}/saveMetamask/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: body
        })

        const data = await res.json()

        if (data.user_id) {
            dispatch({ type: SAVE_METAMASK_SUCCESS, payload: address })
        }

        dispatch({ type: DONE })

    }
    catch (e) {

        dispatch({ type: SAVE_METAMASK_FAILED })
        dispatch({ type: DONE })

    }

}

export const getModules = () => async (dispatch: any) => {
    try {

        // const token = window.localStorage.getItem('token');

        const res = await fetch(`${API_URL}/files`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        })

        const data = await res.json()

        if (data) {
            dispatch({ type: GET_MODULES_SUCCESS, payload: data })
        }
    }
    catch (e) {

        // dispatch({ type: SAVE_TRANSACTION_FAILED })
    }
}
