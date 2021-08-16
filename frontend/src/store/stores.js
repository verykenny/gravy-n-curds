// import { csrfFetch } from './csrf';

import { csrfFetch } from "./csrf";


const SET_STORES = 'stores/setStores';
const ADD_STORE = 'stores/addStore';
const DELETE_STORE = 'stores/deleteStore';

const setStores = (stores) => ({
    type: SET_STORES,
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

export const updateStore = (name, imageUrl, storeId) => async dispatch => {
    const res = await csrfFetch(`/api/stores/${storeId}`, {
        method: 'PUT',
        body: JSON.stringify({ name, imageUrl })
    })
    const data = await res.json();
    dispatch(addStore(data.store));
};


export const removeStore = (storeId) => async dispatch => {
    await csrfFetch(`/api/stores/${storeId}`, {
        method: 'DELETE',
    });
    dispatch(deleteStore(storeId));
}



const initialState = {};


const storesReducer = (state = initialState, action) => {
    Object.freeze(state);
    let newState = { ...state };
    switch (action.type) {
        case SET_STORES:
            action.payload.forEach(store => {
                newState[store.id] = store
            })
            return newState;
        case ADD_STORE:
            newState[action.payload.id] = action.payload;
            return newState;
        case DELETE_STORE:
            delete newState[action.payload];
            return newState;
        default:
            return state;
    }
};

export default storesReducer;
