// import { csrfFetch } from './csrf';


const GET_STORES = 'stores/getStores';
const UPDATE_STORE = 'stores/updateStore';
const DELETE_STORE = 'stores/deleteStore';

const getStores = () => ({
    type: GET_STORES,
})

const updateStore = (store) => ({
    type: UPDATE_STORE,
    payload: store
})

const deleteStore = (store) => ({
    type: DELETE_STORE,
    payload: store
})





const initialState = { stores: null };


const storesReducer = (state = initialState, action) => {

    switch (action.type) {
        default:
            return state;
    }
}

export default storesReducer;
