import axios from 'axios'

const initialState = {
    blorpz: []
}

const GET_BLORP = "GET_BLORP"

export function getBlorp(id) {

    let data = axios.get(`/api/blorp/${id}`).then(res => res.data)

    let action = {
        type: GET_BLORP,
        payload: data
    }
    return action

}

export default function blorpReducer(state = initialState, action) {
    // console.log(action)

    switch (action.type) {
        case GET_BLORP + '_FULFILLED':
            return { ...state, blorpz: action.payload }
        default:
            return state
    }

}