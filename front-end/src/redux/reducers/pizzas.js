const defaultState = {
    pizzas: [],
    isLoaded: false,
    categories: []
};

const pizzas = (state = defaultState, action) => {
    switch (action.type) {
        case 'SET_PIZZAS':
            return {...state, pizzas: action.payload}
        case 'SET_LOADED':
            return {...state, isLoaded: action.payload}
        case 'SET_CATEGORIES':
            return {...state, categories: action.payload}
        default:
            return state;
    }
};

export default pizzas;