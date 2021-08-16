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

const deletePoutine = (poutineId) => ({
    type: DELETE_POUTINE,
    payload: poutineId
});

export const getPoutines = () => async dispatch => {
    const res = await csrfFetch('/api/poutines');
    const data = await res.json();
    dispatch(setPoutines(data.poutines));
};






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
