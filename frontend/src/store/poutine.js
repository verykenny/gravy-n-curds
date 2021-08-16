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

export const createPoutine = (name, imageUrl, description, storeId) => async dispatch => {
    const res = await csrfFetch(`/api/stores/${storeId}/poutines`, {
        method: 'POST',
        body: JSON.stringify({ name, imageUrl, description })
    })
    const data = await res.json();
    dispatch(addPoutine(data.poutine))
}

export const updatePoutine = (name, imageUrl, description, poutineId) => async dispatch => {
    try {
        const res = await csrfFetch(`/api/poutines/${poutineId}`, {
            method: 'PUT',
            body: JSON.stringify({ name, imageUrl, description })
        })

        const data = await res.json();

        dispatch(addPoutine(data.poutine))

    } catch (e) {
        const error = await e.json()
        console.log(error);
    }
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
            console.log(action.payload);
            newState[action.payload.id] = action.payload;
            return newState;
        default:
            return state;
    }
};

export default poutinesReducer;
