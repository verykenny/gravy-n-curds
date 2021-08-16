import { csrfFetch } from './csrf';





const initialState = { store: null };


const storeReducer = (state = initialState, action) => {

    switch (action.type) {
        default:
            return state;
    }
}

export default storeReducer;
