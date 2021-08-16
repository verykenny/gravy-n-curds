import { csrfFetch } from "./csrf";

const SET_POUTINES = 'poutines/setPoutines';
const ADD_POUTINE = 'poutines/addPoutine';
const DELETE_POUTINE = 'poutines/deletePoutine'

const setPoutines = (poutines) => ({
    type: SET_POUTINES,
    payload: poutines
});

const addPoutine = (poutine) => ({
    type: ADD_POUTINE,
    payload: poutine
});

// const deletePoutine = (poutineId) => ({
//     type: DELETE_POUTINE,
//     payload: poutineId
// });

export const getPoutines = () => async dispatch => {
    const res = await csrfFetch('/api/poutines');
    const data = await res.json();
    dispatch(setPoutines(data.poutines));
};

export const createPoutine = (name, imageURL, description, storeId) => async dispatch => {
    const res = await fetch(`/api/stores/${storeId}/poutines`, {
        method: 'POST',
        body: JSON.stringify({ name, imageURL, description })
    })
    const data = await res.json();
    dispatch(addPoutine(data.poutine))
}





const initialState = {};

const poutinesReducer = (state = initialState, action) => {
    Object.freeze(state);
    let newState = { ...state };
    switch (action.type) {
        case SET_POUTINES:
            action.payload.forEach(poutine => {
                newState[poutine.id] = poutine
            })
            return newState;
        case ADD_POUTINE:
            newState[action.payload.id] = action.payload;
            return newState;
        default:
            return state;
    }
};

export default poutinesReducer;
