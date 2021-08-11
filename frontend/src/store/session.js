import { csrfFetch } from './csrf';

const SET_SESSION = 'session/setSession';
const REMOVE_SESSION = 'session/removeSession';

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

    const data = await res.json();

    dispatch(setSession(data.user));
    return data.user;
};


export const signupUser = (user) => async dispatch => {
    const res = await csrfFetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ ...user }),
    });

    const data = await res.json();

    dispatch(setSession(data.user));
    return data.user;
};

export const logOutUser = () => async (dispatch) => {
    await csrfFetch('/api/session', { method: 'DELETE'});
    dispatch(removeSession());
}

export const restoreUser = () => async dispatch => {
    const response = await csrfFetch('/api/session');
    const { user } = await response.json();
    dispatch(setSession(user));
    return response;
};

const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
    Object.freeze(state);
    const newState = { ...state };
    switch (action.type) {
        case SET_SESSION:
            if (action.payload) newState.user = { ...action.payload };
            return newState;
        case REMOVE_SESSION:
            return initialState;
        default:
            return state;
    }
};

export default sessionReducer;
