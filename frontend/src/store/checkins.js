import { csrfFetch } from "./csrf";

const SET_CHECKINS = 'checkins/setCheckins';
const ADD_CHECKIN = 'checkins/addCheckin';
const DELETE_CHECKIN = 'checkins/deleteCheckin'

const setCheckins = (checkins) => ({
    type: SET_CHECKINS,
    payload: checkins
});

const addCheckin = (checkin) => ({
    type: ADD_CHECKIN,
    payload: checkin,
});

const deleteCheckin = (checkinId) => ({
    type: DELETE_CHECKIN,
    payload: checkinId
})


export const getCheckins = () => async dispatch => {
    const res = await csrfFetch('/api/checkins');
    const data = await res.json();
    dispatch(setCheckins(data.checkins));
};

export const createCheckin = (comment, rating, poutineId) => async dispatch => {
    const res = await csrfFetch(`/api/poutines/${poutineId}/checkins`, {
        method: 'POST',
        body: JSON.stringify({ comment, rating })
    })
    const data = await res.json();
    dispatch(addCheckin(data.checkin))
}

export const updateCheckin = (comment, rating, checkinId) => async dispatch => {
    const res = await csrfFetch(`/api/checkins/${checkinId}`, {
        method: 'PUT',
        body: JSON.stringify({ comment, rating })
    })
    const data = await res.json();
    dispatch(addCheckin(data.checkin));
}

export const removeCheckin = (checkinId) => async dispatch => {
    await csrfFetch(`/api/checkins/${checkinId}`, {
        method: 'DELETE'
    })
    dispatch(deleteCheckin(checkinId))
}

const initialState = {};

const checkinsReducer = (state = initialState, action) => {
    Object.freeze(state);
    let newState = { ...state };
    switch (action.type) {
        case SET_CHECKINS:
            action.payload.forEach(checkin => {
                newState[checkin.id] = checkin
            })
            return newState;
        case ADD_CHECKIN:
            newState[action.payload.id] = action.payload;
            return newState;
        case DELETE_CHECKIN:
            delete newState[action.payload];
            return newState;
        default:
            return state;
    }
};

export default checkinsReducer;
