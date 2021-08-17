import { csrfFetch } from "./csrf";

const SET_CHECKINS = 'checkins/setCheckins';

const setCheckins = (checkins) => ({
    type: SET_CHECKINS,
    payload: checkins
});


export const getCheckins = () => async dispatch => {
    const res = await csrfFetch('/api/checkins');
    const data = await res.json();
    dispatch(setCheckins(data.checkins));


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
        default:
            return state;
    }
};

export default checkinsReducer;
