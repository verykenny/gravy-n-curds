import { csrfFetch } from './csrf';

const SET_CHECKINS = 'checkins/setCheckins';
const ADD_CHECKIN = 'checkins/addCheckin';
const DELETE_CHECKIN = 'checkins/deleteCheckin';

const setCheckins = (publicCheckins, privateCheckins) => ({
    type: SET_CHECKINS,
    payload: {
        public: publicCheckins,
        private: privateCheckins
    },
});

const addCheckin = (checkin) => ({
    type: ADD_CHECKIN,
    payload: checkin,
});

const deleteCheckin = (checkinId) => ({
    type: DELETE_CHECKIN,
    payload: checkinId,
});

export const getCheckins = () => async (dispatch) => {
    const resPublic = await csrfFetch('/api/checkins');
    const resPrivate = await csrfFetch('/api/users/checkins');
    const dataPublic = await resPublic.json();
    const dataPrivate = await resPrivate.json();
    dispatch(setCheckins(dataPublic.checkins, dataPrivate.checkins));
};

export const createCheckin =
    (comment, rating, poutineId) => async (dispatch) => {
        const res = await csrfFetch(`/api/poutines/${poutineId}/checkins`, {
            method: 'POST',
            body: JSON.stringify({ comment, rating }),
        });
        const data = await res.json();
        dispatch(addCheckin(data.checkin));
    };

export const updateCheckin =
    (comment, rating, checkinId) => async (dispatch) => {
        const res = await csrfFetch(`/api/checkins/${checkinId}`, {
            method: 'PUT',
            body: JSON.stringify({ comment, rating }),
        });
        const data = await res.json();
        dispatch(addCheckin(data.checkin));
    };

export const removeCheckin = (checkinId) => async (dispatch) => {
    await csrfFetch(`/api/checkins/${checkinId}`, {
        method: 'DELETE',
    });
    dispatch(deleteCheckin(checkinId));
};

const initialState = { public: {}, private: {} };

const checkinsReducer = (state = initialState, action) => {
    Object.freeze(state);
    let newState = { ...state };
    newState.public = { ...state.public };
    newState.private = { ...state.private };
    switch (action.type) {
        case SET_CHECKINS:
            action.payload.public.forEach((checkin) => {
                newState.public[checkin.id] = checkin;
            });
            action.payload.private.forEach((checkin) => {
                newState.private[checkin.id] = checkin
            })
            return newState;
        case ADD_CHECKIN:
            newState.private[action.payload.id] = action.payload;
            return newState;
        case DELETE_CHECKIN:
            delete newState.private[action.payload];
            return newState;
        default:
            return state;
    }
};

export default checkinsReducer;
