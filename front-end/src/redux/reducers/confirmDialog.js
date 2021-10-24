const defaultState = {
    isOpen: false,
    isAgree: false
};

const filter = (state = defaultState, action) => {
    switch (action.type) {
        case 'SET_OPEN_DIALOG':
            return {...state, isOpen: action.payload}
        case 'SET_AGREE_DIALOG':
            return {...state, isAgree: action.payload}
        default:
            return state;
    }
};

export default filter;