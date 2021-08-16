import { csrfFetch } from "./csrf";




const initialState = {};

const poutinesReducer = (state = initialState, action) => {
    Object.freeze(state);
    let newState = { ...state };
    switch (action.type) {
        default:
            return state;
    }
};

export default poutinesReducer;
