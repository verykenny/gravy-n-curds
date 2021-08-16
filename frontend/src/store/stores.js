// import { csrfFetch } from './csrf';

import { csrfFetch } from "./csrf";


const GET_STORES = 'stores/setStores';
const ADD_STORE = 'stores/addStore';
const DELETE_STORE = 'stores/deleteStore';

const setStores = (stores) => ({
    type: GET_STORES,
    payload: stores
});

const addStore = (store) => ({
    type: ADD_STORE,
    payload: store
});

const deleteStore = (storeId) => ({
    type: DELETE_STORE,
    payload: storeId
});

export const getStores = () => async dispatch => {
    const res = await csrfFetch('/api/stores');
    const data = await res.json();
    dispatch(setStores(data.stores));
};

export const createStore = (name, imageUrl) => async dispatch => {
    const res = await csrfFetch('/api/stores', {
        method: 'POST',
        body: JSON.stringify({ name, imageUrl })
    })
    const data = await res.json();
    dispatch(addStore(data.store));
};


export const removeStore = (storeId) => async dispatch => {
    await csrfFetch(`/api/stores/${storeId}`);
    dispatch(deleteStore(storeId));
}



const initialState = {};


const storesReducer = (state = initialState, action) => {
    Object.freeze(state);
    let newState = { ...state };
    switch (action.type) {
        case GET_STORES:
            return newState;
        case ADD_STORE:
            return newState;
        case DELETE_STORE:
            return newState;
        default:
            return state;
    }
};

export default storesReducer;
