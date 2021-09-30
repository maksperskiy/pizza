const defaultState = {
    pizzas: [],
    isLoaded: false,
    categories: [],
    names: [],
    sizes: [],
    types: []
};

const pizzas = (state = defaultState, action) => {
    switch (action.type) {
        case 'SET_PIZZAS':
            return {...state, pizzas: action.payload}
        case 'SET_LOADED':
            return {...state, isLoaded: action.payload}
        case 'SET_CATEGORIES':
            return {...state, categories: action.payload}
        case 'SET_NAMES':
            return {...state, names: action.payload}
        case 'SET_SIZES':
            return {...state, sizes: action.payload}  
        case 'SET_TYPES':
            return {...state, types: action.payload}  
        default:
            return state;
    }
};

export default pizzas;