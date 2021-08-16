const initialState = {};

const checkinsReducer = (state = initialState, action) => {
    Object.freeze(state);
    let newState = { ...state };
    switch (action.type) {
        default:
            return state;
    }
};

export default checkinsReducer;
