import { csrfFetch } from './csrf';

const SET_SESSION = 'session/setSession';
const REMOVE_SESSION = 'session/removeSession';

const initialState = { user: null };

const setSession = (user) => ({
    type: SET_SESSION,
    payload: user,
});

const removeSession = () => ({
    type: REMOVE_SESSION,
});

export const logInUser = (credential, password) => async dispatch => {
    const res = await csrfFetch('/api/session', {
        method: 'POST',
        body: JSON.stringify({
            credential,
            password,
        }),
    });

    const user = await res.json();
    console.log(user);

    dispatch(setSession(user));
    return user;
};

export const logOutUser = () => async (dispatch) => {
    await csrfFetch('/api/session', { method: 'DELETE'});
    dispatch(removeSession());
}

const sessionReducer = (state = initialState, action) => {
    Object.freeze(state);
    const newState = { ...state };
    switch (action.type) {
        case SET_SESSION:
            newState.user = { ...action.payload };
            return newState;
        case REMOVE_SESSION:
            return initialState;
        default:
            return state;
    }
};

export default sessionReducer;
