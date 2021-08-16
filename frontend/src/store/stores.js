// import { csrfFetch } from './csrf';

import { csrfFetch } from "./csrf";


const GET_STORES = 'stores/setStores';
const UPDATE_STORE = 'stores/updateStore';
const DELETE_STORE = 'stores/deleteStore';

const setStores = (stores) => ({
    type: GET_STORES,
    payload: stores
})

const updateStore = (store) => ({
    type: UPDATE_STORE,
    payload: store
})

const deleteStore = (store) => ({
    type: DELETE_STORE,
    payload: store
})

export const getStores = () => async dispatch => {
    const res = await csrfFetch('/api/stores');

    const data = await res.json();
    dispatch(setStores(data.stores))
};




const initialState = { stores: null };


const storesReducer = (state = initialState, action) => {

    switch (action.type) {
        case GET_STORES:
            const newState = { ...action.payload };
            return newState;
        default:
            return state;
    }
}

export default storesReducer;
